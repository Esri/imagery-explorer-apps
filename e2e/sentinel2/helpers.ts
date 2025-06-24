import { Page, expect } from "@playwright/test";
import { formatInTimeZone } from 'date-fns-tz';

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

export const formattedDateString2Unixtimestamp = (formattedDateStr: string): number => {
    // Split the formatted date string into year, month, and day components
    const [YYYY, MM, DD] = formattedDateStr.split('-').map((d) => +d);

    // Create a Unix timestamp in UTC time zone using the provided date components
    // Months in JavaScript's Date object are 0-indexed, so subtract 1 from the month component (MM)
    return Date.UTC(YYYY, MM - 1, DD);
}

export const formatInUTCTimeZone = (
    timestamp: number
): string => {
    return formatInTimeZone(timestamp, 'Etc/UTC', `MMM dd, yyyy`);
};