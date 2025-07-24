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
 * Name of the imagery explore app to start/build that defined in Webpack via DefinePlugin.
 */
declare const WEBPACK_DEFINED_APP_NAME: string;

/**
 * Application ID for the Landsat Explorer app.
 * Required for authentication and features such as saving selected scenes.
 */
declare const ENV_LANDSAT_EXPLORER_APP_ID: string;

/**
 * The original service URL for Landsat Level 2 imagery service.
 * Optional: defaults to https://landsat.imagery1.arcgis.com/arcgis/rest/services/LandsatC2L2/ImageServer if not specified.
 */
declare const ENV_LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL: string;

/**
 * The proxy service URL for Landsat Level 2 imagery service.
 */
declare const ENV_LANDSAT_LEVEL_2_PROXY_SERVICE_URL: string;

/**
 * Application ID for the Sentinel-2 Explorer app.
 */
declare const ENV_SENTINEL2_EXPLORER_APP_ID: string;

/**
 * The proxy service URL for Sentinel-2 imagery service.
 */
declare const ENV_SENTINEL2_PROXY_SERVICE_URL: string;

/**
 * The original service URL for Sentinel-2 imagery service.
 * Optional: defaults to https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel2L2A/ImageServer if not specified.
 */
declare const ENV_SENTINEL2_ORIGINAL_SERVICE_URL: string;

/**
 * Application ID for the Sentinel-1 Explorer app.
 */
declare const ENV_SENTINEL1_EXPLORER_APP_ID: string;

/**
 * The proxy service URL for Sentinel-1 imagery service.
 */
declare const ENV_SENTINEL1_PROXY_SERVICE_URL: string;

/**
 * The original service URL for Sentinel-1 imagery service.
 * Optional: defaults to https://sentinel.imagery1.arcgis.com/arcgis/rest/services/Sentinel1GRD/ImageServer if not specified.
 */
declare const ENV_SENTINEL1_ORIGINAL_SERVICE_URL: string;

/**
 * The Portal root URL for ArcGIS Online or ArcGIS Enterprise.
 * Optional: defaults to https://www.arcgis.com if not specified.
 */
declare const ENV_ARCGIS_PORTAL_ROOT_URL: string;

/**
 * Raster Analysis GP server root URL.
 * Optional: defaults to https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer.
 */
declare const ENV_RASTER_ANALYSIS_ROOT_URL: string;

/**
 * Application ID for the Land Cover Explorer app.
 * Required for authentication and features such as saving web maps.
 */
declare const ENV_LANDCOVER_EXPLORER_APP_ID: string;

/**
 * The service URL for Sentinel-2 Land Cover imagery service.
 * Optional: defaults to https://ic.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer if not specified.
 */
declare const ENV_SENTINEL2_LANDCOVER_SERVICE_URL: string;

/**
 * The service URL for Sentinel-2 Land Cover statistics service.
 * Optional: defaults to https://ic.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover_Statistics/ImageServer if not specified.
 */
declare const ENV_SENTINEL2_LANDCOVER_STATISTICS_SERVICE_URL: string;

/**
 * The type of environment this code is running in.
 * Can be 'development' or 'production'.
 */
declare const ENV_TYPE:
    | 'development'
    | 'staging'
    | 'production'
    | 'test'
    | 'local';
