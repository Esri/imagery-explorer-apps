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

import { getExtentByObjectId } from './getExtentById';

/**
 * Retrieves the centroid point of a feature from an imagery service using the object ID as a key.
 * @param serviceUrl The URL of the imagery service.
 * @param objectId The unique identifier of the feature.
 * @returns A promise that resolves to an array containing the [longitude, latitude] of the centroid of the feature's extent.
 */
export const getCentroidByObjectId = async (
    serviceUrl: string,
    objectId: number
): Promise<number[]> => {
    const extent = await getExtentByObjectId({
        serviceUrl,
        objectId,
        outputSpatialReference: 4326,
    });

    const { ymax, ymin } = extent;
    let { xmax, xmin } = extent;

    // Normalize the x values in case the extent crosses the International Date Line
    if (xmin < 0 && xmax > 0) {
        xmin = xmax;
        xmax = 180;
    }

    const centerX = (xmax - xmin) / 2 + xmin;
    const centerY = (ymax - ymin) / 2 + ymin;

    return [centerX, centerY];
};
