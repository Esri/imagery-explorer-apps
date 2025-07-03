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

import Point from '@arcgis/core/geometry/Point';
import { Sentinel2Scene, TemporalProfileData } from '@typing/imagery-service';
import { getSentinel2Scenes } from './getSentinel2Scenes';
import { getDateRangeForYear } from '@shared/utils/date-time/getTimeRange';
import { ImageryScene } from '@shared/store/ImageryScene/reducer';
import { deduplicateImageryScenes4TemporalProfileTool } from '../helpers/deduplicateListOfScenes';
import { convertSentinel2SceneToImageryScene } from './helpers';
import { getPixelValues } from '../helpers/getPixelValues';
import { SENTINEL_2_SERVICE_URL } from './config';
import { combinePixelValuesWithScenes } from '../helpers/combinePixelValuesWithScenes';

type GetSentinel2TemporalProfileDataOptions = {
    queryLocation: Point;
    /**
     * acquisition month to be used to fetch temporal trend data for a given month (Year to Year)
     */
    acquisitionMonth: number;
    /**
     * acquisition year to be used to fetch temporal trend data for a given year (Month to Month)
     */
    acquisitionYear: number;
    /**
     * abortController that will be used to cancel the pending requests
     */
    abortController: AbortController;
};

/**
 * Retrieves Sentinel-2 temporal profile data based on the provided options.
 *
 * @param {Object} options - The options for retrieving temporal profile data.
 * @param {Object} options.queryLocation - The location to query for Sentinel-2 scenes.
 * @param {number} options.queryLocation.x - The x-coordinate of the query location.
 * @param {number} options.queryLocation.y - The y-coordinate of the query location.
 * @param {number} [options.acquisitionMonth] - The acquisition month to filter Sentinel-2 scenes.
 * @param {number} [options.acquisitionYear] - The acquisition year to filter Sentinel-2 scenes.
 * @param {AbortController} options.abortController - The abort controller to cancel the request if needed.
 * @returns {Promise<TemporalProfileData[]>} A promise that resolves to an array of temporal profile data.
 */
export const getSentinel2TemporalProfileData = async ({
    queryLocation,
    acquisitionMonth,
    acquisitionYear,
    abortController,
}: GetSentinel2TemporalProfileDataOptions): Promise<TemporalProfileData[]> => {
    const { x, y } = queryLocation;

    let sentinel2Scenes: Sentinel2Scene[] = [];

    if (acquisitionMonth) {
        // query Sentinel-2 scenes based on input location and acquisition month to show "year-to-year" trend
        sentinel2Scenes = await getSentinel2Scenes({
            mapPoint: [x, y],
            acquisitionMonth,
            abortController,
        });
    } else if (acquisitionYear) {
        // query Sentinel-2 scenes based on input location and acquisition year to show "month-to-month" trend
        sentinel2Scenes = await getSentinel2Scenes({
            mapPoint: [x, y],
            acquisitionDateRange: getDateRangeForYear(acquisitionYear),
            abortController,
        });
    }

    if (!sentinel2Scenes.length) {
        return [];
    }

    // refine Sentinel-2 scenes based on cloud coverage.
    const scenesToSample = deduplicateImageryScenes4TemporalProfileTool(
        sentinel2Scenes.map((scene) =>
            convertSentinel2SceneToImageryScene(scene)
        )
    );

    // // extract object IDs from refined Sentinel-2 scenes.
    // const objectIds = scenesToSample.map((d) => d.objectId);

    const pixelValues = await getPixelValues({
        serviceURL: SENTINEL_2_SERVICE_URL,
        point: queryLocation,
        objectIds: scenesToSample.map((d) => d.objectId),
        abortController,
    });

    const temporalProfileData = combinePixelValuesWithScenes(
        pixelValues,
        scenesToSample
    );

    return temporalProfileData;
};
