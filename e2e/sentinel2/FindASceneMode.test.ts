import { test, expect } from '@playwright/test';
import { DEV_SERVER_URL } from '../base.config';

test.describe('Sentinel-2 Explorer - Find a Scnene', () => {

    const FIND_A_SCENE_MODE_URL = `${DEV_SERVER_URL}/#mode=find+a+scene`;

    test('Calendar Component Functionalities', async ({ page }) => {
        await page.goto(FIND_A_SCENE_MODE_URL);

        // verify the Scene Selection header is visible
        const sceneSelectionHeader = page.getByText('Scene Selection');
        await expect(sceneSelectionHeader).toBeVisible();

        // verify the calendar container is visible
        const calendarContainer = page.getByTestId('calendar-container');
        await expect(calendarContainer).toBeVisible();

        // verify the year selection dropdown is visible and clickable
        const yearSelectionDropdown = calendarContainer.getByTestId("year-selection-dropdown");
        await expect(yearSelectionDropdown).toBeVisible();

        // Verify the dropdown is initially set to "Past 12 Months"
        await expect(yearSelectionDropdown).toHaveText(/Past 12 Months/i);
        
        // Verify the Year Selection dropdown is clickable and opens the dropdown options
        await yearSelectionDropdown.click();

        // The dropdown renders two sets of options for different screen sizes.
        // We need to select the visible one based on which dropdown option is currently visible.
        const dropdownOptions = await yearSelectionDropdown.getByTestId('dropdown-option-2024').all();
        const dropdownOptionFor2024 = dropdownOptions.find(async option => await option.isVisible());
        if (!dropdownOptionFor2024) {
            throw new Error('No visible dropdown option for 2024 found');
        }

        // Click on the dropdown option for 2024 and verify the selection
        await dropdownOptionFor2024.click();
        await expect(yearSelectionDropdown).toHaveText('2024');

        // Verify the calendar is updated to show the selected year
        const monthGrid2024Jan = calendarContainer.getByTestId('month-grid-2024-1');
        await expect(monthGrid2024Jan).toBeVisible();

    })
})