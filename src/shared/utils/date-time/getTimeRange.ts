import { DateRange } from '@typing/shared';
import { getFormatedDateString } from './formatDateString';
import { getCurrentMonth, getCurrentYear } from './getCurrentDateTime';

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
