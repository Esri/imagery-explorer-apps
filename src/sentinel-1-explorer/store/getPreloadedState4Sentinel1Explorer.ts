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

// import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '@shared/store/Map/reducer';
import {
    getAnimationSpeedFromHashParams,
    getChangeCompareToolDataFromHashParams,
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getMaskToolDataFromHashParams,
    getQueryParams4MainSceneFromHashParams,
    getListOfQueryParamsFromHashParams,
    getQueryParams4SecondarySceneFromHashParams,
    getSpectralProfileToolDataFromHashParams,
    getTemporalProfileToolDataFromHashParams,
    getTemporalCompositeToolDataFromHashParams,
} from '@shared/utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';
// import { initialUIState, UIState } from './UI/reducer';
import {
    AnalysisTool,
    AppMode,
    DefaultQueryParams4ImageryScene,
    initialImagerySceneState,
    ImageryScenesState,
    QueryParams4ImageryScene,
    // QueryParams4ImageryScene,
} from '@shared/store/ImageryScene/reducer';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { initialUIState, UIState } from '@shared/store/UI/reducer';
import { PartialRootState } from '@shared/store/configureStore';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import {
    TemporalCompositeToolState,
    initialState4TemporalCompositeTool,
} from '@shared/store/TemporalCompositeTool/reducer';
import {
    ChangeCompareToolState,
    initialChangeCompareToolState,
} from '@shared/store/ChangeCompareTool/reducer';
import {
    ChangeCompareToolOption4Sentinel1,
    ChangeCompareToolPixelValueRange4Sentinel1,
} from '../components/ChangeCompareTool/ChangeCompareToolContainer';
import {
    TrendToolState,
    initialTrendToolState,
} from '@shared/store/TrendTool/reducer';
import { RadarIndex } from '@typing/imagery-service';
import {
    MaskToolState,
    initialMaskToolState,
    MaskToolPixelValueRangeBySpectralIndex,
    DefaultPixelValueRangeBySelectedIndex,
} from '@shared/store/MaskTool/reducer';
import {
    initialSentinel1State,
    Sentinel1State,
} from '@shared/store/Sentinel1/reducer';
import { getSentinel1StateFromHashParams } from '@shared/utils/url-hash-params/sentinel1';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';
import { sentinel1InterestingPlaces } from '../components/InterestingPlaces/';
import { InterestingPlaceData } from '@typing/shared';
import { getPreloadedState4Map } from '@shared/store/Map/getPreloadedState';
import { getPreloadedState4UI } from '@shared/store/UI/getPreloadedState';
import { getPreloadedState4ImageryScenes } from '@shared/store/ImageryScene/getPreloadedState';
import { getPreloadedState4PublishAndDownloadJobs } from '@shared/store/PublishAndDownloadJobs/getPreloadedState';

// /**
//  * Map location info that contains center and zoom info from URL Hash Params
//  */
// const mapLocationFromHashParams = getMapCenterFromHashParams();

// /**
//  * Use the location of a randomly selected interesting place if there is no map location info
//  * found in the URL hash params.
//  */
// const randomInterestingPlace = !mapLocationFromHashParams
//     ? getRandomElement(sentinel1InterestingPlaces)
//     : null;

// const getPreloadedMapState = (
//     hashParams: URLSearchParams,
//     randomInterestingPlace: InterestingPlaceData
// ): MapState => {
//     let mapLocation = getMapCenterFromHashParams(hashParams);

//     if (!mapLocation) {
//         mapLocation = randomInterestingPlace?.location;
//     }

//     // show map labels if there is no `hideMapLabels` in hash params
//     const showMapLabel =
//         getHashParamValueByKey('hideMapLabels', hashParams) === null;

//     // show terrain if there is no `hideTerrain` in hash params
//     const showTerrain =
//         getHashParamValueByKey('hideTerrain', hashParams) === null;

//     const showBasemap =
//         getHashParamValueByKey('hideBasemap', hashParams) === null;

