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
            1.0326466666666667, 1.05048, 1.01048, 1.0123199999999999,
            1.0432266666666665, 1.0126033333333333, 1.0055933333333333,
            1.0434666666666665, 0.9890433333333334, 1.1314000000000002,
            0.5758333333333335, 0.4713066666666667,
        ],
        'Snow and Ice': [
            0.990174193548387, 1.0177806451612903, 1.014941935483871,
            1.004851612903226, 1.0155193548387094, 0.9925354838709679,
            0.9574741935483869, 0.9399741935483871, 0.915667741935484,
            0.9023290322580645, 0.10335483870967742, 0.10909354838709678,
        ],
        Sand: [
            0.17045000000000002, 0.24276875000000003, 0.30991874999999997,
            0.36518750000000005, 0.389175, 0.38835625000000007, 0.3971625,
            0.41086874999999995, 0.40149375, 0.37242812499999994,
            0.43412187499999993, 0.3833625,
        ],
        'Dry Vegetation': [
            0.047316666666666674, 0.06092666666666667, 0.08916333333333329,
            0.10076, 0.14654666666666663, 0.23522666666666667,
            0.2674266666666666, 0.2826133333333332, 0.29320666666666667,
            0.29663333333333325, 0.2924066666666666, 0.19994333333333333,
        ],
        'Paved Surface': [
            0.09878620689655168, 0.1281758620689655, 0.14522758620689655,
            0.1594310344827586, 0.16697931034482766, 0.16897931034482758,
            0.1743586206896552, 0.17054482758620693, 0.17446896551724136,
            0.19251034482758617, 0.19171379310344822, 0.17855172413793105,
        ],
        'Healthy Vegetation': [
            0.027996666666666673, 0.03262, 0.06813666666666666,
            0.03135999999999999, 0.11011000000000001, 0.44462333333333337,
            0.5662766666666668, 0.58172, 0.5888866666666669, 0.57869,
            0.2129766666666667, 0.09391333333333332,
        ],
        'Bare Soil': [
            0.09376774193548384, 0.1297516129032258, 0.17973870967741937,
            0.24226451612903224, 0.2627000000000001, 0.275874193548387,
            0.28615806451612913, 0.29747741935483873, 0.29648709677419355,
            0.2921516129032258, 0.3693838709677419, 0.34313548387096776,
        ],
        Trees: [
            0.021000000000000005, 0.02244666666666666, 0.04843666666666667,
            0.026420000000000006, 0.08355333333333334, 0.24269333333333334,
            0.2954633333333334, 0.3040433333333334, 0.31973,
            0.31135999999999986, 0.15450000000000003, 0.07322666666666665,
        ],
        'Turbid Water': [
            0.07213333333333334, 0.09001666666666665, 0.12150666666666665,
            0.14041333333333336, 0.14910666666666667, 0.10413000000000001,
            0.10867666666666667, 0.09595666666666668, 0.08182000000000002,
            0.033396666666666665, 0.018940000000000005, 0.01683666666666667,
        ],
        'Clear Water': [
            0.018230000000000003, 0.02118333333333333, 0.021769999999999998,
            0.00924, 0.008416666666666664, 0.00337, 0.0036399999999999996,
            0.0028133333333333326, 0.00253, -0.00038, 0.0029899999999999996,
            0.002996666666666667,
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
