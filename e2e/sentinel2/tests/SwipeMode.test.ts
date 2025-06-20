import { test, expect, Page } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';

/**
 * Select a day from the year 2024 in the Sentinel-2 Explorer.
 * @param page the Playwright page object
 * @param day the day to select in the format 'yyyy-mm-dd', which will be used to get the calendar cell by its data-testid (e.g., 'calendar-cell-2024-01-01').
 */
const selectDayFrom2024 = async (page:Page, day:string) => {
    // Check that the year selection dropdown is visible and clickable
    const yearSelectionDropdown = page.getByTestId("year-selection-dropdown");

    // Open the year selection dropdown
    await yearSelectionDropdown.click();

    // The dropdown renders two sets of options for different screen sizes.
    // Select the visible option for 2024.
    const dropdownOptions = await yearSelectionDropdown.getByTestId('dropdown-option-2024').all();
    const dropdownOptionFor2024 = dropdownOptions.find(async option => await option.isVisible());
    if (!dropdownOptionFor2024) {
        throw new Error('No visible dropdown option for 2024 found');
    }

    // Select 2024 and verify the selection
    await dropdownOptionFor2024.click();

    const calendarCell = page.getByTestId(`calendar-cell-${day}`);
    // await expect(calendarCell).toBeVisible();
    await calendarCell.click();
}

test.describe('Sentinel-2 Explorer - Swipe', () => {

    const SWIPE_MODE_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516&mode=swipe`;

    test('Swipe Mode functionalities', async ({ page }) => {
        // Mock Sentinel-2 network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);

        await page.goto(SWIPE_MODE_URL);

        // Ensure swipe layer selectors are visible
        const swipeLayerSelectorLeft = page.getByTestId('swipe-layer-selector-left');
        const swipeLayerSelectorRight = page.getByTestId('swipe-layer-selector-right');
        await expect(swipeLayerSelectorLeft).toBeVisible();
        await expect(swipeLayerSelectorRight).toBeVisible();

        const DATE_LEFT = '2024-01-08';
        const DATE_RIGHT = '2024-12-18';

        // Select a date for the left swipe layer
        await selectDayFrom2024(page, DATE_LEFT);

        // Verify the left swipe layer displays the correct date
        await expect(swipeLayerSelectorLeft).toHaveAttribute('data-acquisition-date', DATE_LEFT);

        // Select a date for the right swipe layer
        await swipeLayerSelectorRight.click();
        await selectDayFrom2024(page, DATE_RIGHT);

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
