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
