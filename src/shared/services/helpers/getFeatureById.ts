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

import { IFeature } from '@esri/arcgis-rest-feature-service';

type GetFeatureByObjectIdOptions = {
    abortController?: AbortController;
    token?: string;
};

/**
 * Query Imagery Service to get a feature by ObjectID
 * @param serviceUrl URL of the Imagery Service
 * @param objectId object id of the feature
 * @returns
 */
export const getFeatureByObjectId = async (
    serviceUrl: string,
    objectId: number,
    options?: GetFeatureByObjectIdOptions
): Promise<IFeature> => {
    const queryParams = new URLSearchParams({
        f: 'json',
        returnGeometry: 'true',
        objectIds: objectId.toString(),
        outFields: '*',
    });

    if (options?.token) {
        queryParams.set('token', options.token);
    }

    const abortController = options?.abortController;

    const res = await fetch(`${serviceUrl}/query?${queryParams.toString()}`, {
        signal: abortController?.signal,
    });

    if (!res.ok) {
        throw new Error('failed to query ' + serviceUrl);
    }

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.features || !data.features.length) {
        return null;
    }

    return data?.features[0] as IFeature;
};
