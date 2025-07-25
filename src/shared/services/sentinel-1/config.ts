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
// import { TIER } from '@shared/config';

// const serviceConfig = getServiceConfig('sentinel-1');
// console.log('sentinel-1 service config', serviceConfig);

// const serviceUrls = {
//     development:
//         'https://utility.arcgis.com/usrsvcs/servers/c5f3f9cddbcb45e6b2434dd8eeef8083/rest/services/Sentinel1RTC/ImageServer',
//     production:
//         'https://utility.arcgis.com/usrsvcs/servers/c5f3f9cddbcb45e6b2434dd8eeef8083/rest/services/Sentinel1RTC/ImageServer',
// };

// /**
//  * Sentinel-1 RTC 10-meter C-band synthetic aperture radar (SAR) imagery in single and dual V-polarization with on-the-fly functions for visualization and unit conversions for analysis.
//  * This imagery layer is updated daily with the latest available imagery from the Microsoft Planetary Computer data catalog.
//  * @see https://www.arcgis.com/home/item.html?id=ca91605a3261409aa984f01f7d065fbc
//  */
// export const SENTINEL_1_ITEM_ID = `ca91605a3261409aa984f01f7d065fbc`;

// /**
//  * URL of the Sentinel-1 Item on ArcGIS Online
//  */
// export const SENTINEL_1_ITEM_URL = `https://www.arcgis.com/home/item.html?id=${SENTINEL_1_ITEM_ID}`;

/**
 * This is the original service URL, which will prompt user to sign in by default as it requires subscription
 */
const SENTINEL_1_ORIGINAL_SERVICE_URL_PROD =
    'https://sentinel1.imagery1.arcgis.com/arcgis/rest/services/Sentinel1RTC/ImageServer';

// const SENTINEL_1_ORIGINAL_SERVICE_URL_DEV =
//     'https://sentinel1dev.imagery1.arcgis.com/arcgis/rest/services/Sentinel1RTC/ImageServer';

/**
 * This is the original service URL, which will prompt user to sign in by default as it requires subscription
 */
export const SENTINEL_1_ORIGINAL_SERVICE_URL =
    ENV_SENTINEL1_ORIGINAL_SERVICE_URL || SENTINEL_1_ORIGINAL_SERVICE_URL_PROD;
// TIER === 'development'
//     ? SENTINEL_1_ORIGINAL_SERVICE_URL_DEV
//     : SENTINEL_1_ORIGINAL_SERVICE_URL_PROD;

// /**
//  * Service URL to be used in PROD enviroment
//  */
// const SENTINEL_1_SERVICE_URL_PROD =
//     SENTINEL1_SERVICE_PROXY_URL_PROD || SENTINEL_1_ORIGINAL_SERVICE_URL;

// /**
//  * Service URL to be used in DEV enviroment
//  *
//  * @see https://sentinel1dev.imagery1.arcgis.com/arcgis/rest/services/Sentinel1RTC/ImageServer/
//  */
// const SENTINEL_1_SERVICE_URL_DEV =
//     SENTINEL1_SERVICE_PROXY_URL_DEV || SENTINEL_1_ORIGINAL_SERVICE_URL;

/**
 * A proxy imagery service which has embedded credential that points to the actual Landsat Level-2 imagery service
 * @see https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer
 */
export const SENTINEL_1_SERVICE_URL =
    ENV_SENTINEL1_PROXY_SERVICE_URL || SENTINEL_1_ORIGINAL_SERVICE_URL;
// TIER === 'production'
// TIER === 'development'
//     ? SENTINEL_1_SERVICE_URL_DEV
//     : SENTINEL_1_SERVICE_URL_PROD;

/**
 * Field Names Look-up table for Sentinel1RTC (ImageServer)
 * @see https://sentinel1.imagery1.arcgis.com/arcgis/rest/services/Sentinel1RTC/ImageServer
 */
export const FIELD_NAMES = {
    OBJECTID: 'objectid',
    NAME: 'name',
    CENTER_X: 'centerx',
    CENTER_Y: 'centery',
    POLARIZATION_TYPE: 'polarizationtype',
    SENSOR: 'sensor',
    ORBIT_DIRECTION: 'orbitdirection',
    ACQUISITION_DATE: 'acquisitiondate',
    ABSOLUTE_ORBIT: 'absoluteorbit',
    RELATIVE_ORBIT: 'relativeorbit',
};

/**
 * List of Raster Functions for the Sentinel-1 service
 */
