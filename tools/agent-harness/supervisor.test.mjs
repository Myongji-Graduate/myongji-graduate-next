import { test } from 'node:test';
import assert from 'node:assert/strict';
import { mkdtemp, mkdir, copyFile, writeFile, readFile, readdir, rm } from 'node:fs/promises';
import { tmpdir } from 'node:os';
import { join, resolve } from 'node:path';
import { spawn, execFileSync } from 'node:child_process';

test('interrupt terminates both owned process groups and records non-success', { timeout: 15000 }, async (t) => {
  const root = await mkdtemp(join(tmpdir(), 'dev122-ui-supervisor-'));
  t.after(() => rm(root, { recursive: true, force: true }));
  await mkdir(join(root, 'tools/agent-harness'), { recursive: true });
  await mkdir(join(root, 'node_modules/next/dist/bin'), { recursive: true });
  for (const name of ['run.mjs', 'fixture.mjs', 'owned-process.mjs'])
    await copyFile(resolve('tools/agent-harness', name), join(root, 'tools/agent-harness', name));
  await writeFile(join(root, 'tracked'), 'synthetic');
  const git = (...args) => execFileSync('git', args, { cwd: root, stdio: 'pipe' });
  git('init', '-q');
  git('add', 'tracked');
  git('-c', 'user.name=Test', '-c', 'user.email=test@example.invalid', 'commit', '-qm', 'fixture');
  await writeFile(
    join(root, 'node_modules/next/dist/bin/next'),
    `const http=require('node:http');require('node:fs').writeFileSync('next.pid',String(process.pid));http.createServer((q,r)=>r.end('ok')).listen(Number(process.argv.at(-1)),'127.0.0.1');`,
  );
  await writeFile(
    join(root, 'tools/agent-harness/browser-worker.mjs'),
    `import{writeFileSync}from'node:fs';process.on('SIGTERM',()=>{});writeFileSync('browser.pid',String(process.pid));setInterval(()=>{},1000);`,
  );
  const runner = spawn(process.execPath, ['tools/agent-harness/run.mjs'], { cwd: root, stdio: 'pipe' });
  t.after(() => {
    try {
      runner.kill('SIGKILL');
    } catch {}
  });
  const ended = new Promise((done) => runner.once('close', done));
  const deadline = Date.now() + 5000;
  let browserPid;
  while (!browserPid) {
    try {
      browserPid = Number(await readFile(join(root, 'browser.pid'), 'utf8'));
    } catch {}
    if (Date.now() > deadline) throw new Error('Synthetic worker did not start');
    await new Promise((done) => setTimeout(done, 50));
  }
  runner.kill('SIGTERM');
  assert.equal(await ended, 1);
  const runs = await readdir(join(root, 'build/agent-harness'));
  const report = JSON.parse(await readFile(join(root, 'build/agent-harness', runs[0], 'report.json'), 'utf8'));
  assert.equal(report.status, 'failed');
  assert.equal(report.cleanup, true);
  assert.match(report.error, /interrupted/);
  for (const name of ['next.pid', 'browser.pid']) {
    const pid = Number(await readFile(join(root, name), 'utf8'));
    assert.throws(() => process.kill(pid, 0), { code: 'ESRCH' });
  }
});

test('owned leader remains alive after target exit until the final group signal', { timeout: 5000 }, async (t) => {
  const leader = spawn(process.execPath, ['tools/agent-harness/owned-process.mjs', '-e', 'process.exit(0)'], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
  });
  t.after(() => {
    if (leader.exitCode === null && leader.signalCode === null) process.kill(-leader.pid, 'SIGKILL');
  });
  const closed = new Promise((done) => leader.once('close', (code, signal) => done({ code, signal })));
  const result = await new Promise((done) =>
    leader.on('message', (message) => {
      if (message.type === 'target-closed') done(message);
    }),
  );
  assert.equal(result.type, 'target-closed');
  assert.equal(result.exitCode, 0);
  assert.equal(leader.exitCode, null);
  process.kill(-leader.pid, 'SIGTERM');
  await new Promise((done) => setTimeout(done, 50));
  assert.equal(leader.signalCode, null);
  process.kill(-leader.pid, 'SIGKILL');
  assert.deepEqual(await closed, { code: null, signal: 'SIGKILL' });
});

test('lost owner IPC terminates its still-owned group', { timeout: 5000 }, async (t) => {
  const leader = spawn(process.execPath, ['tools/agent-harness/owned-process.mjs', '-e', 'setInterval(()=>{},1000)'], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
  });
  t.after(() => {
    if (leader.exitCode === null && leader.signalCode === null) process.kill(-leader.pid, 'SIGKILL');
  });
  const closed = new Promise((done) => leader.once('exit', (code, signal) => done({ code, signal })));
  await new Promise((done) => leader.once('message', done));
  leader.disconnect();
  assert.deepEqual(await closed, { code: null, signal: 'SIGKILL' });
});

test('owner lost before module startup cannot leave a target running', { timeout: 5000 }, async (t) => {
  const leader = spawn(process.execPath, ['tools/agent-harness/owned-process.mjs', '-e', 'setInterval(()=>{},1000)'], {
    detached: true,
    stdio: ['ignore', 'ignore', 'ignore', 'ipc'],
  });
  t.after(() => {
    if (leader.exitCode === null && leader.signalCode === null) process.kill(-leader.pid, 'SIGKILL');
  });
  const closed = new Promise((done) => leader.once('exit', (code, signal) => done({ code, signal })));
  leader.disconnect();
  const result = await closed;
  assert.ok(result.signal === 'SIGKILL' || result.code === 1);
});
