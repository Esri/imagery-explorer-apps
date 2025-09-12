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

import {
    getPortalBaseUrl,
    getSignedInUser,
    getToken,
} from '@shared/utils/esri-oauth';
import { canCreateItem } from '../raster-analysis/checkUserRoleAndPrivileges';

export type AddItemResponse = {
    success: boolean;
    id: string;
    folder: string;
};

export type AddItemParams = {
    title: string;
    snippet: string;
    tags: string;
    description?: string;
    /**
     * Credits the source of the item.
     */
    accessInformation?: string;
    /**
     * 	Includes any license information or restrictions.
     */
    licenseInfo?: string;
    extent?: string;
    text?: string;
    url?: string;
    typeKeywords: string;
    type: string;
    applicationType?: string;
};

/**
 * Add an item to the signed in user's content
 * @param requestBody
 * @returns
 *
 * @see https://developers.arcgis.com/rest/users-groups-and-items/add-item/
 */
export const addItem = async (
    params: AddItemParams
): Promise<AddItemResponse> => {
    const portalRoot = getPortalBaseUrl();
    const signedInUser = getSignedInUser();

    if (!signedInUser) {
        throw new Error('Cannot add item without a signed-in user');
    }

    const token = getToken();

    if (!token) {
        throw new Error('Cannot add item in anonymous mode, sign in first');
    }

    if (canCreateItem(signedInUser) === false) {
        throw new Error('User does not have permission to publish content');
    }

    const requestBody = new URLSearchParams({
        f: 'json',
        token,
        ...params,
    });

    const requestURL = `${portalRoot}/sharing/rest/content/users/${signedInUser.username}/addItem`;

    const response = await fetch(requestURL, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: requestBody,
    });

    const data = await response.json();

    if (data.error) {
        throw new Error(data.error.message);
    }

    return data as AddItemResponse;
};
