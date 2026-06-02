import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

/**
 * Formats a Unix timestamp (ms) as a UTC date-time string.
 * @returns A string in the format `yyyy-MM-dd HH:mm:ss UTC`, or `''` if the timestamp is invalid.
 */
export const getFormattedDateTimeStrInUTC = (timestamp: number): string => {
    if (timestamp === undefined || timestamp === null || isNaN(timestamp)) {
        return '';
    }

    return formatInUTCTimeZone(timestamp, `yyyy-MM-dd HH:mm:ss 'UTC'`);
};
