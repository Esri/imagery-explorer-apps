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

export const RASTER_ANALYSIS_SERVER_ROOT_URL =
    ENV_RASTER_ANALYSIS_ROOT_URL ||
    'https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer';
// TIER === 'development'
//     ? 'https://rasteranalysisdev.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer'
//     : 'https://rasteranalysis.arcgis.com/arcgis/rest/services/RasterAnalysisTools/GPServer';

/**
 * The names of the raster analysis tasks.
 */
export enum RasteranalysisTaskName {
    EstimateRasterAnalysisCost = 'EstimateRasterAnalysisCost',
    GenerateRaster = 'GenerateRaster',
}
