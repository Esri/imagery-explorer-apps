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
import {
    Sentinel1OrbitDirection,
    Sentinel1Scene,
    TemporalProfileData,
} from '@typing/imagery-service';
import {
    getSentinel1SceneByObjectId,
    getSentinel1Scenes,
} from './getSentinel1Scenes';
import { getDateRangeForYear } from '@shared/utils/date-time/getTimeRange';
// import { splitObjectIdsToSeparateGroups } from '../helpers/splitObjectIdsToSeparateGroups';
// import { identify } from '../helpers/identify';
import { SENTINEL_1_SERVICE_URL } from './config';
import { PixelValuesData, getPixelValues } from '../helpers/getPixelValues';

type GetSentinel1TemporalProfileDataOptions = {
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
     * object id of selected sentinel-1 scene
     */
    objectId: number;
    // /**
    //  * orbit direction
    //  */
    // orbitDirection: Sentinel1OrbitDirection;
    /**
     * abortController that will be used to cancel the pending requests
     */
    abortController: AbortController;
};

export const getSentinel1TemporalProfileData = async ({
    queryLocation,
    // orbitDirection,
    objectId,
    acquisitionMonth,
    acquisitionYear,
    abortController,
}: GetSentinel1TemporalProfileDataOptions): Promise<TemporalProfileData[]> => {
    const { x, y } = queryLocation;

    let sentinel1Scenes: Sentinel1Scene[] = [];

    // get data of selected sentinel-1 scene and use the orbit direction of this scene to query temporal profile data
    const selectedScene = await getSentinel1SceneByObjectId(objectId);
    const orbitDirection = selectedScene.orbitDirection;

    if (acquisitionMonth) {
        // query Sentinel-1 scenes based on input location and acquisition month to show "year-to-year" trend
        sentinel1Scenes = await getSentinel1Scenes({
            mapPoint: [x, y],
            // dualPolarizationOnly: true,
            orbitDirection,
            acquisitionMonth,
            abortController,
        });
    } else if (acquisitionYear) {
        // query Sentinel-1 scenes based on input location and acquisition year to show "month-to-month" trend
        sentinel1Scenes = await getSentinel1Scenes({
            mapPoint: [x, y],
            // dualPolarizationOnly: true,
            orbitDirection,
            acquisitionDateRange: getDateRangeForYear(acquisitionYear),
            abortController,
        });
    }

    if (!sentinel1Scenes.length) {
        return [];
    }

    // refine Sentinel1 scenes and only keep one scene for each month
    const sentinel1ScenesToSample = getSentinel1ScenesToSample(
        sentinel1Scenes,
        acquisitionMonth
    );
    // console.log(sentinel1ScenesToSample)

    // extract object IDs from refined Sentinel-1 scenes.
    const objectIds = sentinel1ScenesToSample.map((d) => d.objectId);
    // console.log(objectIds)

    const pixelValues = await getPixelValues({
        serviceURL: SENTINEL_1_SERVICE_URL,
        point: queryLocation,
        objectIds,
        abortController,
    });
    // console.log(pixelValues);

    const temporalProfileData = formatAsTemporalProfileData(
        pixelValues,
        sentinel1ScenesToSample
    );
    // console.log(temporalProfileData);

    return temporalProfileData;
};

/**
 * Filters the input Sentinel1 scenes to retain only one scene per month.
 * If a specific acquisition month is provided, only scenes from that month are considered.
 * The selected scene for each month is the first scene of that month in the sorted list.
 *
 * @param scenes - An array of Sentinel1 scenes.
 * @param acquisitionMonth - An optional user-selected month to filter scenes by.
 *                           If provided, only scenes from this month will be kept.
 * @returns An array of Sentinel1 scenes, with only one scene per month.
 */
const getSentinel1ScenesToSample = (
    scenes: Sentinel1Scene[],
    acquisitionMonth?: number
): Sentinel1Scene[] => {
    if (!scenes.length) {
        return [];
    }

    scenes.sort((a, b) => a.acquisitionDate - b.acquisitionDate);
    // console.log(scenes);

    const candidates: Sentinel1Scene[] = [scenes[0]];

    const { relativeOrbit, orbitDirection } = scenes[0];

    for (let i = 1; i < scenes.length; i++) {
        const prevScene = candidates[candidates.length - 1];

        const currentScene = scenes[i];

        // skip if the relative orbit and orbit direction of the current scene
        // is not the same as the first scene
        if (
            currentScene.relativeOrbit !== relativeOrbit ||
            currentScene.orbitDirection !== orbitDirection
        ) {
            continue;
        }

        // If an acquisition month is provided, only keep scenes from that month.
        if (
            acquisitionMonth &&
            currentScene.acquisitionMonth !== acquisitionMonth
        ) {
            continue;
        }

        // add current scene to candidates if it was acquired from a different year or month
        if (
            prevScene?.acquisitionYear !== currentScene.acquisitionYear ||
            prevScene?.acquisitionMonth !== currentScene.acquisitionMonth
        ) {
            candidates.push(currentScene);
            continue;
        }
    }

    return candidates;
};

/**
 * Create Temporal Profiles Data by combining pixel values data and imagery scene data
 * @param samples
 * @param scenes Sentinel-1 Imagery Scenes
 * @returns
 */
const formatAsTemporalProfileData = (
    pixelValues: PixelValuesData[],
    scenes: Sentinel1Scene[]
): TemporalProfileData[] => {
    const output: TemporalProfileData[] = [];

    const sceneByObjectId = new Map<number, Sentinel1Scene>();

    for (const scene of scenes) {
        sceneByObjectId.set(scene.objectId, scene);
    }

    for (let i = 0; i < pixelValues.length; i++) {
        const d = pixelValues[i];
        const { objectId, values } = d;

        if (sceneByObjectId.has(objectId) === false) {
            continue;
        }

        // const scene = scenes[i];
        const {
            acquisitionDate,
            acquisitionMonth,
            acquisitionYear,
            formattedAcquisitionDate,
        } = sceneByObjectId.get(objectId);

        output.push({
            objectId,
            acquisitionDate,
            acquisitionMonth,
            acquisitionYear,
            formattedAcquisitionDate,
            values,
        });
    }

    return output;
};
