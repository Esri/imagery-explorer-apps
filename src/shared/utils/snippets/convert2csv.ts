/* Copyright 2024 Esri
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

/**
 * Convert an array of strings to CSV format.
 * @param headers - An array of strings representing the CSV header row.
 * @param rows - An array of arrays of strings representing the data rows.
 * @returns A string in CSV format.
 */
export const convert2csv = (headers: string[], rows: string[][]): string => {
    let str = '';

    // set csv headers
    str += headers.join(',');
    str += '\r\n';

    // Iterate through each row and convert to CSV format
    for (const row of rows) {
        const rowStr = row.join(',');
        str += rowStr + '\r\n';
    }

    return str;
};
