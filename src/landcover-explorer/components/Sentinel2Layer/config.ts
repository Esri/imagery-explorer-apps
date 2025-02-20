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
 * Sentinel-2 Image Layer with embedded credentials uisng jzhang_content AGOL account
 *
 * https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer
 */
export const SENTINEL_2_IMAGE_SERVICE_URL =
    'https://utility.arcgis.com/usrsvcs/servers/3f0ca149c08f4746bc0d0fef2cee1624/rest/services/Sentinel2L2A/ImageServer';

export const SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES = {
    AcquisitionDate: 'AcquisitionDate',
    CloudCover: 'cloudcover',
};
