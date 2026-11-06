const { defineConfig } = require('cypress');

module.exports = defineConfig({
  video: false,
  screenshotOnRunFailure: true,
  e2e: {
    setupNodeEvents(on, config) {
      on('task', {
        diagnostics(messages) {
          const { writeFileSync } = require('node:fs');
          const { resolve } = require('node:path');
          writeFileSync(
            resolve(config.screenshotsFolder, '..', 'browser-console.json'),
            JSON.stringify(messages, null, 2),
          );
          return null;
        },
      });
    },
    specPattern: 'cypress/e2e/takenlecture-harness.cy.ts',
    // Keep errors visible: the general suite's hydration suppression is not used.
    supportFile: 'cypress/support/commands.ts',
    viewportWidth: 1280,
    viewportHeight: 844,
    defaultCommandTimeout: 20000,
    pageLoadTimeout: 120000,
  },
});