//     return {
//         ...initialMapState,
//         center: mapLocation?.center || MAP_CENTER,
//         zoom: mapLocation?.zoom || MAP_ZOOM,
//         showMapLabel,
//         showTerrain,
//         showBasemap,
//     };
// };

// const getPreloadedImageryScenesState = (
//     hashParams: URLSearchParams,
//     randomInterestingPlace: InterestingPlaceData
// ): ImageryScenesState => {
//     let mode: AppMode =
//         (getHashParamValueByKey('mode', hashParams) as AppMode) || 'dynamic';

//     // user is only allowed to use the "dynamic" mode when using mobile device
//     if (IS_MOBILE_DEVICE) {
//         mode = 'dynamic';
//     }

//     const defaultRasterFunction: Sentinel1FunctionName =
//         'False Color dB with DRA';

//     // Attempt to extract query parameters from the URL hash.
//     // If not found, fallback to using the default values along with the raster function from a randomly selected interesting location,
//     // which will serve as the map center.
//     const queryParams4MainScene = getQueryParams4MainSceneFromHashParams(
//         hashParams
//     ) || {
//         ...DefaultQueryParams4ImageryScene,
//         rasterFunctionName:
//             randomInterestingPlace?.renderer || defaultRasterFunction,
//     };

//     const queryParams4SecondaryScene =
//         getQueryParams4SecondarySceneFromHashParams(hashParams) || {
//             ...DefaultQueryParams4ImageryScene,
//             rasterFunctionName: null,
//         };

//     const listOfQueryParams =
//         getListOfQueryParamsFromHashParams(hashParams) || [];

//     const queryParamsById: {
//         [key: string]: QueryParams4ImageryScene;
//     } = {};

//     const tool = getHashParamValueByKey('tool', hashParams) as AnalysisTool;

//     for (const queryParams of listOfQueryParams) {
//         queryParamsById[queryParams.uniqueId] = queryParams;
//     }

//     return {
//         ...initialImagerySceneState,
//         mode,
//         tool: tool || 'mask',
//         queryParams4MainScene,
//         queryParams4SecondaryScene,
//         queryParamsList: {
//             byId: queryParamsById,
//             ids: listOfQueryParams.map((d) => d.uniqueId),
//             selectedItemID: listOfQueryParams[0]
//                 ? listOfQueryParams[0].uniqueId
//                 : null,
//         },
//         // idOfSelectedItemInListOfQueryParams: queryParams4ScenesInAnimation[0]
//         //     ? queryParams4ScenesInAnimation[0].uniqueId
//         //     : null,
//     };
// };

// const getPreloadedUIState = (
//     hashParams: URLSearchParams,
//     randomInterestingPlace: InterestingPlaceData
// ): UIState => {
//     const animationSpeed = getAnimationSpeedFromHashParams(hashParams);

//     const proloadedUIState: UIState = {
//         ...initialUIState,
//         nameOfSelectedInterestingPlace: randomInterestingPlace?.name || '',
//     };

//     if (animationSpeed) {
//         proloadedUIState.animationSpeed = animationSpeed;
//         proloadedUIState.animationStatus = 'loading';
//     }

//     return proloadedUIState;
// };

const getPreloadedTemporalCompositeToolState = (
    hashParams: URLSearchParams
): TemporalCompositeToolState => {
    const data = getTemporalCompositeToolDataFromHashParams(hashParams);

    const defaultRasterFunction: Sentinel1FunctionName = 'VV dB Colorized';

    const proloadedState: TemporalCompositeToolState = {
        ...initialState4TemporalCompositeTool,
        ...data,
        rasterFunction: data?.rasterFunction || defaultRasterFunction,
    };

    return proloadedState;
};

