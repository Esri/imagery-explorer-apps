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

import { Geometry, Point } from '@arcgis/core/geometry';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import { getMosaicRuleByObjectIds } from './getMosaicRuleByObjectId';

/**
 * Parameters for the Identify Task
 */
export type IdentifyTaskParams = {
    /**
     * URL of the imagery service
     */
    serviceURL: string;
    /**
     * Point geometry to be used in the identify task
     */
    point: Point;
    /**
     * Object IDs of the imagery scenes
     */
    objectIds?: number[];
    /**
     * Abort controller to be used to cancel the identify task
     */
    abortController: AbortController;
};

/**
 * Run identify task on an imagery service to fetch pixel values for the input point location
 * @param param0 - IdentifyTaskParams object containing parameters for the identify task
 * @returns Promise of IdentifyTaskResponse containing the result of the identify task
 */
export type IdentifyTaskResponse = {
    catalogItems: {
        features: IFeature[];
        geometryType: string;
        objectIdFieldName: string;
    };
    location: Geometry;
    value: string;
    name: string;
    properties: {
        Values: string[];
    };
};

/**
 * Run identify task on an imagery service to fetch pixel values for the input point location
 * @param param0
 * @returns
 */
export const identify = async ({
    serviceURL,
    point,
    objectIds,
    abortController,
}: IdentifyTaskParams): Promise<IdentifyTaskResponse> => {
    const mosaicRule =
        objectIds && objectIds.length
            ? getMosaicRuleByObjectIds(objectIds)
            : {
                  ascending: true,
                  mosaicMethod: 'esriMosaicAttribute',
                  mosaicOperation: 'MT_FIRST',
                  sortField: 'best',
                  sortValue: '0',
              };

    const params = new URLSearchParams({
        f: 'json',
        // maxItemCount: '1',
        returnGeometry: 'false',
        returnCatalogItems: 'true',
        geometryType: 'esriGeometryPoint',
        geometry: JSON.stringify({
            spatialReference: {
                wkid: 4326,
            },
            x: point.longitude,
            y: point.latitude,
        }),
        mosaicRule: JSON.stringify(mosaicRule),
    });

    const requestURL = `${serviceURL}/identify?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return data as IdentifyTaskResponse;
};
