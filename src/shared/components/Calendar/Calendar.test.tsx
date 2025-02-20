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

import React from 'react';
import { cleanup, fireEvent, render } from '@testing-library/react';

import Calendar from './Calendar';

describe('test Calendar component', () => {
    it('should include Feb 29 when it is a leap year', () => {
        const { getByTestId } = render(
            <Calendar
                dateRange={{
                    startDate: '2024-01-01',
                    endDate: '2024-12-31',
                }}
                selectedAcquisitionDate="2024-01-13"
                availableScenes={[]}
                onSelect={(val) => {
                    console.log(val);
                }}
            />
        );

        // should handle leap year
        expect(getByTestId(/2024-02-29/i)).toBeTruthy();
    });
});
