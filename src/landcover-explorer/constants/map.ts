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

import { appConfig } from '@shared/config';

// export const WEB_MAP_ID_PROD = 'f8770e0adc5c41038026494b871ceb99'; // 'f8770e0adc5c41038026494b871ceb99';

// export const WEB_MAP_ID_DEV = '6ad8fa259c7d4195893bf412d5f1afa7'; // '6ad8fa259c7d4195893bf412d5f1afa7';

// export const WEB_MAP_ID =
//     TIER === 'development' ? WEB_MAP_ID_DEV : WEB_MAP_ID_PROD;

/**
 * Item Id of web map with Grayscale imagery basemap created by John Nelson
 *
 * @see https://www.arcgis.com/home/item.html?id=f8770e0adc5c41038026494b871ceb99
 */
export const WEB_MAP_ID = appConfig.webmapId;

/**
 * Web Map (also owned by John Nelson) that will be used in the Download Panel
 */
export const DWONLOAD_MODE_WEB_MAP_ID = '20e55f26c4704ade8b9716117315f99b';

// /**
//  * ArcGIS Online Item of the Sentinel 2 layer
//  */
// export const SENTINEL_2_ITEM_URL =
//     'https://www.arcgis.com/home/item.html?id=255af1ceee844d6da8ef8440c8f90d00';

export const SENTINEL_2_10M_LAND_COVER_ITEM_ID = `cfcb7609de5f478eb7666240902d4d3d`;
/**
 * ArcGIS Online Item of the Sentinel 2 10m Land Cover layer
 */
// export const SENTINEL_2_10M_LAND_COVER_ITEM_URL =
//     'https://www.arcgis.com/home/item.html?id=' +
//     SENTINEL_2_10M_LAND_COVER_ITEM_ID;

export const HUMAN_GEO_DARK_LABEL_LAYER_TITLE = 'Human Geography Dark Label';
export const HUMAN_GEO_LIGHT_WATER_LAYER_TITLE =
    'Human Geography Dark Detail Light Water';
export const HUMAN_GEO_DARK_DRY_LAYER_TITLE = 'Human Geography Dark Detail Dry';

export const TERRAIN_LAYER_TITLE = 'World Hillshade';

export const WORLD_IMAGERY_BASEMAP_LAYER_TITLE = 'World Imagery';

export const CUSTOM_OCEAN_BASEMAP_LAYER_TITLE = 'LandCoverAppOceans';

export const DEFAULT_MAP_CENTERS = [
    /**
     * Redlands, CA
     */
    [-117.2, 34.06],
    /**
     * Ouagadougou Urban Growth
     */
    [-1.5291857159413615, 12.34679214124087],
    /**
     * Cairo/Giza Urban Growth
     */
    [31.203195579662275, 29.940685904791454],
    /**
     * Dubai Urban Growth
     */
    [55.24574471295667, 25.065418094633884],
    /**
     * New Istanbul International Airport Urban Growth
     */
    [28.770980343066835, 41.26722654745566],
    /**
     * Katy, TX Urban Growth
     */
    [-95.81943728345719, 29.689161455214563],
    /**
     * Dulles International Airport, Virginia Urban Growth
     */
    [-77.539560574477, 38.95145741362514],
    /**
     * Netherlands Ijsselmeer Land Reclamation
     */
    [5.341905427700178, 52.583440118023915],
    /**
     * Cottbus, Germany Brown Coal Surface Mining
     */
    [14.590291485038362, 51.86862640875489],
    /**
     * Grand Ethiopian Renaissance Dam Filling
     */
    [35.136950236343175, 11.137212999754135],
    /**
     * Kinabatangan, Malaysia Forest Change
     */
    [117.99675798688344, 5.567609872666111],
    /**
     * Yakutsk, Russia Forest Change Possible Fires
     */
    [122.35362768059403, 63.85442175496704],
    /**
     * Rondonia/Acre/Amazonas States Brazil, Deforestation
     */
    [-66.80083417615404, -9.321964396201427],
    /**
     * Harz Mountains, Germany Insect Forest Loss
     */
    [10.786962017265964, 51.66528316513757],
    /**
     * Pantanal, Brazil Wetland Loss
     */
    [-57.24410199842215, -17.9170611731539],
    /**
     * Kangaroo Island Fires, Australia
     */
    [137.15246105680552, -35.87640612603586],
    /**
     * Victoria/NSW Fires, Australia
     */
    [147.7439680148107, -37.18990047616979],
    /**
     * Northern California Fires
     */
    [-121.63953997510028, 39.37072553056537],
    /**
     * Argentina Drought
     */
    [-62.54227854628496, -33.919184859409874],
    /**
     * Abaco Island, Bahamas Before/After Hurricane Dorian
     */
    [-77.0837137879799, 26.381002947959416],
    /**
     * North and South Korea Economic Contrast
     */
    [127.23979711418653, 38.035460460724195],
    /**
     * Hawaii Island Lava Flow and Shoreline Change
     */
    [-154.87343059931618, 19.47701133213732],
    /**
     * Brahmaputra River, India Stream Braiding
     */
    [92.21745441836734, 26.423771934246933],
];

export const DEFAULT_MAP_ZOOM = 11;

export const MIN_MAP_ZOOM_FOR_COMPUTE_HISTOGRAM = 10;
