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

import { FIELD_NAMES } from './config';
import { SENTINEL_1_SERVICE_URL } from './config';
import { IExtent, IFeature } from '@esri/arcgis-rest-feature-service';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';
import {
    Sentinel1OrbitDirection,
    Sentinel1Scene,
} from '@typing/imagery-service';
import { DateRange } from '@typing/shared';
import { Point } from '@arcgis/core/geometry';
import { getFeatureByObjectId } from '../helpers/getFeatureById';
import { getExtentByObjectId } from '../helpers/getExtentById';
import { intersectWithImageryScene } from '../helpers/intersectWithImageryScene';

type GetSentinel1ScenesParams = {
    /**
     * longitude and latitude (e.g. [-105, 40])
     */
    mapPoint: number[];
    /**
     * orbit direction
     */
    orbitDirection?: Sentinel1OrbitDirection;
    /**
     * the relative orbits of sentinel-1 scenes
     */
    relativeOrbit?: string;
    /**
     * acquisition date range.
     *
     * @example
     * ```
     * {
     *   startDate: '2023-01-01',
     *   endDate: '2023-12-31'
     * }
     * ```
     */
    acquisitionDateRange?: DateRange;
    /**
     * acquisition month
     */
    acquisitionMonth?: number;
    /**
     * acquisition date in formate of `YYYY-MM-DD` (e.g. `2023-05-26`)
     */
    acquisitionDate?: string;
    /**
     * abortController that will be used to cancel the unfinished requests
     */
    abortController: AbortController;
};

// let controller:AbortController = null;

const {
    OBJECTID,
    ACQUISITION_DATE,
    NAME,
    SENSOR,
    ORBIT_DIRECTION,
    POLARIZATION_TYPE,
    ABSOLUTE_ORBIT,
    RELATIVE_ORBIT,
} = FIELD_NAMES;

/**
 * A Map that will be used to retrieve Sentinel-1 Scene data using the object Id as key
 */
const sentinel1SceneByObjectId: Map<number, Sentinel1Scene> = new Map();

/**
 * Formats the features from Sentinel-1 service and returns an array of Sentinel-1 objects.
 * @param features - An array of IFeature objects from Sentinel-1 service.
 * @returns An array of Sentinel1Scene objects containing the acquisition date, formatted acquisition date, and other attributes.
 */
export const getFormattedSentinel1Scenes = (
    features: IFeature[]
): Sentinel1Scene[] => {
    return features.map((feature) => {
        const { attributes } = feature;

        const acquisitionDate = attributes[ACQUISITION_DATE];

        const name = attributes[NAME];

        /**
         * formatted aquisition date should be like `2023-05-01`
         */
        const formattedAcquisitionDate = getFormatedDateString({
            date: +acquisitionDate,
        }); //format(acquisitionDate, 'yyyy-MM-dd');

        const [acquisitionYear, acquisitionMonth] = formattedAcquisitionDate
            .split('-')
            .map((d) => +d);

        const formattedScene: Sentinel1Scene = {
            objectId: attributes[OBJECTID],
            name,
            sensor: attributes[SENSOR],
            orbitDirection: attributes[ORBIT_DIRECTION],
            polarizationType: attributes[POLARIZATION_TYPE],
            absoluteOrbit: attributes[ABSOLUTE_ORBIT],
            relativeOrbit: attributes[RELATIVE_ORBIT],
            acquisitionDate,
            formattedAcquisitionDate,
            acquisitionYear,
            acquisitionMonth,
        };

        return formattedScene;
    });
};

/**
 * Query the Sentinel-1 imagery service to find a list of scenes for available Sentinel-1 data that
 * intersect with the input map point or map extent and were acquired during the input year and month.
 *
 * @param {number} params - The params object that will be used query Sentinel-1 data
 * @returns {Promise} A promise that resolves to an array of Sentinel1Scene objects.
 *
 */
