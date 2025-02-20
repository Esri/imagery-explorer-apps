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

import { formatInTimeZone } from 'date-fns-tz';
import { DATE_FORMAT } from '@shared/constants/UI';
import { formattedDateString2Unixtimestamp } from './formatDateString';

/**
 * This function takes a formatted date string in the format of `YYYY-MM-DD`, parses the string to obtain the Unix timestamp representing the date in the UTC time zone,
 * and then calls `formatInUTCTimeZone` to format this date in the UTC time zone regardless of the system's local time zone.
 *
 * Example usage:
 * Suppose the input is a formatted date string '2024-01-05'. This function will convert this string to the Unix timestamp representing 'January 5, 2024' in the UTC time zone
 * and format it according to the specified or default format string.
 *
 * @param {string} formattedDateStr - Formatted date string in the format of `YYYY-MM-DD`.
 * @param {string} [formatStr=DATE_FORMAT] - Format string to use for formatting the date. Default value is `MMM dd, yyyy`, which returns formatted date strings like `Jan 05, 2024`.
 * @returns {string} - Formatted date and time string in the UTC time zone.
 */
export const formatFormattedDateStrInUTCTimeZone = (
    formattedDateStr: string,
    formatStr = DATE_FORMAT
): string => {
    return formatInUTCTimeZone(
        formattedDateString2Unixtimestamp(formattedDateStr),
        formatStr
    );
};

/**
 * This function takes a Unix timestamp and formats this date in the UTC time zone regardless of the system's local time zone.
 * It is necessary to ensure consistent and accurate date formatting, especially when working with timestamps that represent events or data across different time zones.
 *
 * Example scenario: An Imagery Scene acquired on `1704067200000` represents `Monday, January 1, 2024 12:00:00 AM` in UTC time.
 * Without specifying the time zone, formatting this timestamp will display it in the local time zone, potentially causing confusion.
 * For instance, `1704067200000` might be formatted as `Sunday, December 31, 2023 4:00:00 PM GMT-08:00` in the PST time zone, which might mislead users.
 * This function helps ensure that dates are formatted accurately in the UTC time zone, maintaining consistency and avoiding such discrepancies.

 * @param {number} timestamp - Unix timestamp to be formatted.
 * @param {string} [formatStr=DATE_FORMAT] - Format string to use for formatting the date. Default value is `MMM dd, yyyy`, which returns formatted date strings like `Jan 05, 2024`.
 * @returns {string} - Formatted date and time string in the UTC time zone.
 */
export const formatInUTCTimeZone = (
    timestamp: number,
    formatStr = DATE_FORMAT
): string => {
    return formatInTimeZone(timestamp, 'Etc/UTC', formatStr);
};
