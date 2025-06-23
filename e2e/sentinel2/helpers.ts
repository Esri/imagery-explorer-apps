import { Page } from "@playwright/test";

/**
 * Select a day from the year 2024 in the Sentinel-2 Explorer.
 * @param page the Playwright page object
 * @param day the day to select in the format 'yyyy-mm-dd', which will be used to get the calendar cell by its data-testid (e.g., 'calendar-cell-2024-01-01').
 */
export const selectDayFromCalendar = async (page:Page, day:string) => {
    // Check that the year selection dropdown is visible and clickable
    const yearSelectionDropdown = page.getByTestId("year-selection-dropdown");

    // Open the year selection dropdown
    await yearSelectionDropdown.click();

    const year = day.split('-')[0];

    // The dropdown renders two sets of options for different screen sizes.
    // Select the visible option for 2024.
    const dropdownOptions = await yearSelectionDropdown.getByTestId('dropdown-option-' + year).all();
    const dropdownOptionForTargetYear= dropdownOptions.find(async option => await option.isVisible());
    if (!dropdownOptionForTargetYear) {
        throw new Error('No visible dropdown option for ' + year + ' found');
    }

    // Select target year and verify the selection
    await dropdownOptionForTargetYear.click();

    const calendarCell = page.getByTestId(`calendar-cell-${day}`);
    // await expect(calendarCell).toBeVisible();
    await calendarCell.click();
}