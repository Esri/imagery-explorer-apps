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

// import { TIER } from '@shared/constants';
import { TIER, getServiceConfig } from '@shared/config';

const serviceConfig = getServiceConfig('sentinel-1');

/**
 * Sentinel-1 RTC 10-meter C-band synthetic aperture radar (SAR) imagery in single and dual V-polarization with on-the-fly functions for visualization and unit conversions for analysis.
 * This imagery layer is updated daily with the latest available imagery from the Microsoft Planetary Computer data catalog.
 * @see https://www.arcgis.com/home/item.html?id=ca91605a3261409aa984f01f7d065fbc
 */
export const SENTINEL_1_ITEM_ID = `ca91605a3261409aa984f01f7d065fbc`;

/**
 * URL of the Sentinel-1 Item on ArcGIS Online
 */
export const SENTINEL_1_ITEM_URL = `https://www.arcgis.com/home/item.html?id=${SENTINEL_1_ITEM_ID}`;

/**
 * This is the original service URL, which will prompt user to sign in by default as it requires subscription
 */
const SENTINEL_1_ORIGINAL_SERVICE_URL =
    'https://sentinel1.imagery1.arcgis.com/arcgis/rest/services/Sentinel1RTC/ImageServer';

/**
 * Service URL to be used in PROD enviroment
 */
export const SENTINEL_1_SERVICE_URL_PROD =
    serviceConfig?.production || SENTINEL_1_ORIGINAL_SERVICE_URL;

/**
 * Service URL to be used in DEV enviroment
 */
export const SENTINEL_1_SERVICE_URL_DEV =
    serviceConfig?.development || SENTINEL_1_ORIGINAL_SERVICE_URL;

/**
 * A proxy imagery service which has embedded credential that points to the actual Landsat Level-2 imagery service
 * @see https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer
 */
export const SENTINEL_1_SERVICE_URL =
    TIER === 'development'
        ? SENTINEL_1_SERVICE_URL_DEV
        : SENTINEL_1_SERVICE_URL_PROD;

/**
 * List of Raster Functions for the Sentinel-1 service
 */
const SENTINEL1_RASTER_FUNCTIONS = [
    'Sentinel-1 RGB dB DRA',
    'Sentinel-1 RGB dB',
    'Sentinel-1 RTC VV dB with DRA',
    'Sentinel-1 RTC VH dB with DRA',
] as const;

export type Sentinel1FunctionName = (typeof SENTINEL1_RASTER_FUNCTIONS)[number];

/**
 * Sentinel-1 Raster Function Infos
 * @see https://sentinel1.imagery1.arcgis.com/arcgis/rest/services/Sentinel1RTC/ImageServer/rasterFunctionInfos
 */
export const SENTINEL1_RASTER_FUNCTION_INFOS: {
    name: Sentinel1FunctionName;
    description: string;
    label: string;
}[] = [
    {
        name: 'Sentinel-1 RGB dB DRA',
        description:
            'RGB color composite of VV,VH,VV/VH in dB scale with a dynamic stretch applied for visualization only',
        label: 'RGB dB DRA',
    },
    {
        name: 'Sentinel-1 RGB dB',
        description:
            'RGB color composite of VV,VH,VV/VH in dB scale for visualization and some computational analysis',
        label: 'RGB dB',
    },
    {
        name: 'Sentinel-1 RTC VV dB with DRA',
        description:
            'VV data in dB scale with a dynamic stretch applied for visualization only',
        label: 'VV dB',
    },
    {
        name: 'Sentinel-1 RTC VH dB with DRA',
        description:
            'VH data in dB scale with a dynamic stretch applied for visualization only',
        label: 'VH dB',
    },
];
