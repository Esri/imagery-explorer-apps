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

export type IntersectWithImagerySceneParams = {
    serviceUrl: string;
    objectId: number;
    point: Point;

    abortController?: AbortController;
};

/**
 * Check if the input point intersects with a Imagery scene specified by the input object ID.
 * @param point Point geometry representing the location to check for intersection.
 * @param objectId Object ID of the imagery scene to check intersection with.
 * @returns {boolean} Returns true if the input point intersects with the specified Imagery scene, otherwise false.
 */
export const intersectWithImageryScene = async ({
    serviceUrl,
    objectId,
    point,
    abortController,
}: IntersectWithImagerySceneParams): Promise<boolean> => {
    const geometry = JSON.stringify({
        spatialReference: {
            wkid: 4326,
        },
        x: point.longitude,
        y: point.latitude,
    });

    const queryParams = new URLSearchParams({
        f: 'json',
        returnCountOnly: 'true',
        returnGeometry: 'false',
        objectIds: objectId.toString(),
        geometry,
        spatialRel: 'esriSpatialRelIntersects',
        geometryType: 'esriGeometryPoint',
    });

    const res = await fetch(`${serviceUrl}/query?${queryParams.toString()}`, {
        signal: abortController.signal,
    });

    if (!res.ok) {
        throw new Error('failed to query service' + serviceUrl);
    }

    const data = await res.json();

    return data?.count && data?.count > 0;
};
