// @ts-check
import 'dotenv/config';
import { defineConfig, devices } from '@playwright/test';
import { existsSync } from 'fs';

export default defineConfig({
  testDir: './tests',
  timeout: 120000,
  expect: { timeout: 30000 },
  fullyParallel: false,
  retries: 1,
  workers: 1,
  reporter: [['html', { open: 'never' }], ['list']],
  use: {
    baseURL: process.env.SF_URL,
    navigationTimeout: 60000,
    actionTimeout: 30000,
    storageState: existsSync('auth.json') ? 'auth.json' : undefined,
    headless: !!process.env.CI,
    screenshot: 'on',
    video: 'retain-on-failure',
    trace: 'retain-on-failure',
  },
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        viewport: null,
        deviceScaleFactor: undefined,
      },
    },
  ],
});
