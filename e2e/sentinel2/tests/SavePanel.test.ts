import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { selectDayFromCalendar, urlHashContains } from '../helpers';
import { signInWithArcGISOnline } from '../../shared/signInWithArcGISOnline';

const openSavePanelAndSignIn = async (page: Page) => {
    // Verify the Open Save Panel button is visible and clickable
    const openSavePanelButton = page.getByTestId('open-save-panel-button');
    await expect(openSavePanelButton).toBeVisible();
    await openSavePanelButton.click();

    // Verify the Save Panel is visible
    const savePanel = page.getByTestId('save-panel');
    await expect(savePanel).toBeVisible();

    // Verify the Sign-in button is visible
    const signInButton = page.getByTestId('sign-in-button');
    await expect(signInButton).toBeVisible();
    await signInButton.click();

    // Sign in to ArcGIS Online
    await signInWithArcGISOnline(page);

    // Verify the Save Panel is still visible after signing in
    await expect(savePanel).toBeVisible();
}

test.describe('Sentinel-2 Explorer - Save Panel', () => {

    const APP_URL = DEV_SERVER_URL + '/#mapCenter=-117.07809%2C34.03876%2C13.516';

    test.beforeEach(async ({ page }) => {
        // Mock network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);
    });

    test.afterEach(async ({ page }) => {
        // Reset mock network requests before each test
        await resetMockSentinel2NetworkRequest(page);
    });

    test('save panel when no scene is selected', async ({ page }) => {
        await page.goto(APP_URL);

        // Open the Save Panel and sign in to ArcGIS Online
        await openSavePanelAndSignIn(page);

        // Pause to allow for manual inspection
        await page.pause();
    });
})