export const getSentinel1Scenes = async ({
    mapPoint,
    // acquisitionYear,
    acquisitionDateRange,
    orbitDirection,
    relativeOrbit,
    acquisitionMonth,
    acquisitionDate,
    abortController,
}: GetSentinel1ScenesParams): Promise<Sentinel1Scene[]> => {
    const whereClauses = [
        // `(${CATEGORY} = 1)`
    ];

    if (acquisitionDateRange) {
        whereClauses.push(
            `(${ACQUISITION_DATE} BETWEEN timestamp '${acquisitionDateRange.startDate} 00:00:00' AND timestamp '${acquisitionDateRange.endDate} 23:59:59')`
        );
    } else if (acquisitionDate) {
        // if acquisitionDate is provided, only query scenes that are acquired on this date,
        // otherwise, query scenes that were acquired within the acquisitionYear year
        whereClauses.push(
            `(${ACQUISITION_DATE} BETWEEN timestamp '${acquisitionDate} 00:00:00' AND timestamp '${acquisitionDate} 23:59:59')`
        );
    }

    // if (acquisitionMonth) {
    //     whereClauses.push(`(${MONTH} = ${acquisitionMonth})`);
    // }

    if (orbitDirection) {
        whereClauses.push(`(${ORBIT_DIRECTION} = '${orbitDirection}')`);
    } else {
        whereClauses.push(`(${ORBIT_DIRECTION} is NOT NULL)`);
    }

    if (relativeOrbit) {
        whereClauses.push(`(${RELATIVE_ORBIT} = ${relativeOrbit})`);
    }

    // we should only include scenes with dual polarization
    whereClauses.push(`(${POLARIZATION_TYPE} = 'Dual')`);

    const [longitude, latitude] = mapPoint;

    const geometry = JSON.stringify({
        spatialReference: {
            wkid: 4326,
        },
        x: longitude,
        y: latitude,
    });

    const params = new URLSearchParams({
        f: 'json',
        spatialRel: 'esriSpatialRelIntersects',
        // geometryType: 'esriGeometryEnvelope',
        geometryType: 'esriGeometryPoint',
        outFields: '*',
        orderByFields: ACQUISITION_DATE,
        resultOffset: '0',
        returnGeometry: 'false',
        resultRecordCount: '1000',
        geometry,
        where: whereClauses.join(` AND `),
    });

    const res = await fetch(
        `${SENTINEL_1_SERVICE_URL}/query?${params.toString()}`,
        {
            signal: abortController.signal,
        }
    );

    if (!res.ok) {
        throw new Error('failed to query Sentinel-1 Imagery service');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    const sentinel1Scenes: Sentinel1Scene[] = getFormattedSentinel1Scenes(
        data?.features || []
    );

    // save the sentinel-1 scenes to `sentinel1SceneByObjectId` map
    for (const sentinel1Scene of sentinel1Scenes) {
        sentinel1SceneByObjectId.set(sentinel1Scene.objectId, sentinel1Scene);
    }

    return sentinel1Scenes;
};

/**
 * Query a feature from Sentinel-1 service using the input object Id,
 * and return the feature as formatted Sentinel Scene.
 * @param objectId The unique identifier of the feature
 * @returns The formatted Sentinel-11 Scene corresponding to the objectId
 */
export const getSentinel1SceneByObjectId = async (
    objectId: number
): Promise<Sentinel1Scene> => {
    // Check if the Sentinel-1 scene already exists in the cache
    if (sentinel1SceneByObjectId.has(objectId)) {
        return sentinel1SceneByObjectId.get(objectId);
    }

    const feature = await getFeatureByObjectId(
        SENTINEL_1_SERVICE_URL,
        objectId
    );

    if (!feature) {
        return null;
    }

    const sentinel1Scene: Sentinel1Scene = getFormattedSentinel1Scenes([
        feature,
    ])[0];

    sentinel1SceneByObjectId.set(objectId, sentinel1Scene);

    return sentinel1Scene;
};

/**
 * Get the extent of a feature from Sentinel-1 service using the object Id as key.
 * @param objectId The unique identifier of the feature
 * @returns IExtent The extent of the feature from Sentinel-1 service
 */
export const getExtentOfSentinel1SceneByObjectId = async (
    objectId: number
): Promise<IExtent> => {
    const extent = await getExtentByObjectId(SENTINEL_1_SERVICE_URL, objectId);

    return extent;
};

/**
 * Check if the input point intersects with the Sentinel-1 scene specified by the input object ID.
 * @param point Point geometry representing the location to check for intersection.
 * @param objectId Object ID of the Sentinel-1 scene to check intersection with.
 * @returns {boolean} Returns true if the input point intersects with the specified Sentinel-1 scene, otherwise false.
 */
export const intersectWithSentinel1Scene = async (
    point: Point,
    objectId: number,
    abortController?: AbortController
) => {
    const res = await intersectWithImageryScene({
        serviceUrl: SENTINEL_1_SERVICE_URL,
        objectId,
        point,
        abortController,
    });

    return res;
};
