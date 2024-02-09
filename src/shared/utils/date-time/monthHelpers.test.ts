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

import { isLeapYear, getNumberOfDays } from './monthHelpers';

describe('test isLeapYear', () => {
    test('should return true if year is leap year', () => {
        expect(isLeapYear(2024)).toBeTruthy();
        expect(isLeapYear(2000)).toBeTruthy();
    });

    test('should return false if year is not leap year', () => {
        expect(isLeapYear(1900)).toBeFalsy();
        expect(isLeapYear(2022)).toBeFalsy();
    });
});

describe('test getNumberOfDays', () => {
    test('should return number of days for regular month', () => {
        expect(getNumberOfDays(2024, 3)).toBe(31);
        expect(getNumberOfDays(2000, 9)).toBe(30);
    });

    test('should return 28 days for Feb in regular year', () => {
        expect(getNumberOfDays(2023, 2)).toBe(28);
        expect(getNumberOfDays(2018, 2)).toBe(28);
    });

    test('should return 29 days for Feb in leap year', () => {
        expect(getNumberOfDays(2024, 2)).toBe(29);
        expect(getNumberOfDays(2000, 2)).toBe(29);
    });
});
