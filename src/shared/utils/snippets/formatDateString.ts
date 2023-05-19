import { format } from 'date-fns';

/**
 * Get formatted date string using the input unix timestamp
 * @param timestamp unix timestamp of the acquisition date
 * @returns formated acquisition date in formate of `YYYY-MM-DD` (e.g. `2023-05-19`)
 */
export const unixtimestamp2FormattedDateString = (timestamp: number) => {
    return format(timestamp, 'yyyy-MM-dd');
};

export const formattedDateString2Unixtimestamp = (
    formattedDate: string
): number => {
    const [YYYY, MM, DD] = formattedDate.split('-').map((d) => +d);

    return new Date(YYYY, MM - 1, DD).getTime();
};
