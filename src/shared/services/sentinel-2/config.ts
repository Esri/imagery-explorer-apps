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

// import { TIER } from '@shared/constants';
import { TIER } from '@shared/config';

// const serviceConfig = getServiceConfig('sentinel-2');
// console.log('sentinel-2 service config', serviceConfig);

// /**
//  *
//  * Sentinel-2 multispectral and multitemporal atmospherically corrected imagery with on-the-fly visual renderings and indices for visualization and analysis.
//  * This imagery layer is sourced from the Microsoft Planetary Computer and is updated daily with new imagery. This layer is in beta release.
//  * @see https://www.arcgis.com/home/item.html?id=255af1ceee844d6da8ef8440c8f90d00
//  */
// export const SENTINEL_2_ITEM_ID = `255af1ceee844d6da8ef8440c8f90d00`;

// /**
//  * URL of the Sentinel-2 Item on ArcGIS Online
//  */
// export const SENTINEL_2_ITEM_URL = `https://www.arcgis.com/home/item.html?id=${SENTINEL_2_ITEM_ID}`;

/**
 * This is the original service URL, which will prompt user to sign in by default as it requires subscription
 */
const SENTINEL_2_ORIGINAL_SERVICE_URL_PROD =
    'https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer';

// const SENTINEL_2_ORIGINAL_SERVICE_URL_DEV =
//     'https://sentineldev.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer';

export const SENTINEL_2_ORIGINAL_SERVICE_URL =
    ENV_SENTINEL2_ORIGINAL_SERVICE_URL || SENTINEL_2_ORIGINAL_SERVICE_URL_PROD;
// TIER === 'development'
//     ? SENTINEL_2_ORIGINAL_SERVICE_URL_DEV
//     : SENTINEL_2_ORIGINAL_SERVICE_URL_PROD;

// /**
//  * Service URL to be used in PROD enviroment
//  */
// const SENTINEL_2_SERVICE_URL_PROD =
//     SENTINEL2_SERVICE_PROXY_URL_PROD || SENTINEL_2_ORIGINAL_SERVICE_URL_PROD;

// /**
//  * Service URL to be used in DEV enviroment
//  *
//  */
// const SENTINEL_2_SERVICE_URL_DEV =
//     SENTINEL2_SERVICE_PROXY_URL_DEV || SENTINEL_2_ORIGINAL_SERVICE_URL_DEV;

/**
 * A proxy imagery service which has embedded credential that points to the sentinel-2 imagery service
 * @see https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer
 */
export const SENTINEL_2_SERVICE_URL =
    ENV_SENTINEL2_PROXY_SERVICE_URL || SENTINEL_2_ORIGINAL_SERVICE_URL_PROD;
// TIER === 'development'
//     ? SENTINEL_2_SERVICE_URL_DEV
//     : SENTINEL_2_SERVICE_URL_PROD;

/**
 * Field Names Look-up table for Sentinel2L2A (ImageServer)
 * @see https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer
 */
export enum FIELD_NAMES {
    OBJECTID = 'objectid',
    NAME = 'name',
    SATELLITE = 'platform',
    SENSOR = 'instrument',
    ACQUISITION_DATE = 'acquisitiondate',
    CLOUD_COVER = 'cloudcover',
    SNOW_ICE_PERCENTAGE = 'snowicepercentage',
    PRODUCT = 'productname',
    RELATIVE_ORBIT = 'relativeorbit',
    SUN_ZENITH = 'meansolarzenith',
    SUN_AZIMUTH = 'meansolarazimuth',
    ABSOLUTE_ORBIT = 'absoluteorbit',
    CATEGORY = 'category',
    MONTH = 'month',
    NO_DATA_PERCENTAGE = 'nodatapixelpercentage',
}

/**
 * List of Raster Functions for the Sentinel-1 service
 */
