import { test, expect } from '@playwright/test';
import { DEV_SERVER_URL } from '../../base.config';
import { mockSentinel2NetworkRequests, resetMockSentinel2NetworkRequest } from '../mock-data/mockSentinel2NetworkRequests';

test.describe('Sentinel-2 Explorer - Find a Scnene', () => {

    const FIND_A_SCENE_MODE_URL = `${DEV_SERVER_URL}/#mapCenter=-117.07809%2C34.03876%2C13.516&mode=find+a+scene`;

    test('Calendar Component Functionalities', async ({ page }) => {
        // Mock network requests and sign in to ArcGIS Online
        await mockSentinel2NetworkRequests(page);

        await page.goto(FIND_A_SCENE_MODE_URL);

        // Check that the Scene Selection header is visible
        const sceneSelectionHeader = page.getByText('Scene Selection');
        await expect(sceneSelectionHeader).toBeVisible();

        // Check that the calendar container is visible
        const calendarContainer = page.getByTestId('calendar-container');
        await expect(calendarContainer).toBeVisible();

        // Check that the year selection dropdown is visible and clickable
        const yearSelectionDropdown = calendarContainer.getByTestId("year-selection-dropdown");
        await expect(yearSelectionDropdown).toBeVisible();

        // Ensure the dropdown is initially set to "Past 12 Months"
        await expect(yearSelectionDropdown).toHaveText(/Past 12 Months/i);
        
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
        await expect(yearSelectionDropdown).toHaveText('2024');

        // Check that the calendar updates to show January 2024
        const monthGrid2024Jan = calendarContainer.getByTestId('month-grid-2024-1');
        await expect(monthGrid2024Jan).toBeVisible();

        // Check that calendar cells with available scenes are visible
        const calendarCellsWithScene = calendarContainer.getByTestId('calendar-cell-2024-01-03');
        await expect(calendarCellsWithScene).toBeVisible();

        // Hover over a calendar cell and verify the tooltip appears
        await calendarCellsWithScene.hover();
        const sceneInfoTooltip = page.getByTestId('calendar-cell-tooltip-2024-01-03');
        await expect(sceneInfoTooltip).toBeVisible();

        // Click a calendar cell and verify the scene info table appears
        await calendarCellsWithScene.click();

        // Check that the scene information table is visible and contains the correct acquisition date
        const sceneInfoTable = page.locator('[data-element="scene-info-table"]');
        await expect(sceneInfoTable).toBeVisible();
        const acquisitionDateField = sceneInfoTable.locator('[data-scene-info-field="Acquired"]');
        await expect(acquisitionDateField).toHaveText(/Jan 03, 2024/i);

        // Check that the acquisition date label is visible and has the correct attribute
        const acuqiesitionDateLabel = page.getByTestId('acquisition-date-label');
        await expect(acuqiesitionDateLabel).toBeVisible();
        await expect(acuqiesitionDateLabel).toHaveAttribute('data-aququisition-date', '2024-01-03');

        // Click the reset button and verify the label and table are hidden
        const resetButton = page.getByTestId('reset-selected-date-btn');
        await expect(resetButton).toBeVisible();
        await resetButton.click();
        await expect(acuqiesitionDateLabel).not.toBeVisible();
        await expect(sceneInfoTable).not.toBeVisible();

        // Reset mocked network requests after the test
        await resetMockSentinel2NetworkRequest(page);
    })
})