const getPreloadedChangeCompareToolState = (
    hashParams: URLSearchParams
): ChangeCompareToolState => {
    const changeCompareToolData =
        getChangeCompareToolDataFromHashParams(hashParams);

    const selectedOption: ChangeCompareToolOption4Sentinel1 =
        changeCompareToolData?.selectedOption
            ? (changeCompareToolData?.selectedOption as ChangeCompareToolOption4Sentinel1)
            : 'log difference';

    const fullPixelValuesRange =
        ChangeCompareToolPixelValueRange4Sentinel1[selectedOption];

    const initalState: ChangeCompareToolState = {
        ...initialChangeCompareToolState,
    };

    return {
        ...initalState,
        ...changeCompareToolData,
        selectedOption,
        fullPixelValuesRange,
        selectedRange:
            changeCompareToolData?.selectedRange || fullPixelValuesRange,
    };
};

const getPreloadedTrendToolState = (
    hashParams: URLSearchParams
): TrendToolState => {
    // const maskToolData = getMaskToolDataFromHashParams();
    const trendToolData = getTemporalProfileToolDataFromHashParams(hashParams);

    return {
        ...initialTrendToolState,
        ...trendToolData,
        selectedIndex: trendToolData?.selectedIndex || ('water' as RadarIndex),
    };
};

const getPreloadedMaskToolState = (
    hashParams: URLSearchParams
): MaskToolState => {
    const pixelValueRangeDataForSentinel1Explorer: MaskToolPixelValueRangeBySpectralIndex =
        {
            ...DefaultPixelValueRangeBySelectedIndex,
            water: {
                selectedRange: [0.25, 1],
            },
            'water anomaly': {
                selectedRange: [-1, 0],
            },
            ship: {
                selectedRange: [0.3, 1],
            },
            urban: {
                selectedRange: [0.15, 1],
            },
        };

    const maskToolData = getMaskToolDataFromHashParams(
        hashParams,
        pixelValueRangeDataForSentinel1Explorer
    );

    if (!maskToolData) {
        return {
            ...initialMaskToolState,
            pixelValueRangeBySelectedIndex:
                pixelValueRangeDataForSentinel1Explorer,
        };
    }

    return {
        ...initialMaskToolState,
        ...maskToolData,
    };
};

const getPreloadedSentinel1State = (
    hashParams: URLSearchParams
): Sentinel1State => {
    // const maskToolData = getMaskToolDataFromHashParams();
    const sentinel1State = getSentinel1StateFromHashParams(hashParams);

    return {
        ...initialSentinel1State,
        orbitDirection: sentinel1State?.orbitDirection || 'Ascending',
        polarizationFilter: sentinel1State?.polarizationFilter || 'VV',
    } as Sentinel1State;
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    // get default raster function and location and pass to the getPreloadedMapState, getPreloadedUIState and getPreloadedImageryScenesState

    const hashParams = new URLSearchParams(window.location.hash.slice(1));

    /**
     * Map location info that contains center and zoom info from URL Hash Params
     */
    const mapLocationFromHashParams = getMapCenterFromHashParams(hashParams);

    /**
     * Use the location of a randomly selected interesting place if there is no map location info
     * found in the URL hash params.
     */
    const randomInterestingPlace = !mapLocationFromHashParams
        ? getRandomElement(sentinel1InterestingPlaces)
        : null;

    const PublishAndDownloadJobs =
        await getPreloadedState4PublishAndDownloadJobs();

    return {
        Map: getPreloadedState4Map(hashParams, randomInterestingPlace),
        UI: getPreloadedState4UI(hashParams, randomInterestingPlace),
        ImageryScenes: getPreloadedState4ImageryScenes(
            hashParams,
            randomInterestingPlace,
            'False Color dB with DRA'
        ),
        TemporalCompositeTool:
            getPreloadedTemporalCompositeToolState(hashParams),
        ChangeCompareTool: getPreloadedChangeCompareToolState(hashParams),
        TrendTool: getPreloadedTrendToolState(hashParams),
        MaskTool: getPreloadedMaskToolState(hashParams),
        Sentinel1: getPreloadedSentinel1State(hashParams),
        PublishAndDownloadJobs,
    } as PartialRootState;
};
