import { createRequire } from 'node:module';
import { writeFile } from 'node:fs/promises';
import { resolve } from 'node:path';

const [output, baseUrl, syntheticApi] = process.argv.slice(2);
const cypress = createRequire(import.meta.url)('cypress');
try {
  const result = await cypress.run({
    configFile: 'cypress.harness.config.cjs',
    browser: 'electron',
    spec: resolve('cypress/e2e/takenlecture-harness.cy.ts'),
    config: { baseUrl, screenshotsFolder: resolve(output, 'screenshots') },
    env: { syntheticApi },
  });
  await writeFile(resolve(output, 'cypress.json'), JSON.stringify(result, null, 2));
  process.exitCode = result.totalFailed === 0 && result.totalPassed === 1 ? 0 : 1;
} catch (error) {
  await writeFile(resolve(output, 'cypress.json'), JSON.stringify({ error: String(error) }));
  process.exitCode = 1;
}
