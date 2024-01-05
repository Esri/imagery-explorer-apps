import { DateRange } from '@typing/shared';
import { getFormatedDateString } from './formatDateString';
import { getCurrentMonth, getCurrentYear } from './getCurrentDateTime';
import { getNumberOfDays } from './monthHelpers';

/**
 * Generates a date range for a specific year.
 * @param year The year for which the date range is needed.
 * @returns An object containing the start and end dates in the format `yyyy-MM-dd`.
 */
export const getDateRangeForYear = (year: number): DateRange => {
    // use Jan-01 of the input year as the start date,
    // using date string in the format `yyyy-MM-dd`
    const startDate = getFormatedDateString({
        year,
        month: 1,
        day: 1,
    });

    // use Dec-31 of the input year as the end date,
    // use date string in the format `yyyy-MM-dd`
    const endDate = getFormatedDateString({
        year,
        month: 12,
        day: 31,
    });

    // Create a DateRange object containing the startDate and endDate
    const dateRange: DateRange = {
        startDate,
        endDate,
    };

    return dateRange;
};

/**
 * Get date range for the past 12 months.
 * The range includes the start and end dates for the period 12 months ago up to the current month's end date.
 * @returns An object containing the start and end dates formatted as strings within the past 12 months.
 */
export const getDateRangeForPast12Month = () => {
    const currYear = getCurrentYear();
    const currMonth = getCurrentMonth();
    const dayCurrMonth = getNumberOfDays(currYear, currMonth);

    // use last day of the current month as the end date
    const endDate = Date.UTC(currYear, currMonth - 1, dayCurrMonth);

    // calculate year that is 12 months ago, it should be last year if the current month is not December
    const startYear = currMonth === 12 ? currYear : currYear - 1;

    // calculate month that is 12 months ago, it should be month next to the current month
    const startMonth = currMonth === 12 ? 1 : currMonth + 1;

    // use the first day of the month from 12 month ago as the start date
    const startDate = Date.UTC(startYear, startMonth - 1, 1);

    // Create a DateRange object containing the startDate and endDate
    const dateRange: DateRange = {
        startDate: getFormatedDateString({
            date: startDate,
        }),
        endDate: getFormatedDateString({
            date: endDate,
        }),
    };

    return dateRange;
};
