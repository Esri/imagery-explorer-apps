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

import { AGOL_PORTAL_ROOT, ARCGIS_REST_API_ROOT } from '@shared/config';
import { getSignedInUser, getToken } from '@shared/utils/esri-oauth';

type UpdateItemParams = {
    id: string;
    title?: string;
    snippet?: string;
    description?: string;
    accessInformation?: string;
    licenseInfo?: string;
};

type UpdateItemResponse = {
    success: boolean;
    id: string;
};

/**
 * Updates an item on ArcGIS Online with the provided parameters.
 *
 * @param {Object} params - The parameters for updating the item.
 * - {string} params.id - The ID of the item to update.
 * - {string} params.title - The new title for the item (optional).
 * - {string} params.snippet - The new snippet for the item (optional).
 * @returns {Promise<UpdateItemResponse>} A promise that resolves to the response of the update operation.
 * @throws {Error} Throws an error if the token or signed-in user is not available, or if the update operation fails.
 *
 * @see https://developers.arcgis.com/rest/users-groups-and-items/update-item/
 */
export const updateItem = async ({
    id,
    title,
    snippet,
    description,
    accessInformation,
    licenseInfo,
}: UpdateItemParams): Promise<UpdateItemResponse> => {
    const token = getToken();
    const signedInUser = getSignedInUser();

    if (!token || !signedInUser) {
        throw new Error('Cannot update item without token or signed in user');
    }

    const requestBody = new URLSearchParams({
        token,
        f: 'json',
    });

    if (title) {
        requestBody.append('title', title);
    }

    if (snippet) {
        requestBody.append('snippet', snippet);
    }

    if (description) {
        requestBody.append('description', description);
    }

    if (accessInformation) {
        requestBody.append('accessInformation', accessInformation);
    }

    if (licenseInfo) {
        requestBody.append('licenseInfo', licenseInfo);
    }

    const { username } = signedInUser;

    const requestURL = `${ARCGIS_REST_API_ROOT}/content/users/${username}/items/${id}/update`;

    const res = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
    });

    const data = await res.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    return data;
};
