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
    formatFormattedDateStrInUTCTimeZone,
    formatInUTCTimeZone,
} from './formatInUTCTimeZone';

describe('test formatInUTCTimeZone', () => {
    it('should return formatted date in UTC time zone', () => {
        expect(formatInUTCTimeZone(1704067200000)).toBe('Jan 01, 2024');
    });
});

describe('test formatFormattedDateStrInUTCTimeZone', () => {
    it('should return formatted date in UTC time zone', () => {
        expect(formatFormattedDateStrInUTCTimeZone('2024-01-01')).toBe(
            'Jan 01, 2024'
        );
    });
});
