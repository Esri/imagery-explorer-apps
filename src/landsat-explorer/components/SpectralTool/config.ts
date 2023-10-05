import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';

/**
 * The typical spectral profiles data from the config file used by the legacy Landsat Explorer app
 *
 * @see https://github.com/Esri/Imagery-Apps/blob/master/Landsat%20Explorer/configs/Identify/config_Identify.json
 */
export const SpectralProfileDataByFeatureOfInterest: Record<
    SpectralProfileFeatureOfInterest,
    number[]
> = {
    Cloud: [0.88802, 0.90596, 0.88938, 0.91148, 0.93778, 0.5457, 0.37914],
    'Snow/Ice': [1.0, 1.0, 1.0, 1.0, 0.99766, 0.09434, 0.09942],
    Desert: [0.17706, 0.18228, 0.2431, 0.37778, 0.48144, 0.58394, 0.53018],
    'Dry Vegetation': [
        0.13158, 0.12318, 0.14104, 0.2288, 0.3176, 0.38448, 0.32216,
    ],
    Concrete: [0.21304, 0.20938, 0.21138, 0.22594, 0.24366, 0.24868, 0.22404],
    'Lush Vegetation': [
        0.124, 0.1081, 0.10306, 0.10386, 0.3045, 0.24492, 0.15402,
    ],
    Urban: [0.14642, 0.12864, 0.11496, 0.10828, 0.21502, 0.17398, 0.12308],
    Water: [0.1225, 0.0997, 0.0663, 0.0375, 0.07786, 0.01908, 0.00878],
    Rock: [0.13328, 0.11964, 0.11348, 0.12786, 0.15856, 0.20198, 0.16054],
    Forest: [0.09838, 0.0769, 0.06862, 0.03962, 0.31248, 0.12792, 0.0514],
};

export const FillColorByFeatureOfInterest: Record<
    SpectralProfileFeatureOfInterest,
    string
> = {
    Cloud: 'rgb(30, 36, 87)',
    'Snow/Ice': 'rgb(165, 242, 243)',
    Desert: 'rgb(236, 197, 168)',
    'Dry Vegetation': 'rgb(218, 165, 32)',
    Concrete: 'rgb(128, 128, 128)',
    'Lush Vegetation': 'rgb(124, 252, 0)',
    Urban: 'rgb(0, 128, 128)',
    Rock: 'rgb(90, 77, 65)',
    Forest: 'rgb(34, 139, 34)',
    Water: 'rgb(64, 164, 223)',
};
