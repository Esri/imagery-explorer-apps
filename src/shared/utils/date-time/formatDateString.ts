/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { addLeadingZero } from '../snippets/addLeadingZero';
import { formatInUTCTimeZone } from './formatInUTCTimeZone';

// /**
//  * Get formatted date string using the input unix timestamp
//  * @param timestamp unix timestamp of the acquisition date
//  * @returns formated acquisition date in formate of `YYYY-MM-DD` (e.g. `2023-05-19`)
//  */
// export const unixtimestamp2FormattedDateString = (timestamp: number) => {
//     return format(timestamp, 'yyyy-MM-dd');
// };

/**
 * Get Unix timestamp from the formatted date string.
 *
 * @param {string} formattedDate - A string in the format of `yyyy-MM-dd`.
 * @returns {number} A Unix timestamp representing the date from the input string in UTC time zone.
 */
export const formattedDateString2Unixtimestamp = (
    formattedDate: string
): number => {
    // Split the formatted date string into year, month, and day components
    const [YYYY, MM, DD] = formattedDate.split('-').map((d) => +d);

    // Create a Unix timestamp in UTC time zone using the provided date components
    // Months in JavaScript's Date object are 0-indexed, so subtract 1 from the month component (MM)
    return Date.UTC(YYYY, MM - 1, DD);
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
    date?: number;
}): string => {
    if (!date && !year && !month && day) {
        throw new Error('missing input date');
    }

    if (date) {
        return formatInUTCTimeZone(date, `yyyy-MM-dd`);
    }

    if (month && (month < 1 || month > 12)) {
        throw new Error('invalid month');
    }

    if (day && (day < 1 || day > 31)) {
        throw new Error('invalid day');
    }

    return `${year}-${addLeadingZero(month, 2)}-${addLeadingZero(day, 2)}`;
};

/**
 * Get full year from formated times string
 *
 * @param formattedDate string in format of `yyyy-MM-dd`
 * @returns number of the year
 */
export const getYearFromFormattedDateString = (formattedDate: string) => {
    if (!formattedDate) {
        return null;
    }

    const [YYYY] = formattedDate.split('-').map((d) => +d);
    return YYYY;
};

/**
 * Get full year from formated times string
 *
 * @param formattedDate string in format of `yyyy-MM-dd`
 * @returns number of the month
 */
export const getMonthFromFormattedDateString = (formattedDate: string) => {
    const [YYYY, MM] = formattedDate.split('-').map((d) => +d);
    return MM;
};
