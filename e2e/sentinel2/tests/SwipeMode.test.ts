import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';
import { selectDayFromCalendar } from '../helpers';

test.describe('Sentinel-2 Explorer - Swipe', () => {

    const SWIPE_MODE_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516`;

    test('Swipe Mode functionalities', async ({ page }) => {
        // Mock Sentinel-2 network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);

        await page.goto(SWIPE_MODE_URL);

        // verify the swipe mode button is visible and clickable
        const swipeModeButton = page.getByTestId('mode-selector-swipe');
        await expect(swipeModeButton).toBeVisible();
        await swipeModeButton.click();

        // Ensure swipe layer selectors are visible
        const swipeLayerSelectorLeft = page.getByTestId('swipe-layer-selector-left');
        const swipeLayerSelectorRight = page.getByTestId('swipe-layer-selector-right');
        await expect(swipeLayerSelectorLeft).toBeVisible();
        await expect(swipeLayerSelectorRight).toBeVisible();

        const DATE_LEFT = '2023-08-01';
        const DATE_RIGHT = '2024-12-18';

        // Select a date for the left swipe layer
        await selectDayFromCalendar(page, DATE_LEFT);

        // Verify the left swipe layer displays the correct date
        await expect(swipeLayerSelectorLeft).toHaveAttribute('data-acquisition-date', DATE_LEFT);

        // Select a date for the right swipe layer
        await swipeLayerSelectorRight.click();
        await selectDayFromCalendar(page, DATE_RIGHT);

        // Verify the right swipe layer displays the correct date
        await expect(swipeLayerSelectorRight).toHaveAttribute('data-acquisition-date', DATE_RIGHT);

        // Test the swap button functionality
        const swapButton = page.getByTestId('swipe-mode-side-swap-button');
        await expect(swapButton).toBeVisible();
        await swapButton.click();

        // After swapping, verify the dates have switched sides
        await expect(swipeLayerSelectorLeft).toHaveAttribute('data-acquisition-date', DATE_RIGHT);
        await expect(swipeLayerSelectorRight).toHaveAttribute('data-acquisition-date', DATE_LEFT);

        // Clean up mocked network requests after the test
        await resetMockSentinel2NetworkRequest(page);
    });
});
