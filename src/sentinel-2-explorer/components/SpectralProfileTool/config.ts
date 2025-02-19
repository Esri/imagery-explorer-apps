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

import { SpectralProfileDataByLandCoverType } from '@shared/components/SpectralProfileTool';

/**
 * The typical spectral profiles data for Sentinel-2 Imagery
 */
export const Sentinel2SpectralProfileData: SpectralProfileDataByLandCoverType =
    {
        Cloud: [
            1.03265, 1.05048, 1.01048, 1.01232, 1.04323, 1.0126, 1.00559,
            1.04347, 0.98904, 1.1314, 0.57583, 0.47131,
        ],
        'Snow and Ice': [
            0.99017, 1.01778, 1.01494, 1.00485, 1.01552, 0.99254, 0.95747,
            0.93997, 0.91567, 0.90233, 0.10335, 0.10909,
        ],
        Sand: [
            0.17045, 0.24277, 0.30992, 0.36519, 0.38918, 0.38836, 0.39716,
            0.41087, 0.40149, 0.37243, 0.43412, 0.38336,
        ],
        'Dry Vegetation': [
            0.04732, 0.06093, 0.08916, 0.10076, 0.14655, 0.23523, 0.26743,
            0.28261, 0.29321, 0.29663, 0.29241, 0.19994,
        ],
        'Paved Surface': [
            0.13667, 0.17267, 0.20002, 0.21904, 0.23449, 0.22988, 0.23297,
            0.22776, 0.23079, 0.22566, 0.27044, 0.27213,
        ],
        'Bare Soil': [
            0.07416, 0.0955, 0.13096, 0.18147, 0.21583, 0.23725, 0.25643,
            0.26663, 0.28528, 0.2869, 0.38474, 0.29332,
        ],
        'Healthy Vegetation': [
            0.02361, 0.02915, 0.05346, 0.02994, 0.07978, 0.31964, 0.42837,
            0.43847, 0.45124, 0.44848, 0.17451, 0.08004,
        ],
        Trees: [
            0.01122, 0.01668, 0.03298, 0.02081, 0.05829, 0.1655, 0.19975,
            0.21482, 0.21806, 0.21181, 0.09833, 0.05031,
        ],
        'Turbid Water': [
            0.07213, 0.09002, 0.12151, 0.14041, 0.14911, 0.10413, 0.10868,
            0.09596, 0.08182, 0.0334, 0.01894, 0.01684,
        ],
        'Clear Water': [
            0.01823, 0.02118, 0.02177, 0.00924, 0.00842, 0.00337, 0.00364,
            0.00281, 0.00253, -0.00038, 0.00299, 0.003,
        ],
    };

// /**
//  * The typical spectral profiles data of Sentinel-2 imagery
//  * using the Spectral Sampling Tool
//  *
//  * @see https://github.com/Esri/Imagery-Apps/blob/master/Sentinel%20Explorer/configs/Identify/config_Identify.json
//  */
// export const Sentinel2SpectralProfileData: SpectralProfileDataByLandCoverType = {
//     Cloud: [],
//     'Clear Water': [],
//     'Turbid Water': [],
//     'Snow and Ice': [],
//     Sand: [],
//     'Bare Soil': [],
//     'Paved Surface': [],
//     Trees: [],
//     'Healthy Vegetation': [],
//     'Dry Vegetation': [],
// };
