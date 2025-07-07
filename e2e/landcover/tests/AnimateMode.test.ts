import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { 
    mockSentinel2LandcoverNetworkRequests, 
    resetMockSentinel2LancoverNetworkRequest
} from '../mock-data/mockLandcoverExplorerNetworkRequests';

test.describe('Sentinel-2 Land Cover Explorer - Animate Mode', () => {

    const AppURL = `${DEV_SERVER_URL}/#mapCenter=-116.96259%2C34.09604%2C11.90`;

    test('Time Selector funtionality', async ({ page }) => {
        // Set up network mocks and sign in
        await mockSentinel2LandcoverNetworkRequests(page);

        await page.goto(AppURL);

        // verify the animate mode button is visible and selected
        const animateModeButton = page.getByTestId('mode-selector-animate-button');
        await expect(animateModeButton).toBeVisible();
        await expect(animateModeButton).toHaveAttribute('data-selected', 'true');

        // // pause the test to allow manual inspection
        // await page.pause();

        // Clean up network mocks
        await resetMockSentinel2LancoverNetworkRequest(page);
    })
})
