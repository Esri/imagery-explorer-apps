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

import {
    formattedDateString2Unixtimestamp,
    getFormatedDateString,
} from './formatDateString';

describe('test getFormatedDateString', () => {
    it('should return formated date string when input year, month, day are defined', () => {
        expect(
            getFormatedDateString({
                year: 2023,
                month: 3,
                day: 15,
            })
        ).toBe('2023-03-15');
    });

    it('should return formated date string when input date is defined', () => {
        expect(
            getFormatedDateString({
                date: 1683028800000,
            })
        ).toBe('2023-05-02');
    });

    it('should return formated date in UTC time zone', () => {
        expect(
            getFormatedDateString({
                date: 1704067200000,
            })
        ).toBe('2024-01-01');
    });
});

describe('test formattedDateString2Unixtimestamp', () => {
    it('should return unix timestamp of the formatted date in UTC time zome', () => {
        expect(formattedDateString2Unixtimestamp('2024-01-01')).toBe(
            1704067200000
        );
    });
});
