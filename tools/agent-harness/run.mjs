import { spawn, execFileSync } from 'node:child_process';
import { createWriteStream } from 'node:fs';
import { mkdir, writeFile, readFile } from 'node:fs/promises';
import { createServer, connect } from 'node:net';
import { randomUUID, createHash } from 'node:crypto';
import { resolve } from 'node:path';
import { startFixture } from './fixture.mjs';

const root = process.cwd();
const runId = `${new Date().toISOString().replaceAll(':', '-')}-${randomUUID()}`;
const output = resolve(root, 'build/agent-harness', runId);
await mkdir(output, { recursive: true });
const git = (...args) => execFileSync('git', args, { cwd: root, encoding: 'utf8' });
const code = () => ({
  revision: git('rev-parse', 'HEAD').trim(),
  trackedDiffSha256: createHash('sha256')
    .update(git('diff', '--no-ext-diff', '--no-textconv', '--binary', 'HEAD', '--'))
    .digest('hex'),
});
const before = code();
const children = [],
  logs = [];
const spawnOwned = (args, env, name) => {
  const log = createWriteStream(resolve(output, name + '.log'), { flags: 'wx' });
  logs.push(log);
  const child = spawn(process.execPath, ['tools/agent-harness/owned-process.mjs', ...args], {
    cwd: root,
    env,
    detached: true,
    stdio: ['ignore', 'pipe', 'pipe', 'ipc'],
  });
  child.stdout.pipe(log, { end: false });
  child.stderr.pipe(log, { end: false });
  child.completion = new Promise((done) => {
    child.once('error', (error) => done({ error: String(error) }));
    child.on('message', (message) => {
      if (message?.type === 'target-closed') {
        child.targetExited = true;
        done(message);
      }
    });
    child.once('close', () => done({ error: 'Owned process leader exited before target completion' }));
  });
  child.stopped = new Promise((done) => {
    child.once('error', done);
    child.once('close', done);
  });
  children.push(child);
  return child;
};
const signalOwned = (signal) => {
  for (const child of children)
    if (child.pid && child.exitCode === null && child.signalCode === null) {
      try {
        process.kill(-child.pid, signal);
        if (signal === 'SIGKILL') child.groupKilled = true;
      } catch {}
    }
};
const pause = (ms) => new Promise((done) => setTimeout(done, ms));
let abort;
const interrupted = new Promise((_, reject) => {
  abort = reject;
});
interrupted.catch(() => {});
const onSignal = () => abort(new Error('Verification interrupted'));
process.once('SIGINT', onSignal);
process.once('SIGTERM', onSignal);
const timeout = setTimeout(() => abort(new Error('Verification exceeded 600000ms timeout')), 600000);
let fixture,
  port,
  result,
  error,
  cleanup = false,
  stopping = false;
