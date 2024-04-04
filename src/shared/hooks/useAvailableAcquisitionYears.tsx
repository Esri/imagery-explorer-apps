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

// import { APP_NAME } from '@shared/config';
// import { ImageryServiceTimeExtentData } from '@typing/imagery-service';
import React, { useContext, useEffect, useState } from 'react';
// import { getTimeExtentOfLandsatService } from '@shared/services/landsat-level-2/getTimeExtent';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
import { AppContext } from '@shared/contexts/AppContextProvider';

/**
 * This custom hook retrieves the time extent data of an Imagery Service
 * and generates an array of years (in the YYYY format) encompassing
 * all the years from the initial start date to the end date.
 * @returns {number[]} Array of years
 */
export const useAvailableAcquisitionYears = () => {
    const [years, setYears] = useState<number[]>([]);

    const { timeExtent } = useContext(AppContext);

    useEffect(() => {
        if (!timeExtent) {
            return;
        }

        // Extract start and end dates (in format of unix epoch timestamp) from the time extent data
        const { start, end } = timeExtent;

        const years: number[] = [];

        const startYear = new Date(start).getFullYear();

        const endYear = getCurrentYear(); //new Date(end).getFullYear();

        let currYear = startYear;

        while (currYear <= endYear) {
            years.push(currYear);
            currYear++;
        }

        setYears(years);
    }, [timeExtent]);

    return years;
};
