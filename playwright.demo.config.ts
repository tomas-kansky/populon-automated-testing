import { defineConfig, devices } from '@playwright/test';
import dotenv from 'dotenv';
import path from 'path';

// Load environment variables from .env file
dotenv.config({ path: path.resolve(__dirname, '.env') });

const slowMoMs = process.env.SLOW_MO ? Number(process.env.SLOW_MO) : 800;

/**
 * Playwright configuration dedicated to Live Classroom / Consultation Demos.
 * - Runs sequentially (workers: 1, fullyParallel: false)
 * - Opens a visible browser window (headless: false)
 * - Slows down every interaction by 800ms (or SLOW_MO from .env) so the audience can follow each step
 * - Records full trace, screenshots, and video for post-demo inspection
 */
export default defineConfig({
  testDir: './tests',
  /* Extended timeout per test to accommodate slow-motion pauses */
  timeout: 90 * 1000,
  expect: {
    timeout: 10000,
  },
  /* Sequential execution so the audience watches one window at a time */
  fullyParallel: false,
  workers: 1,
  retries: 0,
  /* Reporters */
  reporter: [
    ['list'],
    ['html', { open: 'never', outputFolder: 'playwright-report' }],
  ],
  /* Shared settings for live presentation */
  use: {
    baseURL: process.env.BASE_URL || 'https://demo.populon.app',
    headless: false,
    launchOptions: {
      slowMo: slowMoMs,
    },
    trace: 'on',
    screenshot: 'on',
    video: 'on',
    viewport: { width: 1366, height: 768 },
    ignoreHTTPSErrors: true,
  },

  projects: [
    {
      name: 'chromium-demo',
      use: {
        ...devices['Desktop Chrome'],
        headless: false,
        viewport: { width: 1366, height: 768 },
        launchOptions: {
          slowMo: slowMoMs,
        },
      },
    },
  ],
});
