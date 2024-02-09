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

import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * This custom hook returns the acquisition year of the user-selected acquisition date range.
 * It returns null when the acquisition date range contains months from two different years.
 * @returns The acquisition year if the selected date range falls within the same year, otherwise null.
 */
export const useAcquisitionYear = () => {
    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDateRange = queryParams?.acquisitionDateRange;

    const acquisitionYear: number = useMemo(() => {
        if (!acquisitionDateRange) {
            return null;
        }

        // Fetches the year from the formatted date strings
        const { startDate, endDate } = acquisitionDateRange;
        const startYear = getYearFromFormattedDateString(startDate);
        const endYear = getYearFromFormattedDateString(endDate);

        // Checks if the start and end years are different; if so, returns null
        if (startYear !== endYear) {
            return null;
        }

        // Returns the acquisition year when the start and end years match
        return startYear;
    }, [acquisitionDateRange]);

    return acquisitionYear;
};
