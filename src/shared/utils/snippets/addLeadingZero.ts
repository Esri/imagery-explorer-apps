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

/**
 * Adds leading zeros to a number to match the specified size.
 * @param {number} num - The number to which leading zeros will be added.
 * @param {number} size - The desired size of the output string (including leading zeros).
 * @returns {string} - The string representation of the number with leading zeros.
 */
export const addLeadingZero = (num: number, size: number): string => {
    let output = num.toString();

    while (output.length < size) {
        output = '0' + output;
    }

    return output;
};
