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

import { ARCGIS_REST_API_ROOT } from '@shared/config';
import { getToken, getUserPortal } from '@shared/utils/esri-oauth';

/**
 * The isServiceNameAvailable operation checks whether a given service name and type are available for publishing a new service.
 * If the response returns as true, no service of the same name and type is found in the organization's services and is available for publishing.
 * If the response returns as false, a service of that name and type was already published to the organization.
 *
 * @param title the title of the service
 * @returns a boolean indicating whether the service name is available
 *
 * @see https://developers.arcgis.com/rest/users-groups-and-items/check-service-name/
 */
export const checkIsServiceNameAvailable = async (
    title: string
): Promise<boolean> => {
    const token = getToken();

    const portal = getUserPortal();

    const url = `${ARCGIS_REST_API_ROOT}/portals/${portal.id}/isServiceNameAvailable`;

    const params = new URLSearchParams({
        f: 'json',
        name: title,
        type: 'Image Service',
        includeitemid: 'false',
        token,
    });

    const response = await fetch(`${url}?${params.toString()}`);

    if (!response.ok) {
        throw new Error('Failed to check if the service name is available');
    }

    const data = await response.json();

    return data?.available || false;
};
