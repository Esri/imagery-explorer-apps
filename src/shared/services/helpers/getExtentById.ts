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

import { IExtent } from '@esri/arcgis-rest-feature-service';

/**
 * Get the extent of a feature from a imagery service using the object Id as key.
 * @param objectId The unique identifier of the feature
 * @returns IExtent The extent of the feature from the input service
 */
export const getExtentByObjectId = async (
    serviceUrl: string,
    objectId: number,
    outputSpatialReference?: number
): Promise<IExtent> => {
    const queryParams = new URLSearchParams({
        f: 'json',
        returnExtentOnly: 'true',
        objectIds: objectId.toString(),
    });

    if (outputSpatialReference) {
        queryParams.append('outSR', outputSpatialReference.toString());
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

    return data?.extent as IExtent;
};
