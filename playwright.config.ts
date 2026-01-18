import { defineConfig } from '@playwright/test';

const baseURL = process.env.API_BASE_URL ?? 'http://127.0.0.1:4001';

export default defineConfig({
  testDir: './tests',
  fullyParallel: true,
  timeout: 30_000,
  reporter: [
    ['html', { open: 'never' }],
    ['list']
  ],
  use: {
    baseURL
  },
  webServer: {
    command: 'npm run api:start',
    port: 4001,
    reuseExistingServer: !process.env.CI,
    timeout: 30_000
  },
  projects: [
    {
      name: 'api',
      testMatch: /tests[\\/]api[\\/].*\.spec\.ts/
    }
  ]
});
