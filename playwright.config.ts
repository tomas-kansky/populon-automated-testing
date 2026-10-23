import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const isCI = !!process.env.CI;
const isHeadless = isCI || process.env.HEADLESS === 'true';
const slowMoMs = isHeadless ? 0 : Number(process.env.SLOW_MO || 800);

export default defineConfig({
  testDir: './tests',
  /* Extended timeout per individual test to accommodate live slow-mo demo */
  timeout: isHeadless ? 30 * 1000 : 90 * 1000,
  expect: {
    timeout: 10000,
  },
  /* Run sequentially in a single visible window locally so the live demo is easy to follow */
  fullyParallel: false,
  /* Fail the build on CI if you accidentally left test.only in the source code */
  forbidOnly: isCI,
  /* Retry on CI only */
  retries: isCI ? 2 : 0,
  /* Single worker so tests project one by one on screen */
  workers: 1,
  /* Reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
    ...(isCI ? [['github'] as const] : []),
  ],
  /* Shared settings for all projects */
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.populon.app',
    headless: isHeadless,
    launchOptions: {
      slowMo: slowMoMs,
    },
    trace: 'on-first-retry',
    screenshot: 'only-on-failure',
    video: 'retain-on-failure',
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
  },

  /* Browser projects */
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        headless: isHeadless,
        viewport: { width: 1366, height: 768 },
        launchOptions: {
          slowMo: slowMoMs,
        },
      },
    },
  ],
});
