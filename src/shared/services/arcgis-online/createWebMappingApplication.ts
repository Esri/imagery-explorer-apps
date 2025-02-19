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

import { getToken } from '@shared/utils/esri-oauth';
import { addItem, AddItemParams, AddItemResponse } from './addItem';

type CreateWebMappingApplicationOptions = {
    title: string;
    snippet: string;
    tags?: string[];
    description?: string;
    /**
     * Credits the source of the item.
     */
    accessInformation?: string;
    /**
     * 	Includes any license information or restrictions.
     */
    licenseInfo?: string;
};

export const createWebMappingApplication = async ({
    title,
    snippet,
    tags,
    description,
    accessInformation,
    licenseInfo,
}: CreateWebMappingApplicationOptions): Promise<AddItemResponse> => {
    const requestBody: AddItemParams = {
        // f: 'json',
        // token: getToken(),
        typeKeywords: ['Web Map', 'Map', 'Online Map', 'Mapping Site'].join(
            ','
        ),
        type: 'Web Mapping Application',
        applicationType: 'web',
        url: window.location.href,
        title,
        snippet,
        tags: tags?.join(',') || '',
        description,
        accessInformation,
        licenseInfo,
    };

    const res = await addItem(requestBody);

    return res;
};
