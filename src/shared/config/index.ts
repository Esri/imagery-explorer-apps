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

import config from '../../config.json';

type AppConfig = {
    /**
     * Title of the explorer app (e.g., 'Esri | Landsat Explorer')
     */
    title: string;
    // /**
    //  * Name of the satellite (e.g., 'Landsat')
    //  */
    // satellite: string;
    /**
     * Item id of the web map to be used in the app
     */
    webmapId: string;
    /**
     * App id to be used to create the OAuthInfo object
     * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-OAuthInfo.html#appId
     */
    appId: string;
};

/**
 * a type that represents the keys of the apps object in the `/src/config.json` file
 */
export type AppName = keyof typeof config.apps;

// /**
//  * a type that represents the keys of the imagery services object in the `/src/config.json` file
//  */
// export type ServiceName = keyof typeof config.services;

/**
 * Name of the imagery explore app to start/build that defined in Webpack via DefinePlugin.
 * The APP_NAME should match one of the keys in apps object of the `/src/config.json` file.
 */
export const APP_NAME: AppName = WEBPACK_DEFINED_APP_NAME as AppName;

/**
 * config file for the imagery explorer app to start/build
 */
export const appConfig: AppConfig = config.apps[APP_NAME];

// /**
//  * Tier of the app based on the SERVICE_TIER environment variable
//  */
// const TIER_BASED_ON_ENV = SERVICE_TIER
//     ? SERVICE_TIER === 'production'
//         ? 'production'
//         : 'development'
//     : undefined;
// // console.log('TIER_BASED_ON_ENV:', TIER_BASED_ON_ENV);

/**
 * Tier of the app based on the host name
 */
const TIER_BASED_ON_HOST =
    window.location.host === 'livingatlas.arcgis.com' ||
    window.location.host === 'livingatlasstg.arcgis.com'
        ? 'production'
        : 'development';

/**
 * Tier of the app (production or development)
 */
export const TIER = TIER_BASED_ON_HOST;
console.log(`The application is using ${TIER} services based on host name`);

/**
 * Root URL of the ArcGIS Online portal based on the tier
 */
// const AGOL_PORTAL_ROOT_BASED_ON_TIER =
//     TIER === 'production'
//         ? `https://www.arcgis.com`
//         : `https://devext.arcgis.com`;
// console.log(`The application is using ${AGOL_PORTAL_ROOT_BASED_ON_TIER}.`);

/**
 * Root URL of the ArcGIS Portal
 */
export const AGOL_PORTAL_ROOT =
    ENV_ARCGIS_PORTAL_ROOT_URL || 'https://www.arcgis.com';

/**
 * Root URL of the ArcGIS REST API
 *
 * @example https://www.arcgis.com/sharing/rest
 *
 * @see https://developers.arcgis.com/rest/
 */
export const ARCGIS_REST_API_ROOT = AGOL_PORTAL_ROOT + '/sharing/rest';

// /**
//  * Get imagery service config by name
//  * @param serviceName
//  * @returns
//  */
// export const getServiceConfig = (serviceName: ServiceName) => {
//     return config.services[serviceName];
// };

/**
 * App ID to be used to create the OAuthInfo object.
 *
 * @see https://developers.arcgis.com/javascript/latest/api-reference/esri-identity-OAuthInfo.html#appId
 */
// export const APP_ID = TIER === 'production' ? appConfig.appId : 'LAWWebsite';
export const APP_ID = appConfig?.appId || '';

/**
 * Application ID for the Landsat Explorer app.
 * Required for ArcGIS OAuth authentication for features such as saving selected scenes.
 * This is defined in the environment variable `ENV_LANDSAT_EXPLORER_APP_ID` by Webpack DefinePlugin.
 */
export const LANDSAT_EXPLORER_APP_ID = ENV_LANDSAT_EXPLORER_APP_ID || '';

/**
 * Application ID for the Sentinel-2 Explorer app.
 * Required for ArcGIS OAuth authentication for features such as saving selected scenes.
 * This is defined in the environment variable `ENV_SENTINEL2_EXPLORER_APP_ID` by Webpack DefinePlugin.
 */
export const SENTINEL2_EXPLORER_APP_ID = ENV_SENTINEL2_EXPLORER_APP_ID || '';

/**
 * Application ID for the Sentinel-1 Explorer app.
 * Required for ArcGIS OAuth authentication for features such as saving selected scenes.
 * This is defined in the environment variable `ENV_SENTINEL1_EXPLORER_APP_ID` by Webpack DefinePlugin.
 */
export const SENTINEL1_EXPLORER_APP_ID = ENV_SENTINEL1_EXPLORER_APP_ID || '';