const SENTINEL2_RASTER_FUNCTIONS = [
    'Natural Color for Visualization',
    'Agriculture for Visualization',
    'Bathymetric for Visualization',
    'Color Infrared for Visualization',
    'Short-wave Infrared for Visualization',
    'Geology for Visualization',
    'Urban for Visualization',
    'NDVI Colorized for Visualization',
    'NDMI Colorized for Visualization',
    'MNDWI Colorized for Visualization',
    // 'Normalized Burn Ratio',
] as const;

export type Sentinel2FunctionName = (typeof SENTINEL2_RASTER_FUNCTIONS)[number];

/**
 * Sentinel-2 Raster Function Infos
 * @see https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer/rasterFunctionInfos
 */
export const SENTINEL2_RASTER_FUNCTION_INFOS: {
    name: Sentinel2FunctionName;
    description: string;
    label: string;
}[] = [
    {
        name: 'Natural Color for Visualization',
        description:
            'Natural Color bands red, green, blue (4, 3, 2) displayed with dynamic range adjustment applied.',
        label: 'Natural Color',
    },
    {
        name: 'Agriculture for Visualization',
        description:
            'Bands shortwave IR-1, near-IR, blue (11, 8, 2) with dynamic range adjustment applied. Vigorous veg. is bright green, stressed veg. dull green and bare areas as brown.',
        label: 'Agriculture',
    },
    {
        name: 'Color Infrared for Visualization',
        description:
            'Bands near-infrared, red, green (8,4,3) with dynamic range adjustment applied. Healthy vegetation is bright red while stressed vegetation is dull red.',
        label: 'Color IR',
    },
    {
        name: 'Short-wave Infrared for Visualization',
        description:
            'Bands shortwave infrared-2, shortwave infrared-1, red (12, 11, 4) with dynamic range adjustment applied.',
        label: 'Short-wave IR',
    },
    {
        name: 'Urban for Visualization',
        description:
            'Bands shortwave IR-2, shortwave IR-1, red (12, 11, 4) with dynamic range adjustment applied.',
        label: 'Urban',
    },
    {
        name: 'NDVI Colorized for Visualization',
        description:
            'Normalized difference vegetation index (NDVI) with colormap. Dark green represents vigorous vegetation and brown represents sparse vegetation. It is computed as (b8 - b4) / (b8 + b4) and is suitable for vegetation, land cover and plant health monitoring.',
        label: 'NDVI',
    },
    {
        name: 'NDMI Colorized for Visualization',
        description:
            'Normalized Difference Moisture Index with color map. Wetlands and moist areas appear blue whereas dry areas are represented by deep yellow and brown color. It is computed as NIR(B8)-SWIR1(B11)/NIR(B8)+SWIR1(B11).',
        label: 'NDMI',
    },
    {
        name: 'MNDWI Colorized for Visualization',
        description:
            'Modified Normalized Difference Water Index with color map computed as (b3 - b11) / (b3 + b11). Wetlands and moist areas range from light green to dark blue.  This template is for visualization only and should not be used as input to analysis.',
        label: 'MNDWI',
    },
    {
        name: 'Bathymetric for Visualization',
        description:
            'Bands red, green, coastal/aerosol(4, 3, 1) with dynamic range adjustment applied. Useful in bathymetric mapping applicaitons.',
        label: 'Bathymetric',
    },
    {
        name: 'Geology for Visualization',
        description:
            'Bands shortwave IR-2, shortwave IR-1, blue (12, 11, 2) with dynamic range adjustment applied. Highlights geological features.',
        label: 'Geology',
    },
];

export const SENTINEL2_SERVICE_SORT_FIELD = 'best';

export const SENTINEL2_SERVICE_SORT_VALUE = '0';

export const SENTINEL2_BAND_NAMES: string[] = [
    'Aerosol',
    'Blue',
    'Green',
    'Red',
    'Veg 1',
    'Veg 2',
    'Veg 3',
    'NIR',
    'N-NIR',
    'Vapor',
    'SWIR 1',
    'SWIR 2',
];

export const SENTINEL2_NATIVE_SCALE = 37795;
