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

import { FIELD_NAMES, SENTINEL_2_SERVICE_URL } from './config';
import { IExtent, IFeature } from '@esri/arcgis-rest-feature-service';
import { getFormatedDateString } from '@shared/utils/date-time/formatDateString';
import { Sentinel2Scene } from '@typing/imagery-service';
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

const { OBJECTID, ACQUISITION_DATE, CLOUD_COVER, NAME, CATEGORY, MONTH } =
    FIELD_NAMES;

/**
 * A Map that will be used to retrieve Landsat Scene data using the object Id as key
 */
const sentinel2SceneByObjectId: Map<number, Sentinel2Scene> = new Map();

/**
 * Formats the features from Sentinel-2 service and returns an array of Sentinel2Scene objects.
 * @param features - An array of IFeature objects from Sentinel-2 service.
 * @returns An array of Sentinel2Scene objects containing the acquisition date, formatted acquisition date, name, cloud cover, and best attributes.
 */
export const getFormattedSentinel2Scenes = (
    features: IFeature[]
): Sentinel2Scene[] => {
    return features.map((feature) => {
        const { attributes } = feature;

        const acquisitionDate = attributes[ACQUISITION_DATE];

        /**
         * formatted aquisition date should be like `2023-05-01`
         */
        const formattedAcquisitionDate = getFormatedDateString({
            date: +acquisitionDate,
        }); //format(acquisitionDate, 'yyyy-MM-dd');

        const [acquisitionYear, acquisitionMonth] = formattedAcquisitionDate
            .split('-')
            .map((d) => +d);

        const sentinel2Scene: Sentinel2Scene = {
            objectId: attributes[OBJECTID],
            // productId,
            acquisitionDate,
            formattedAcquisitionDate,
            name: attributes[NAME],
            cloudCover: attributes[CLOUD_COVER] / 100,
            formattedCloudCover: attributes[CLOUD_COVER]
                ? Math.ceil(attributes[CLOUD_COVER] * 100)
                : 0,
            acquisitionYear,
            acquisitionMonth,
        };

        return sentinel2Scene;
    });
};

/**
 * Query the Landsat-level-2 imagery service to find a list of scenes for available Landsat data that
 * intersect with the input map point or map extent and were acquired during the input year and month.
 *
 * @param {number} params.year - The year of the desired acquisition dates.
 * @param {Object} params.mapPoint - The point geometry to query.
 *
 * @returns {Promise} A promise that resolves to an array of LandsatScene objects.
 *
 */
export const getSentinel2Scenes = async ({
    mapPoint,
    // acquisitionYear,
    acquisitionDateRange,
    acquisitionMonth,
    acquisitionDate,
    abortController,
}: GetSentinel1ScenesParams): Promise<Sentinel2Scene[]> => {
    const whereClauses = [`(${CATEGORY} = 1)`];

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

    if (acquisitionMonth) {
        whereClauses.push(`(${MONTH} = ${acquisitionMonth})`);
    }

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
        // inSR: '102100',
        outFields: [ACQUISITION_DATE, CLOUD_COVER, NAME].join(','),
        orderByFields: ACQUISITION_DATE,
        resultOffset: '0',
        returnGeometry: 'false',
        resultRecordCount: '1000',
        geometry,
        where: whereClauses.join(` AND `),
    });

    const res = await fetch(
        `${SENTINEL_2_SERVICE_URL}/query?${params.toString()}`,
        {
            signal: abortController.signal,
        }
    );

    if (!res.ok) {
        throw new Error('failed to query Landsat-2 service');
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    const sentinel2Scenes: Sentinel2Scene[] = getFormattedSentinel2Scenes(
        data?.features || []
    );

    // save the sentinel-2 scenes to `sentinel2SceneByObjectId` map
    for (const sentinel2Scene of sentinel2Scenes) {
        sentinel2SceneByObjectId.set(sentinel2Scene.objectId, sentinel2Scene);
    }

    return sentinel2Scenes;
};

/**
 * Query a feature from Sentinel-2 service using the input object Id,
 * and return the feature as formatted Sentinel-2 Scene.
 * @param objectId The unique identifier of the feature
 * @returns Sentinel2Scene The formatted Landsat Scene corresponding to the objectId
 */
export const getSentinel2SceneByObjectId = async (
    objectId: number
): Promise<Sentinel2Scene> => {
    // Check if the sentinel-2 scene already exists in the cache
    if (sentinel2SceneByObjectId.has(objectId)) {
        return sentinel2SceneByObjectId.get(objectId);
    }

    const feature = await getSentinel2FeatureByObjectId(objectId);

    if (!feature) {
        return null;
    }

    const sentinel2Scene = getFormattedSentinel2Scenes([feature])[0];

    sentinel2SceneByObjectId.set(objectId, sentinel2Scene);

    return sentinel2Scene;
};

export const getSentinel2FeatureByObjectId = async (
    objectId: number
): Promise<IFeature> => {
    const feature = await getFeatureByObjectId(
        SENTINEL_2_SERVICE_URL,
        objectId
    );
    return feature;
};

/**
 * Get the extent of a feature from Sentinel-2 service using the object Id as key.
 * @param objectId The unique identifier of the feature
 * @returns IExtent The extent of the feature from Sentinel-2 service
 */
export const getExtentOfSentinel2SceneByObjectId = async (
    objectId: number
): Promise<IExtent> => {
    const extent = await getExtentByObjectId({
        serviceUrl: SENTINEL_2_SERVICE_URL,
        objectId,
    });
    return extent;
};

/**
 * Check if the input point intersects with the Sentinel-2 scene specified by the input object ID.
 * @param point Point geometry representing the location to check for intersection.
 * @param objectId Object ID of the Sentinel-2 scene to check intersection with.
 * @returns {boolean} Returns true if the input point intersects with the specified Sentinel-2 scene, otherwise false.
 */
export const intersectWithSentinel2Scene = async (
    point: Point,
    objectId: number,
    abortController?: AbortController
) => {
    const res = await intersectWithImageryScene({
        serviceUrl: SENTINEL_2_SERVICE_URL,
        objectId,
        point,
        abortController,
    });

    return res;
};
