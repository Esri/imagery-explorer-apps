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

import { Point } from '@arcgis/core/geometry';
import { splitObjectIdsToSeparateGroups } from './splitObjectIdsToSeparateGroups';
import { IdentifyTaskResponse, identify } from './identify';
import { canBeConvertedToNumber } from '@shared/utils/snippets/canBeConvertedToNumber';

/**
 * Parameters for the Get Pixel Values
 */
export type GetPixelValuesParams = {
    /**
     * URL of the imagery service
     */
    serviceURL: string;
    /**
     * Point geometry to be used to query the pixel
     */
    point: Point;
    /**
     * Array of Object IDs to be used to find imagery scenes to get the pixel values from
     */
    objectIds?: number[];
    /**
     * Abort controller to be used to cancel the identify task
     */
    abortController: AbortController;
};

/**
 * Values of pixel at a given location from a imagery scene by object id
 */
export type PixelValuesData = {
    /**
     * object Id of the assoicate imagery scene
     */
    objectId: number;
    /**
     * array of pixel values
     */
    values: number[];
};

const cachedPixelValues = new Map<string, PixelValuesData[]>();

/**
 * Retrieves pixel values that intersect with the specified point from imagery scenes by the input object ID.
 * The function sends parallel identify requests for groups of object IDs to the specified service URL.
 *
 * @param param0 - An object containing the following properties:
 *   @param serviceURL - The URL of the imagery service.
 *   @param point - The geographic point used to intersect with the imagery scenes.
 *   @param objectIds - An array of object IDs to fetch pixel values for.
 *   @param abortController - An AbortController to handle request cancellation.
 * @returns A promise that resolves to an array of objects, each containing an object ID and its corresponding pixel values.
 */
export const getPixelValues = async ({
    serviceURL,
    point,
    objectIds,
    abortController,
}: GetPixelValuesParams): Promise<PixelValuesData[]> => {
    const cacheKey = `${serviceURL}/${objectIds.join(',')}`;

    if (cachedPixelValues.has(cacheKey)) {
        return cachedPixelValues.get(cacheKey);
    }

    // divide object IDs into separate groups for parallel fetching.
    const objectsIdsInSeparateGroups =
        splitObjectIdsToSeparateGroups(objectIds);
    // console.log(objectsIdsInSeparateGroups)

    // send identify requests in parallel for each group of object IDs.
    const identifyResponseInSeparateGroups: IdentifyTaskResponse[] =
        await Promise.all(
            objectsIdsInSeparateGroups.map((oids) =>
                identify({
                    serviceURL,
                    point,
                    objectIds: oids,
                    abortController,
                })
            )
        );
    // console.log(identifyResponseInSeparateGroups)

    const pixelValuesByObjectId: {
        [key: number]: number[];
    } = {};

    for (const res of identifyResponseInSeparateGroups) {
        const { catalogItems, properties } = res;

        const { features } = catalogItems;
        const { Values } = properties;

        for (let i = 0; i < features.length; i++) {
            const feature = features[i];
            const value = Values[i];

            // console.log(value)
            const objectId = feature.attributes.objectid;

            let containsNonNumericValue = false;

            const values = value.split(' ').map((d) => {
                if (canBeConvertedToNumber(d) === false) {
                    containsNonNumericValue = true;
                    return null;
                }

                return +d;
            });

            if (containsNonNumericValue) {
                continue;
            }

            pixelValuesByObjectId[objectId] = values;
        }
    }

    const output = objectIds
        .filter((objectId) => pixelValuesByObjectId[objectId] !== undefined)
        .map((objectId) => {
            return {
                objectId,
                values: pixelValuesByObjectId[objectId],
            };
        });

    cachedPixelValues.set(cacheKey, output);

    return output;
};
