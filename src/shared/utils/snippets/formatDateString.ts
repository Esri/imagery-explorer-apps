import { format } from 'date-fns';

// /**
//  * Get formatted date string using the input unix timestamp
//  * @param timestamp unix timestamp of the acquisition date
//  * @returns formated acquisition date in formate of `YYYY-MM-DD` (e.g. `2023-05-19`)
//  */
// export const unixtimestamp2FormattedDateString = (timestamp: number) => {
//     return format(timestamp, 'yyyy-MM-dd');
// };

export const formattedDateString2Unixtimestamp = (
    formattedDate: string
): number => {
    const [YYYY, MM, DD] = formattedDate.split('-').map((d) => +d);

    return new Date(YYYY, MM - 1, DD).getTime();
};

/**
 * Get a formatted date string in the format `yyyy-MM-dd`, (e.g., `2023-05-02`).
 *
 * If `date` is provided, it will be used to create the formatted string.
 * Otherwise, the function will use the year, month, and day parameters to create the date string.
 *
 * @param
 * @returns
 */
export const getFormatedDateString = ({
    date,
    year,
    month,
    day,
}: {
    /**
     * year
     */
    year?: number;
    /**
     * number of month from 1-12
     */
    month?: number;
    /**
     * number of day
     */
    day?: number;
    /**
     * date as unix timestamp or Date
     */
    date?: Date | number;
}): string => {
    if (!date && !year && !month && day) {
        throw new Error('missing input date');
    }

    if (date) {
        return format(date, 'yyyy-MM-dd');
    }

    if (month && (month < 1 || month > 12)) {
        throw new Error('invalid month');
    }

    if (day && (day < 1 || day > 31)) {
        throw new Error('invalid day');
    }

    const monthStr = month < 10 ? `0${month}` : month.toString();

    const dayStr = day < 10 ? `0${day}` : day.toString();

    return `${year}-${monthStr}-${dayStr}`;
};
