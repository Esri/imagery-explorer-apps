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

import { IExtent } from '@esri/arcgis-rest-feature-service';

const cachedExtent = new Map<string, IExtent>();

/**
 * Fetches the extent of a feature by its object ID from a given service URL.
 *
 * @param {Object} params - The parameters for the function.
 * @param {string} params.serviceUrl - The URL of the service to query.
 * @param {number} params.objectId - The object ID of the feature to query.
 * @param {number} [params.outputSpatialReference] - The spatial reference for the output extent.
 * @param {string} [params.token] - The token for authentication if required.
 * @returns {Promise<IExtent>} A promise that resolves to the extent of the feature.
 * @throws Will throw an error if the query fails or if the response contains an error.
 */
export const getExtentByObjectId = async ({
    serviceUrl,
    objectId,
    outputSpatialReference,
    token,
}: {
    serviceUrl: string;
    objectId: number;
    outputSpatialReference?: number;
    token?: string;
}): Promise<IExtent> => {
    const cacheKey = `${serviceUrl}/${objectId}`;

    if (cachedExtent.has(cacheKey)) {
        return cachedExtent.get(cacheKey);
    }

    const queryParams = new URLSearchParams({
        f: 'json',
        returnExtentOnly: 'true',
        objectIds: objectId.toString(),
    });

    if (outputSpatialReference) {
        queryParams.append('outSR', outputSpatialReference.toString());
    }

    if (token) {
        queryParams.append('token', token);
    }

    const res = await fetch(`${serviceUrl}/query?${queryParams.toString()}`);

    if (!res.ok) {
        throw new Error('failed to query ' + serviceUrl);
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.extent) {
        return null;
    }

    cachedExtent.set(cacheKey, data.extent);

    return cachedExtent.get(cacheKey) as IExtent;
};
