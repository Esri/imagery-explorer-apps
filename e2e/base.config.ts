import type { PlaywrightTestConfig, } from "@playwright/test";
import { devices } from "@playwright/test";
/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
import { config } from 'dotenv';
config({
    path: '.env.development', // Specify the path to your .env file
});

export const DEV_SERVER_URL = process.env.WEBPACK_DEV_SERVER_HOSTNAME
    ? `https://${process.env.WEBPACK_DEV_SERVER_HOSTNAME}:8080`
    : 'http://localhost:8080'; // Default to localhost if not set

export const baseConfig:PlaywrightTestConfig = {
    testDir: './',
    /* Run tests in files in parallel */
    fullyParallel: true,
    /* Fail the build on CI if you accidentally left test.only in the source code. */
    forbidOnly: !!process.env.CI,
    /* Retry on CI only */
    retries: process.env.CI ? 2 : 0,
    /* Opt out of parallel tests on CI. */
    workers: process.env.CI ? 1 : undefined,
    /* Reporter to use. See https://playwright.dev/docs/test-reporters */
    reporter: 'html',
    /* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
    use: {
      /* Base URL to use in actions like `await page.goto('/')`. */
      // baseURL: 'http://127.0.0.1:3000',
  
      /* Collect trace when retrying the failed test. See https://playwright.dev/docs/trace-viewer */
      trace: 'on-first-retry',
  
      ignoreHTTPSErrors: true,

      permissions: ['clipboard-read', 'clipboard-write'], // Allow clipboard access
    },
  
    /* Configure projects for major browsers */
    projects: [
      {
        name: 'chromium',
        use: { 
          ...devices['Desktop Chrome'],
          viewport: { width: 1980, height: 1080 },
          permissions: ['clipboard-read', 'clipboard-write'], // Allow clipboard access
        },
      },
  
      // {
      //   name: 'firefox',
      //   use: { ...devices['Desktop Firefox'] },
      // },
  
      // {
      //   name: 'webkit',
      //   use: { ...devices['Desktop Safari'] },
      // },
  
      /* Test against mobile viewports. */
      // {
      //   name: 'Mobile Chrome',
      //   use: { ...devices['Pixel 5'] },
      // },
      // {
      //   name: 'Mobile Safari',
      //   use: { ...devices['iPhone 12'] },
      // },
  
      /* Test against branded browsers. */
      // {
      //   name: 'Microsoft Edge',
      //   use: { ...devices['Desktop Edge'], channel: 'msedge' },
      // },
      // {
      //   name: 'Google Chrome',
      //   use: { ...devices['Desktop Chrome'], channel: 'chrome' },
      // },
    ],
  
    /* Run your local dev server before starting the tests */
    webServer: {
      command: 'npm run start',
      url: DEV_SERVER_URL,
      reuseExistingServer: !process.env.CI,
      ignoreHTTPSErrors: true
    },
}