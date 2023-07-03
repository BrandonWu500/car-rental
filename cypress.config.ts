import { defineConfig } from 'cypress';
import { resetDB } from './prisma/reset-db';

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
      on('task', {
        'db:reset': () => resetDB().then(() => null),
      });
    },
    baseUrl: 'http://localhost:3000',
  },
});
