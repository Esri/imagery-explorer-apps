import { test, expect } from '@playwright/test';
import { DEV_SERVER_URL } from '../base.config';

test('has title', async ({ page }) => {
  await page.goto(DEV_SERVER_URL);

  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Emit Explorer/);
});

// test('get started link', async ({ page }) => {
//   await page.goto('https://playwright.dev/');

//   // Click the get started link.
//   await page.getByRole('link', { name: 'Get started' }).click();

//   // Expects page to have a heading with the name of Installation.
//   await expect(page.getByRole('heading', { name: 'Installation' })).toBeVisible();
// });
