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
 * Land Cover Type that are supported by the Spectral Profile Tool
 */
export type LandCoverType =
    | 'Trees'
    | 'Cloud'
    | 'Clear Water'
    | 'Turbid Water'
    | 'Snow and Ice'
    | 'Sand'
    | 'Bare Soil'
    | 'Paved Surface'
    | 'Healthy Vegetation'
    | 'Dry Vegetation';

/**
 * Lookup table that contains spectral profile data for different land cover types.
 */
export type SpectralProfileDataByLandCoverType = Record<
    LandCoverType,
    number[]
>;

/**
 * List of supported land cover types.
 */
export const ListOfLandCoverTypes: LandCoverType[] = [
    'Snow and Ice',
    'Cloud',
    'Sand',
    'Healthy Vegetation',
    'Dry Vegetation',
    'Bare Soil',
    'Paved Surface',
    'Trees',
    'Turbid Water',
    'Clear Water',
];
