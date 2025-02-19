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
 * URL for Landsat service proxy in development environment
 */
declare const LANDSAT_SERVICE_PROXY_URL_DEV: string;

/**
 * URL for Landsat service proxy in production environment
 */
declare const LANDSAT_SERVICE_PROXY_URL_PROD: string;

/**
 * URL for Sentinel-2 service proxy in development environment
 */
declare const SENTINEL2_SERVICE_PROXY_URL_DEV: string;

/**
 * URL for Sentinel-2 service proxy in production environment
 */
declare const SENTINEL2_SERVICE_PROXY_URL_PROD: string;

/**
 * URL for Sentinel-1 service proxy in development environment
 */
declare const SENTINEL1_SERVICE_PROXY_URL_DEV: string;

/**
 * URL for Sentinel-1 service proxy in production environment
 */
declare const SENTINEL1_SERVICE_PROXY_URL_PROD: string;

/**
 * Specifies the service tier of the application
 */
declare const SERVICE_TIER: string;
