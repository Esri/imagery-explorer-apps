import { defineConfig, devices } from '@playwright/test';
import { baseConfig } from './base.config';

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
  ...baseConfig,
  testDir: './landsat',
  /* Run your local dev server before starting the tests */
  webServer: {
    ...baseConfig.webServer,
    command: 'npm run start:landsat',
  },
});