try {
  fixture = await startFixture();
  const socket = createServer();
  await new Promise((done, reject) => {
    socket.once('error', reject);
    socket.listen(0, '127.0.0.1', done);
  });
  port = socket.address().port;
  await new Promise((done) => socket.close(done));
  const baseUrl = `http://127.0.0.1:${port}`;
  const env = {
    ...process.env,
    NODE_ENV: 'development',
    NEXT_TELEMETRY_DISABLED: '1',
    API_MOCKING: 'disable',
    NEXT_PUBLIC_API_MOCKING: 'disable',
    MOCK_SERVER: 'false',
    STORY_BOOK: 'false',
    NEXT_PUBLIC_API_PATH: fixture.url,
    NEXT_PUBLIC_PARSE_API_PATH: fixture.url + '/unused',
    NEXT_PUBLIC_GA_ID: '',
    NEXT_PUBLIC_CHANNELTALK_PLUGIN: '',
  };
  const app = spawnOwned(
    ['node_modules/next/dist/bin/next', 'dev', '-H', '127.0.0.1', '-p', String(port)],
    env,
    'next',
  );
  const startup = async () => {
    const deadline = Date.now() + 120000;
    while (!stopping) {
      if (app.targetExited || app.exitCode !== null || app.signalCode !== null)
        throw new Error('Next exited before startup');
      try {
        const response = await fetch(baseUrl + '/sign-in', { signal: AbortSignal.timeout(3000) });
        if (response.ok) return;
      } catch {}
      if (Date.now() >= deadline) throw new Error('Next startup timed out');
      await pause(500);
    }
  };
  await Promise.race([startup(), interrupted]);
  const browserEnv = Object.fromEntries(
    Object.entries(process.env).filter(([key]) => !key.toUpperCase().startsWith('CYPRESS_')),
  );
  const browser = spawnOwned(
    ['tools/agent-harness/browser-worker.mjs', output, baseUrl, fixture.url],
    browserEnv,
    'browser',
  );
  const execution = await Promise.race([browser.completion, interrupted]);
  if (execution.error || execution.signal || execution.exitCode !== 0)
    error = execution.error ?? `Cypress exited: ${execution.exitCode ?? execution.signal}`;
  result = JSON.parse(await readFile(resolve(output, 'cypress.json'), 'utf8'));
} catch (caught) {
  error = String(caught);
} finally {
  stopping = true;
  clearTimeout(timeout);
  signalOwned('SIGTERM');
  await pause(1500);
  signalOwned('SIGKILL');
  await Promise.race([Promise.all(children.map((child) => child.stopped)), pause(3000)]);
  await fixture?.close();
  const listening = port
    ? await new Promise((done) => {
        const probe = connect({ port, host: '127.0.0.1' });
        probe.once('connect', () => {
          probe.destroy();
          done(true);
        });
        probe.once('error', () => done(false));
        probe.setTimeout(1000, () => {
          probe.destroy();
          done(true);
        });
      })
    : false;
  cleanup =
    !listening &&
    children.every((child) => child.groupKilled && (child.exitCode !== null || child.signalCode !== null));
  await Promise.all(logs.map((log) => new Promise((done) => log.end(done))));
  process.removeListener('SIGINT', onSignal);
  process.removeListener('SIGTERM', onSignal);
}
const after = code();
const state = fixture?.snapshot();
const mutationCount = (method, path) =>
  state?.requests.filter((request) => request.method === method && request.path === path).length;
const expectedSpec = resolve(root, 'cypress/e2e/takenlecture-harness.cy.ts');
const matchedSpec = result?.runs?.length === 1 && result.runs[0].spec.absolute === expectedSpec;
const passed =
  !error &&
  matchedSpec &&
  result?.totalTests === 1 &&
  result.totalPassed === 1 &&
  result.totalFailed === 0 &&
  result.totalPending === 0 &&
  result.totalSkipped === 0 &&
  mutationCount('POST', '/taken-lectures') === 1 &&
  mutationCount('DELETE', '/taken-lectures/122') === 1 &&
  state?.added === false &&
  cleanup &&
  JSON.stringify(before) === JSON.stringify(after);
const report = {
  schemaVersion: 1,
  runId,
  suite: 'takenlecture-ui',
  validationScope: 'ui',
  status: passed ? 'passed' : 'failed',
  codeBefore: before,
  codeAfter: after,
  fingerprintCoverage: 'HEAD and tracked diff only; untracked/ignored files excluded',
  cleanup,
  error,
  expectedSpec,
  matchedSpec,
  fixtureUrl: fixture?.url,
  fixture: state,
  totals: result
    ? {
        tests: result.totalTests,
        passed: result.totalPassed,
        failed: result.totalFailed,
        pending: result.totalPending,
        skipped: result.totalSkipped,
      }
    : null,
  limitations: [
    'Add uses one native DOM button activation after visibility/enabled checks; physical pointer and keyboard compatibility is not verified.',
    'Browser and real Next server against a stateful synthetic API fixture; no Spring/MySQL integration or academic-policy proof.',
    'Development server; production frontend build and Skill effectiveness are not evaluated.',
  ],
  result,
};
await writeFile(resolve(output, 'report.json'), JSON.stringify(report, null, 2) + '\n');
console.log(
  JSON.stringify(
    { status: report.status, totals: report.totals, error, reportPath: resolve(output, 'report.json') },
    null,
    2,
  ),
);
process.exitCode = passed ? 0 : 1;
