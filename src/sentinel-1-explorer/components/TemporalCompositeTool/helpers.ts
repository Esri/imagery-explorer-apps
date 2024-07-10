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

const THRESHOLD = (255 / 3) * 2;

export type ColorGroup =
    | 'Red'
    | 'Green'
    | 'Blue'
    | 'Yellow'
    | 'Magenta'
    | 'Cyan';

export const getColorGroup = (r: number, g: number, b: number): ColorGroup => {
    // Check if the color is Red
    if (r > THRESHOLD && r > g && r > b && g < THRESHOLD && b < THRESHOLD) {
        return 'Red';
    }

    // Check if the color is Green
    if (g > THRESHOLD && g > r && g > b && r < THRESHOLD && b < THRESHOLD) {
        return 'Green';
    }

    // Check if the color is Blue
    if (b > THRESHOLD && b > r && b > g && r < THRESHOLD && g < THRESHOLD) {
        return 'Blue';
    }

    // Check if the color is Yellow
    if (r > THRESHOLD && g > THRESHOLD && r > b && g > b && b < THRESHOLD) {
        return 'Yellow';
    }

    // Check if the color is Magenta
    if (r > THRESHOLD && b > THRESHOLD && r > g && b > g && g < THRESHOLD) {
        return 'Magenta';
    }

    // Check if the color is Cyan
    if (g > THRESHOLD && g > THRESHOLD && g > r && b > r && r < THRESHOLD) {
        return 'Cyan';
    }

    // If none of the above conditions are met, return 'null'
    return null;
};
