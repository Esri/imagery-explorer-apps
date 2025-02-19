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

// Import the function to be tested
import { getDateRangeForPast12Month } from './getTimeRange'; // Update 'yourFileName' with the correct file path

// use Friday, January 5, 2024 12:00:00 AM GMT as system time
const FAKE_SYSTEM_TIME = 1704412800000;
jest.useFakeTimers().setSystemTime(FAKE_SYSTEM_TIME);

describe('getDateRangeForPast12Month function', () => {
    it('should return the correct date range for the past 12 months', () => {
        // Execute the function to get the date range
        const result = getDateRangeForPast12Month();

        // Assertions to verify the expected start and end dates
        expect(result.startDate).toBe('2023-02-01');
        expect(result.endDate).toBe('2024-01-31');
    });
});
