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

import { TIER } from '@shared/config';

// import { LandCoverClassification } from './rasterAttributeTable';

export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_DEV =
    'https://icdev.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer';

export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_PROD =
    'https://ic.imagery1.arcgis.com/arcgis/rest/services/Sentinel2_10m_LandCover/ImageServer';

export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL =
    TIER === 'development'
        ? SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_DEV
        : SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_PROD;

// export const SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL =
//     SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL_PROD;

export enum SENTINEL2_LANDCOVER_RASTER_FUNCTIONS {
    Cartographic_Renderer_for_Visualization = 'Cartographic Renderer for Visualization and Analysis',
    None = 'None',
    Isolate_Bare_Ground_Areas_for_Visualization_and_Analysis = 'Isolate Bare Ground Areas for Visualization and Analysis',
    Isolate_Built_Areas_for_Visualization_and_Analysis = 'Isolate Built Areas for Visualization and Analysis',
    Isolate_Clouds_for_Visualization_and_Analysis = 'Isolate Clouds for Visualization and Analysis',
    Isolate_Converted_Lands_for_Visualization_and_Analysis = 'Isolate Converted Lands for Visualization and Analysis',
    Isolate_Crops_for_Visualization_and_Analysis = 'Isolate Crops for Visualization and Analysis',
    Isolate_Flooded_Vegeation_Areas_for_Visualization_and_Analysis = 'Isolate Flooded Vegeation Areas for Visualization and Analysis',
    Isolate_Rangelands_Areas_for_Visualization_and_Analysis = 'Isolate Rangelands Areas for Visualization and Analysis',
    Isolate_Snow_or_Ice_for_Visualization_and_Analysis = 'Isolate Snow or Ice for Visualization and Analysis',
    Isolate_Trees_for_Visualization_and_Analysis = 'Isolate Trees for Visualization and Analysis',
    Isolate_Water_Areas_for_Visualization_and_Analysis = 'Isolate Water Areas for Visualization and Analysis',
}

export const SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION =
    SENTINEL2_LANDCOVER_RASTER_FUNCTIONS.Cartographic_Renderer_for_Visualization;

export const DEFAULT_RENDERING_RULE = {
    rasterFunction: SENTINEL2_LANDCOVER_DEFAULT_RASTER_FUNCTION,
};
