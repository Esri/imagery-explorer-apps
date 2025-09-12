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

import { ICreateServiceResult } from '@esri/arcgis-rest-feature-service';
import { ARCGIS_REST_API_ROOT } from '@shared/config';
import { getUserPortal } from '@shared/utils/esri-oauth';
import { canCreateItem } from './checkUserRoleAndPrivileges';

/**
 * Formats the provided service name by replacing any character that is not
 * a letter, number, or underscore with an underscore.
 *
 * @param serviceName - The name of the service to be formatted.
 * @returns The formatted service name with invalid characters replaced by underscores.
 */
export const formatHostedImageryServiceName = (serviceName: string) => {
    return serviceName.replace(/[^a-zA-Z0-9_]/g, '_');
};

/**
 * Create a new hosted Imagery Service on ArcGIS Online.
 *
 * This function sends a request to the ArcGIS Online API to create an image service with the specified name and properties.
 * It constructs the request parameters and posts them to the appropriate API endpoint.
 *
 * @param {string} serviceName - The name of the imagery service to be created.
 * @param {string} token - The OAuth token of the authenticated user.
 * @returns {Promise<ICreateServiceResult>} A promise that resolves with the API response object containing details of the created service.
 *
 * Example response from the API:
 * ```
 * {
 *    "encodedServiceURL": "https://service.arcgis.com/Gkz.../arcgis/rest/services/Name_of_the_service/ImageServer",
 *    "itemId": "7eeab1...",
 *    "name": "Name_of_the_service",
 *    "serviceItemId": "7eeab1...",
 *    "serviceurl": "https://service.arcgis.com/Gkz.../arcgis/rest/services/Name_of_the_service/ImageServer",
 *    "size": -1,
 *    "success": true,
 *    "type": "Image Service",
 *    "typeKeywords": [
 *      "Dynamic Imagery Layer"
 *    ],
 *    "isView": false
 * }
 * ```
 */
export const createHostedImageryService = async (
    serviceName: string,
    token: string
): Promise<ICreateServiceResult> => {
    const portal = getUserPortal();

    const { user } = portal;

    const username = user?.username;

    if (!token || !username) {
        throw new Error('User is not authenticated');
    }

    if (canCreateItem(user) === false) {
        throw new Error('User does not have the privileges to publish content');
    }

    const serviceNameCleaned = formatHostedImageryServiceName(serviceName); //serviceName.replace(/[^a-zA-Z0-9_]/g, '_');

    const params = new URLSearchParams({
        createParameters: JSON.stringify({
            name: serviceNameCleaned,
            description: '',
            capabilities: 'Image',
            properties: {
                isCached: true,
                path: '@',
                description: '',
                copyright: '',
            },
        }),
        outputType: 'imageService',
        f: 'json',
        token,
    });

    const requestURL = `${ARCGIS_REST_API_ROOT}/content/users/${username}/createService`;

    const res = await fetch(requestURL, {
        method: 'POST',
        body: params,
    });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data?.success) {
        throw data;
    }

    return data as ICreateServiceResult;
};
