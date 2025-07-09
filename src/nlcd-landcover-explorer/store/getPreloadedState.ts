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

// import {
//     initialLandcoverExplorerAppState,
//     LandcoverExplorerAppState,
//     MapMode,
// } from '@shared/store/LandcoverExplorer/reducer';
// import { initialUIState, UIState } from '@shared/store/UI/reducer';
// import {
//     getActiveYearFromHashParams,
//     getDonwloadModeFromHashParams,
//     getMapCenterFromHashParams,
//     getMapModeFromHashParams,
//     getActiveLandCoverTypeFromHashParams,
//     getShowImageryLayerFromHashParams,
//     getTimeExtentFromHashParams,
//     getSentinel2RasterFunctionFromHashParams,
//     getActiveMonthFromHashParams,
//     getAnimationModeFromHashParams,
//     getRegionFromHashParams,
//     getShowSaveWebMapPanelFromHashParams,
// } from '@landcover-explorer/utils/URLHashParams';
import { INTERESTING_PLACES, DEFAULT_MAP_ZOOM } from '../constants/map';
// import { LandCoverClassification } from '@typing/landcover';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
// import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { isMobileDevice } from 'helper-toolkit-ts';
import { PartialRootState } from '@shared/store/configureStore';
import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';
import {
    getPreloadedStateForLandcoverExplorerApp,
    getPreloadedUIState4LandcoverExplorerApp,
} from '@landcover-explorer/store/getPreloadedState';
import { LandcoverExplorerAppState } from '@shared/store/LandcoverExplorer/reducer';
import { getMapCenterFromHashParams } from '@landcover-explorer/utils/URLHashParams';
import { UIState } from '@shared/store/UI/reducer';
import { LandCoverLayerTimeInfo } from '@shared/services/sentinel-2-10m-landcover/timeInfo';

const isMobileView = isMobileDevice();

const getPreloadedStateForNLCDLandcoverExplorerApp = (
    timeInfo: LandCoverLayerTimeInfo
): LandcoverExplorerAppState => {
    const state = getPreloadedStateForLandcoverExplorerApp(timeInfo);
    // console.log('getPreloadedStateForNLCDLandcoverExplorerApp: ', state);

    return {
        ...state,
    };
};

const getPreloadedUIStatForNLCDLandcoverExplorerApp = (): UIState => {
    // const showDownloadPanel = getDonwloadModeFromHashParams();
    // const isAnimationModeOn = getAnimationModeFromHashParams();

    // const showSaveWebMapPanel = getShowSaveWebMapPanelFromHashParams();

    // const animationStatus = isAnimationModeOn ? 'loading' : null;

    // return {
    //     ...initialUIState,
    //     showDownloadPanel,
    //     /**
    //      * set animation mode to loading so the animation panel can start loading frames data once Median Layer is ready.
    //      * animation mode can only be enabled in desktop view with wide screen
    //      */
    //     animationStatus: isMobileView ? null : animationStatus,
    //     showSaveWebMapPanel,
    // };
    const state = getPreloadedUIState4LandcoverExplorerApp();

    return {
        ...state,
    };
};

const getPreloadedMapState = (): MapState => {
    const { zoom, center } = getMapCenterFromHashParams() || {};

    const interestingPlace = getRandomElement(INTERESTING_PLACES);

    return {
        ...initialMapState,
        zoom: zoom || interestingPlace[2] || DEFAULT_MAP_ZOOM,
        center: center || [interestingPlace[0], interestingPlace[1]],
    };
};

export const getPreloadedState = (
    timeInfo: LandCoverLayerTimeInfo
): PartialRootState => {
    return {
        LandcoverExplorer:
            getPreloadedStateForNLCDLandcoverExplorerApp(timeInfo),
        UI: getPreloadedUIStatForNLCDLandcoverExplorerApp(),
        Map: getPreloadedMapState(),
    };
};