const SENTINEL1_RASTER_FUNCTIONS = [
    'False Color dB with DRA',
    // 'Sentinel-1 RGB dB',
    'VV dB Colorized',
    'VH dB Colorized',
    'SWI Colorized',
    // 'Sentinel-1 DpRVIc Raw',
    'Water Anomaly Index Colorized',
    'SWI Raw',
    'Water Anomaly Index Raw',
    'VV Amplitude with Despeckle',
    'VH Amplitude with Despeckle',
    // This RFT creates a two-band raster including VV and VH polarization in power scale, with a despeckling filter applied
    'VV and VH Power with Despeckle',
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
        name: 'False Color dB with DRA',
        description:
            'VV and VH refer to the Vertical or Horizontal orientation of the radar signals as they are transmitted to, and returned from, Earth’s surface. VV is particularly good for characterizing soil and water surfaces while VH for canopy vs bare ground.<br /><br />See the RENDERER information tool tip as well as the Sentinel-1 SAR Quick Reference Guide in the app title bar for more information on VV and VH polarizations.<br /><br /> The RGB image is composited as follows: Red=VV, Green=VH, B=VV-VH in decibel (dB) scale.',
        label: 'False Color',
    },
    {
        name: 'VV dB Colorized',
        description:
            'VV refers to a signal sent in a vertical orientation and returned in a vertical orientation. VV signals are strongest when they reflect off and return from vertically oriented surface features and are good for characterizing soil and water surfaces.<br /><br />See the RENDERER information tool tip as well as the Sentinel-1 SAR Quick Reference Guide in the app title bar for more information on VV and VH polarizations.<br /><br /> This is a single band renderer with a color ramp applied for visualization.',
        label: 'Colorized VV',
    },
    {
        name: 'VH dB Colorized',
        description:
            'VH refers to a signal sent in a vertical orientation and returned in a horizontal orientation. This cross polarization typically occurs with volumetric targets such as tree canopies. VH signals are strongest when they reflect off and return from horizontally oriented surface features and are good for helping to distinguish canopy vs bare ground.<br /><br />See the RENDERER information tool tip as well as the Sentinel-1 SAR Quick Reference Guide in the app title bar for more information on VV and VH polarizations.<br /><br /> This is a single band renderer with a color ramp applied for visualization.',
        label: 'Colorized VH',
    },
    {
        name: 'SWI Colorized',
        description:
            'Sentinel-1 Water Index with a color map. Wetlands and moist areas range from light green to dark blue.<br /><br /> Computed as (0.1747 * dB_vv) + (0.0082 * dB_vh * dB_vv) + (0.0023 * dB_vv ^ 2) - (0.0015 * dB_vh ^ 2) + 0.1904.',
        label: 'Water Index ',
    },
    {
        name: 'Water Anomaly Index Colorized',
        description:
            'A water anomaly index with a color map applied. Increased water anomalies are indicated by bright red, orange, and yellow colors. Water anomalies can include oil, industrial pollutants, sewage, red ocean tides, seaweed blobs, turbidity, and more.<br /><br /> Computed as Ln(0.01/(0.01 + VV*2)).',
        label: 'Water Anomaly',
    },
    // {
    //     name: 'SWI Raw',
    //     description:
    //         'Sentinel-1 Water Index with a 7x7 Refined Lee despeckling filter for extracting water bodies and monitoring droughts. Computed as (0.1747 * dB_vv) + (0.0082 * dB_vh * dB_vv) + (0.0023 * dB_vv ^ 2) - (0.0015 * dB_vh ^ 2) + 0.1904.',
    //     label: 'SWI',
    // },
    // {
    //     name: 'Water Anomaly Index Raw',
    //     description:
    //         'Water Anomaly Index with a 7x7 Refined Lee despeckling filter for detecting water pollutants and natural phenomena. For example oil, industrial pollutants, sewage, red ocean tides, seaweed blobs, turbidity, and more. Computed as Ln (0.01 / (0.01 + VV * 2)).',
    //     label: 'Water Anomaly',
    // },
    // {
    //     name: 'VV Amplitude with Despeckle',
    //     description: 'VV data in Amplitude scale for computational analysis',
    //     label: 'VV Amplitude',
    // },
    // {
    //     name: 'VH Amplitude with Despeckle',
    //     description: 'VH data in Amplitude scale for computational analysis',
    //     label: 'VH Amplitude',
    // },
];

/**
 * For the Water Index (SWI), we have selected a input range of -0.3 to 1, though it may need adjustment.
 */
export const SENTINEL1_WATER_INDEX_PIXEL_RANGE: number[] = [-0.5, 1];

/**
 * For Water Anomaly Index, we can use a input range of -2 to 0. Typically, oil appears within the range of -1 to 0.
 */
export const SENTINEL1_WATER_ANOMALY_INDEX_PIXEL_RANGE: number[] = [-2, 0];

/**
 * For both ship and urban detection, we can use range of 0 to 1 for the threshold slider
 */
export const SENTINEL1_SHIP_AND_URBAN_INDEX_PIXEL_RANGE: number[] = [0, 1];

export const SENTINEL1_SERVICE_SORT_FIELD = 'best';

export const SENTINEL1_SERVICE_SORT_VALUE = '-99999999';
