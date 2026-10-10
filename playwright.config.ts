import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

export default defineConfig({
  testDir: './tests',
  /* Timeout per individual test */
  timeout: 30 * 1000,
  expect: {
    timeout: 7000,
  },
  /* Run tests in parallel locally, sequentially in CI */
  fullyParallel: true,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: !!process.env.CI,
  /* Retry on CI only */
  retries: process.env.CI ? 2 : 0,
  /* Workers: default locally, 1 on CI */
  workers: process.env.CI ? 1 : undefined,
  /* Reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ...(process.env.CI ? [['github'] as const] : []),
  ],
  /* Shared settings for all projects */
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.populon.app',
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1280, height: 720 },
    ignoreHTTPSErrors: true,
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: { ...devices['Desktop Chrome'] },
    },
  ],
});
