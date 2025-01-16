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

import { SpectralProfileDataByLandCoverType } from '@shared/components/SpectralProfileTool';

/**
 * The typical spectral profiles data from the config file used by the legacy Sentinel-2 Explorer app,
 * and the data prepared using `/scripts/landsat-spectral-signatures`.
 *
 * @see https://github.com/Esri/Imagery-Apps/blob/master/Sentinel%20Explorer/configs/Identify/config_Identify.json
 */
export const Sentinel2SpectralProfileData: SpectralProfileDataByLandCoverType =
    {
        Cloud: [
            0.7598, 0.8401, 0.8105, 0.8851, 0.8812, 0.8878, 0.8947, 0.9541,
            0.883, 0.5035, 0.4387, 0.2543,
        ],
        'Snow and Ice': [
            1.0, 1.0, 1.0, 1.0, 1.0, 1.0, 0.997, 0.9507, 0.9352, 0.6584, 0.0355,
            0.0351,
        ],
        Sand: [
            0.2121, 0.2203, 0.2703, 0.3643, 0.3759, 0.3932, 0.426, 0.4066,
            0.4432, 0.141, 0.5477, 0.4689,
        ],
        'Dry Vegetation': [
            0.1347, 0.119, 0.1189, 0.1552, 0.1659, 0.1802, 0.205, 0.2094,
            0.2354, 0.0549, 0.3401, 0.2355,
        ],
        'Paved Surface': [
            0.2416, 0.2381, 0.242, 0.2711, 0.2814, 0.2928, 0.3016, 0.2696,
            0.3068, 0.1042, 0.3076, 0.2281,
        ],
        'Healthy Vegetation': [
            0.1307, 0.0981, 0.0875, 0.0506, 0.0901, 0.2563, 0.3342, 0.3195,
            0.3801, 0.035, 0.1821, 0.0631,
        ],
        'Bare Soil': [
            0.1524, 0.1449, 0.1483, 0.1521, 0.1522, 0.1566, 0.1601, 0.1458,
            0.1577, 0.056, 0.1291, 0.1062,
        ],
        Trees: [
            0.115, 0.0852, 0.064, 0.0406, 0.0763, 0.2183, 0.273, 0.2763, 0.3115,
            0.0974, 0.082, 0.0315,
        ],
        'Turbid Water': [
            0.1231, 0.0959, 0.0776, 0.0612, 0.0509, 0.0301, 0.0285, 0.0223,
            0.019, 0.0059, 0.0044, 0.0037,
        ],
        'Clear Water': [
            0.1231, 0.0959, 0.0776, 0.0612, 0.0509, 0.0301, 0.0285, 0.0223,
            0.019, 0.0059, 0.0044, 0.0037,
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
