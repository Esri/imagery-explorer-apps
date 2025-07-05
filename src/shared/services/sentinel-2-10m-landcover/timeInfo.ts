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

import { addYears } from 'date-fns';
// import { ta } from 'date-fns/locale';
// import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';

/**
 * Time Info for LandCover Layer
 */
export type LandCoverLayerTimeInfo = {
    timeExtent: number[];
    defaultTimeInterval: number;
    defaultTimeIntervalUnits: string;
};

/**
 * Time Extent Data for LandCover Layer
 *
 * @example
 * ```
 * {
 *   start: 1501545600000,
 *   end: 1609459200000
 * }
 * ```
 */
export type TimeExtentData = {
    /**
     * start time in unix time stampe
     */
    start: number;
    /**
     * end time in unix time stamp
     */
    end: number;
};

/**
 * Time Info for LandCover Layer
 * This will be populated when the `loadTimeInfo` function is called.
 */
let timeInfo: LandCoverLayerTimeInfo;

// /**
//  * List of years that there are data available from the Landcover Imagery Service
//  *
//  * @example
//  * ```
//  * [2017, 2018, 2019, 2020, 2021]
//  * ```
//  */
// let availableYears: number[] = [];

/**
 * Load Time Info from LandCover Imagery Service's JSON
 *
 * @example https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer?f=json
 * @example https://di-nlcddev.img.arcgis.com/arcgis/rest/services/USA_NLCD_Annual_LandCover/ImageServer?f=pjson
 * @returns
 */
export const loadTimeInfo = async (
    imageryServiceURL: string
): Promise<LandCoverLayerTimeInfo> => {
    // const requestURL = SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL + '?f=json';
    const requestURL = imageryServiceURL + '?f=json';

    const res = await fetch(requestURL);

    const data = await res.json();

    timeInfo = data?.timeInfo;

    if (!timeInfo) {
        throw new Error(
            `Time Info is not available from the service: ${imageryServiceURL}`
        );
    }

    // availableYears = populateAvailableYears(timeInfo.timeExtent);

    return timeInfo;
};

/**
 * Get list of years between start and end date from the time extent
 *
 * @param timeExtent Time Extent from Sentinel2_10m_LandCover's Time Info
 * @returns
 */
export const populateAvailableYears = (timeExtent: number[]) => {
    const [start, end] = timeExtent;
    const startYear = new Date(start).getUTCFullYear();

    const endYear = new Date(end).getUTCFullYear();

    const years = [];

    let year = startYear;

    while (year <= endYear) {
        years.push(year);
        year++;
    }

    return years;
};

/**
 * Get the time extent for a specific year from the Sentinel2_10m_LandCover layer
 *
 * @param targetYear The year to get the time extent for
 * @param imageryServiceURL The URL of the Sentinel2_10m_LandCover Image Service
 * @returns TimeExtentData containing start and end times in Unix timestamp
 */
export const getTimeExtentByYear = async (
    targetYear: number,
    imageryServiceURL: string
): Promise<TimeExtentData> => {
    if (!targetYear) {
        throw new Error('Target year is required to get time extent data.');
    }

    if (!timeInfo) {
        await loadTimeInfo(imageryServiceURL);
    }
    // Destructure the start and end times (in Unix timestamp) from the timeInfo object
    const [startTimeInUnixTimestamp, endTimeInUnixTimestamp] =
        timeInfo.timeExtent;

    // Get the full year from the start and end times
    const fullYearFromStartTime = new Date(
        startTimeInUnixTimestamp
    ).getUTCFullYear();
    const fullYearFromEndTime = new Date(
        endTimeInUnixTimestamp
    ).getUTCFullYear();

    // If the target year is before or equal to the layer's start year, use the start time
    if (targetYear <= fullYearFromStartTime) {
        return {
            start: startTimeInUnixTimestamp,
            end: startTimeInUnixTimestamp,
        };
    }

    // If the target year is after or equal to the layer's end year, use the end time
    if (targetYear >= fullYearFromEndTime) {
        return {
            start: endTimeInUnixTimestamp,
            end: endTimeInUnixTimestamp,
        };
    }

    // Calculate the difference in years between the target year and the start year
    const diffInYear = targetYear - fullYearFromStartTime;

    // Add the difference in years to the start time to get the Unix timestamp for the target year
    const targetYearInUnixTimestamp = addYears(
        startTimeInUnixTimestamp,
        diffInYear
    ).getTime();

    return {
        start: targetYearInUnixTimestamp,
        end: targetYearInUnixTimestamp,
    };
};

// /**
//  * Get list of years that there are data available from Sentinel2_10m_LandCover layer
//  * @returns array of years (e.g. `[2017, 2018, 2019, 2020, 2021]`)
//  */
// export const getAvailableYears = () => {
//     return [...availableYears];
// };
