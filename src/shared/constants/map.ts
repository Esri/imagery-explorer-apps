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

// import { appConfig } from '@shared/config';

/**
 * Default Web Map ID for the Imagery Explorer apps.
 *
 * @see https://www.arcgis.com/home/item.html?id=81609bbe235942919ad27c77e42c600e
 */
const DEFAULT_WEB_MAP_ID = '81609bbe235942919ad27c77e42c600e';

/**
 * Item ID of the ArcGIS Online web map used in the application.
 * Try to use the value defined in the .env file first, otherwise fallback to the default value.
 */
export const WEB_MAP_ID = ENV_WEB_MAP_ID || DEFAULT_WEB_MAP_ID;
console.log('WEB_MAP_ID:', WEB_MAP_ID);

/**
 * Default Map Center
 */
export const MAP_CENTER = [-117.18, 34.055];

/**
 * Default Map Zoom
 */
export const MAP_ZOOM = 10;

export const HUMAN_GEO_DARK_LABEL_LAYER_TITLE = 'Human Geography Dark Label';

export const HUMAN_GEO_LIGHT_WATER_LAYER_TITLE =
    'Human Geography Dark Detail Light Water';

export const HUMAN_GEO_DARK_DRY_LAYER_TITLE = 'Human Geography Dark Detail Dry';

export const TERRAIN_LAYER_TITLE = 'World Hillshade';

export const TERRAIN_LAYER_ITEM_ID = '1b243539f4514b6ba35e7d995890db1d';

export const WORLD_IMAGERY_BASEMAP_LAYER_TITLE = 'World Imagery';

export const CUSTOM_OCEAN_BASEMAP_LAYER_TITLE = 'LandCoverAppOceans';
