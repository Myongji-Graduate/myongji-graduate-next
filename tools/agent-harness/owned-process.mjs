import { spawn } from 'node:child_process';

// IPC may have disconnected while Node was loading this ESM module. No target
// exists yet, so leave without launching any work for an absent owner.
if (!process.connected) process.exit(1);

// Keep this session leader alive after the target exits, until the owner sends
// its final group signal. A reaped leader's PID must never be used as a PGID.
const keepAlive = setInterval(() => {}, 1000);
const stopGroup = () => process.kill(-process.pid, 'SIGKILL');
process.on('SIGTERM', () => {});
process.on('disconnect', stopGroup);
process.on('uncaughtException', stopGroup);
process.on('unhandledRejection', stopGroup);

let reported = false;
const report = (result) => {
  if (reported) return;
  reported = true;
  if (!process.connected) return stopGroup();
  process.send({ type: 'target-closed', ...result }, (error) => {
    if (error) stopGroup();
  });
};
try {
  const target = spawn(process.execPath, process.argv.slice(2), {
    stdio: ['ignore', 'inherit', 'inherit'],
  });
  target.once('error', (error) => report({ error: String(error) }));
  target.once('close', (exitCode, signal) => report({ exitCode, signal }));
  process.send({ type: 'group-ready' }, (error) => {
    if (error) stopGroup();
  });
} catch (error) {
  report({ error: String(error) });
}

// Intentionally retained until SIGKILL or IPC disconnect.
void keepAlive;
