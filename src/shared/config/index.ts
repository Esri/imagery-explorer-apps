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

import config from '../../config.json';

type AppConfig = {
    /**
     * Title of the explorer app (e.g., 'Esri | Landsat Explorer')
     */
    title: string;
    /**
     * Item id of the web map to be used in the app
     */
    webmapId: string;
    /**
     * Sources information to be added to output MP4 file
     */
    animationMetadataSources?: string;
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

/**
 * a type that represents the keys of the imagery services object in the `/src/config.json` file
 */
export type ServiceName = keyof typeof config.services;

/**
 * Name of the imagery explore app to start/build that defined in Webpack via DefinePlugin.
 * The APP_NAME should match one of the keys in apps object of the `/src/config.json` file.
 */
export const APP_NAME: AppName = WEBPACK_DEFINED_APP_NAME as AppName;

/**
 * config file for the imagery explorer app to start/build
 */
export const appConfig: AppConfig = config.apps[APP_NAME];

/**
 * Tier of the app (production or development)
 */
export const TIER =
    window.location.host === 'livingatlas.arcgis.com' ||
    window.location.host === 'livingatlasstg.arcgis.com'
        ? 'production'
        : 'development';

/**
 * Root URL of the ArcGIS Online portal
 */
export const AGOL_PORTAL_ROOT =
    TIER === 'production'
        ? `https://www.arcgis.com`
        : `https://devext.arcgis.com`;

/**
 * Root URL of the ArcGIS REST API
 * @see https://developers.arcgis.com/rest/
 */
export const ARCGIS_REST_API_ROOT = AGOL_PORTAL_ROOT + '/sharing/rest';

/**
 * Get imagery service config by name
 * @param serviceName
 * @returns
 */
export const getServiceConfig = (serviceName: ServiceName) => {
    return config.services[serviceName];
};
