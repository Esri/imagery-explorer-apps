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
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from './config';

type TimeInfo = {
    timeExtent: number[];
    defaultTimeInterval: number;
    defaultTimeIntervalUnits: string;
};

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
 * Sentinel2_10m_LandCover's Time Info
 */
let timeInfo: TimeInfo;

/**
 * List of years that there are data available from Sentinel2_10m_LandCover layer
 *
 * @example
 * ```
 * [2017, 2018, 2019, 2020, 2021]
 * ```
 */
let availableYears: number[] = [];

/**
 * Load Time Info from Sentinel2_10m_LandCover's JSON
 *
 * https://env1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer?f=json
 * @returns
 */
export const loadTimeInfo = async (): Promise<TimeInfo> => {
    const requestURL = SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL + '?f=json';

    const res = await fetch(requestURL);

    const data = await res.json();

    timeInfo = data?.timeInfo;

    availableYears = populateAvailableYears(timeInfo.timeExtent);

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

    const startYear = new Date(start).getFullYear();

    const endYear = new Date(end).getFullYear();

    const years = [];

    let year = startYear;

    while (year <= endYear) {
        years.push(year);
        year++;
    }

    return years;
};

/**
 * Get Time Extent data for Sentinel2_10m_LandCover that matches the input target year
 *
 * @param year
 * @returns
 */
export const getTimeExtentByYear = async (
    targetYear: number
): Promise<TimeExtentData> => {
    if (!timeInfo) {
        await loadTimeInfo();
    }

    const [startTimeInUnixTimestamp, endTimeInUnixTimestamp] =
        timeInfo.timeExtent;

    const fullYearFromStartTime = new Date(
        startTimeInUnixTimestamp
    ).getFullYear();
    const fullYearFromEndTime = new Date(endTimeInUnixTimestamp).getFullYear();

    // target year is smaller than layer's start time, use layer's start time instead
    if (targetYear <= fullYearFromStartTime) {
        return {
            start: startTimeInUnixTimestamp,
            end: startTimeInUnixTimestamp,
        };
    }

    // target year is bigger than layer's end time, use layer's end time instead
    if (targetYear >= fullYearFromEndTime) {
        return {
            start: endTimeInUnixTimestamp,
            end: endTimeInUnixTimestamp,
        };
    }

    const diffInYear = targetYear - fullYearFromStartTime;

    const targetYearInUnixTimestamp = addYears(
        startTimeInUnixTimestamp,
        diffInYear
    ).getTime();

    return {
        start: targetYearInUnixTimestamp,
        end: targetYearInUnixTimestamp,
    };
};

/**
 * Get list of years that there are data available from Sentinel2_10m_LandCover layer
 * @returns array of years (e.g. `[2017, 2018, 2019, 2020, 2021]`)
 */
export const getAvailableYears = () => {
    return [...availableYears];
};
