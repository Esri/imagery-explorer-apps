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

import PortalUser from '@arcgis/core/portal/PortalUser';

/**
 * Check if user can create and publish content on ArcGIS Online
 * If the user is an admin or publisher, they can publish content
 * If the user has the createItem privilege, they can publish content
 * If the user is a public account (orgId is null), they can publish content
 *
 * @param user  The ArcGIS Online potal user object
 * @returns {boolean} indicating if the user can publish content
 *
 * @see https://community.esri.com/t5/arcgis-online-public-account-community/arcgis-online-public-accounts-getting-started/ba-p/1305110
 */
export const canCreateItem = (user: PortalUser): boolean => {
    if (!user) {
        return false;
    }

    const { role, privileges, orgId } = user || {};

    // return user.role === 'org_admin' || user.role === 'org_publisher';

    const output =
        role === 'org_admin' ||
        role === 'org_publisher' ||
        (privileges && privileges.some((p) => p.endsWith('createItem'))) ||
        orgId === null ||
        orgId === undefined; // for public account, orgId is null

    return output;
};

/**
 * Check if the user has the privileges to use raster analysis
 * The user must have the GIS Professional Advanced user type and more than 2 credits
 * @param user the ArcGIS Online potal user object
 * @returns {boolean} indicating if the user can use raster analysis
 */
export const hasRasterAnalysisPrivileges = (
    userLicenseTypeId: string
): boolean => {
    if (!userLicenseTypeId) {
        return false;
    }

    // Check if the user has the GIS Professional or above user type
    // @see https://developers.arcgis.com/rest/enterprise-administration/portal/create-user/
    const isProfessionalUser =
        userLicenseTypeId === 'GISProfessionalStdUT' ||
        userLicenseTypeId === 'GISProfessionalAdvUT';

    // Check if the user has the GIS Professional or above user type
    return isProfessionalUser;
};
