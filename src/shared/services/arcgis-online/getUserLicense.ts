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

import { getPortalBaseUrl, getToken } from '@shared/utils/esri-oauth';

export type UserLicenseData = {
    userLicenseTypeId: string;
    availableCredits: number;
};

export const getUserLicense = async (
    userId: string
): Promise<UserLicenseData> => {
    const portalBaseUrl = getPortalBaseUrl();

    const userProfileUrl = `${portalBaseUrl}/sharing/rest/community/users/${userId}`;

    const params = new URLSearchParams({
        f: 'json',
        returnUserLicensedItems: 'true',
        token: getToken(),
    });

    const userProfileRes = await fetch(
        userProfileUrl + '?' + params.toString()
    );

    const userProfileData = await userProfileRes.json();

    return {
        userLicenseTypeId: userProfileData?.userLicenseTypeId || null,
        availableCredits: userProfileData?.availableCredits || 0,
    };
};
