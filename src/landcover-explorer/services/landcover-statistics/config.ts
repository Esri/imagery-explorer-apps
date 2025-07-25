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

// import { TIER } from '@shared/config';

/**
 * Here is the link to the hosted table containing the precalculated land cover summary stats.
 * - Each record in the table is an individual admin area (e.g. state, province, etc).
 * - Each admin area has once entry per year (or 5 occurrences)
 */
// export const LAND_COVER_STATISTICS_SERVICE_URL_DEV =
//     'https://servicesdev.arcgis.com/VLx4vrvwONglS8iz/ArcGIS/rest/services/WFOA_S2LULC_HistoStats_Dev/FeatureServer/0';

export const LAND_COVER_STATISTICS_SERVICE_URL_PROD =
    'https://services.arcgis.com/P3ePLMYs2RVChkJx/arcgis/rest/services/WFOA_S2LULC_HistoStats_Prod/FeatureServer/0';

export const LAND_COVER_STATISTICS_SERVICE_URL =
    ENV_SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL ||
    LAND_COVER_STATISTICS_SERVICE_URL_PROD;
// TIER === 'development'
//     ? LAND_COVER_STATISTICS_SERVICE_URL_DEV
//     : LAND_COVER_STATISTICS_SERVICE_URL_PROD;

// export const LAND_COVER_STATISTICS_SERVICE_URL =
//     LAND_COVER_STATISTICS_SERVICE_URL_PROD;

export const FIELD_NAMES = {
    /**
     * Common country name
     */
    COUNTRY: 'COUNTRY',
    /**
     * Unique identifier for each first order administrative area
     */
    ISO_CODE: 'ISO_CODE',
    /**
     * Common name for each first order administrative area
     */
    NAME: 'NAME',
    /**
     * Land Cover year designation per row/admin area
     */
    YEAR: 'LCYear',
    /**
     * pixel count for water land cover type
     */
    WATER: 'WaterPixelCount',
    /**
     * pixel count for trees land cover type
     */
    TREE: 'TreesPixelCount',
    /**
     * pixel count for Flooded Vegetation land cover type
     */
    FLOODED_VEG: 'FloodedVegetationPixelCount',
    /**
     * pixel count for Crops land cover type
     */
    CROPS: 'CropsPixelCount',
    /**
     * pixel count for Built Area land cover type
     */
    BUILT: 'BuitAreaPixelCount',
    /**
     * pixel count for Bare Ground land cover type
     */
    BARE: 'BareGroundPixelCount',
    /**
     * pixel count for Snow land cover type
     */
    SNOW: 'SnowIcePixelCount',
    /**
     * pixel count for Clouds land cover type
     */
    CLOUD: 'CloudsPixelCount',
    /**
     * pixel count for Range Land land cover type
     */
    RANGE: 'RangelandPixelCount',
};
