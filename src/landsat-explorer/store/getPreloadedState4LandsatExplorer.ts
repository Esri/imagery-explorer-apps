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

// import { PartialRootState } from './configureStore';

// import { initialMapState, MapState } from '@shared/store/Map/reducer';
import {
    // getAnimationSpeedFromHashParams,
    // getChangeCompareToolDataFromHashParams,
    // getHashParamValueByKey,
    getMapCenterFromHashParams,
    // getMaskToolDataFromHashParams,
    // getQueryParams4MainSceneFromHashParams,
    // getListOfQueryParamsFromHashParams,
    // getQueryParams4SecondarySceneFromHashParams,
    // getSpectralProfileToolDataFromHashParams,
    // getTemporalProfileToolDataFromHashParams,
} from '@shared/utils/url-hash-params';
// // import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';
// // import { initialUIState, UIState } from './UI/reducer';
// import {
//     AnalysisTool,
//     AppMode,
//     DefaultQueryParams4ImageryScene,
//     initialImagerySceneState,
//     ImageryScenesState,
//     QueryParams4ImageryScene,
//     // QueryParams4ImageryScene,
// } from '@shared/store/ImageryScene/reducer';
// import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
// import { initialUIState, UIState } from '@shared/store/UI/reducer';
// import {
//     MaskToolState,
//     initialMaskToolState,
// } from '@shared/store/MaskTool/reducer';
// import {
//     TrendToolState,
//     initialTrendToolState,
// } from '@shared/store/TrendTool/reducer';
// import {
//     initialSpectralProfileToolState,
//     SpectralProfileToolState,
// } from '@shared/store/SpectralProfileTool/reducer';
// import {
//     ChangeCompareToolState,
//     initialChangeCompareToolState,
// } from '@shared/store/ChangeCompareTool/reducer';
import { initialLandsatState } from '@shared/store/Landsat/reducer';
import { PartialRootState } from '@shared/store/configureStore';
// import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';
import { landsatInterestingPlaces } from '@landsat-explorer/components/InterestingPlaces';
// import { getOpenSavePanelFromSessionStorage } from '@shared/utils/session-storage/sessionStorage';
import { getPreloadedState4PublishAndDownloadJobs } from '@shared/store/PublishAndDownloadJobs/getPreloadedState';
// import { InterestingPlaceData } from '@typing/shared';
import { getPreloadedState4ChangeCompareTool } from '@shared/store/ChangeCompareTool/getPreloadedState';
import { getPreloadedState4SpectralProfileTool } from '@shared/store/SpectralProfileTool/getPreloadedState';
import { getPreloadedState4MaskTool } from '@shared/store/MaskTool/getPrelaodedState';
import { getPreloadedTrendToolState } from '@shared/store/TrendTool/getPreloadedState';
import { getPreloadedState4UI } from '@shared/store/UI/getPreloadedState';
import { getPreloadedState4Map } from '@shared/store/Map/getPreloadedState';
// import { Sentinel2FunctionName } from '@shared/services/sentinel-2/config';
import { getPreloadedState4ImageryScenes } from '@shared/store/ImageryScene/getPreloadedState';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';

export const getPreloadedState = async (): Promise<PartialRootState> => {
    const PublishAndDownloadJobs =
        await getPreloadedState4PublishAndDownloadJobs();

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
        ? getRandomElement(landsatInterestingPlaces)
        : null;

    const defaultRasterFunction: LandsatRasterFunctionName =
        'Natural Color with DRA';

    return {
        Map: getPreloadedState4Map(hashParams, randomInterestingPlace),
        UI: getPreloadedState4UI(hashParams, randomInterestingPlace),
        Landsat: {
            ...initialLandsatState,
        },
        ImageryScenes: getPreloadedState4ImageryScenes(
            hashParams,
            randomInterestingPlace,
            defaultRasterFunction
        ),
        TrendTool: getPreloadedTrendToolState(hashParams),
        MaskTool: getPreloadedState4MaskTool(hashParams),
        SpectralProfileTool: getPreloadedState4SpectralProfileTool(hashParams),
        ChangeCompareTool: getPreloadedState4ChangeCompareTool(hashParams),
        PublishAndDownloadJobs,
    };
};
