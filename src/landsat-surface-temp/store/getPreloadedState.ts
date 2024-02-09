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

import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';

import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getMaskToolDataFromHashParams,
    getQueryParams4MainSceneFromHashParams,
    getTemporalProfileToolDataFromHashParams,
} from '@shared/utils/url-hash-params';

// import { initialUIState, UIState } from './UI/reducer';
import {
    initialImagerySceneState,
    ImageryScenesState,
    DefaultQueryParams4ImageryScene,
    AppMode,
    // QueryParams4ImageryScene,
} from '@shared/store/ImageryScene/reducer';
import { PartialRootState } from '@shared/store/configureStore';
import {
    initialMaskToolState,
    MaskToolState,
} from '@shared/store/MaskTool/reducer';

import {
    initialTrendToolState,
    TrendToolState,
} from '@shared/store/TrendTool/reducer';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';

const getPreloadedMapState = (): MapState => {
    const mapLocation = getMapCenterFromHashParams();

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
    };
};

const getPreloadedImageryScenesState = (): ImageryScenesState => {
    const mode: AppMode =
        (getHashParamValueByKey('mode') as AppMode) || 'dynamic';

    const queryParams4MainScene = getQueryParams4MainSceneFromHashParams() || {
        ...DefaultQueryParams4ImageryScene,
    };

    const rasterFunction4MainScene: LandsatRasterFunctionName =
        'Surface Temperature Colorized (Fahrenheit)';

    const rasterFunction4SecondaryScene: LandsatRasterFunctionName =
        'Natural Color with DRA';

    return {
        ...initialImagerySceneState,
        mode,
        queryParams4MainScene: {
            ...queryParams4MainScene,
            rasterFunctionName: rasterFunction4MainScene,
        },
        queryParams4SecondaryScene: {
            ...queryParams4MainScene,
            rasterFunctionName: rasterFunction4SecondaryScene,
        },
    };
};

const getPreloadedMaskToolState = (): MaskToolState => {
    const maskToolData = getMaskToolDataFromHashParams();

    return {
        ...initialMaskToolState,
        ...maskToolData,
        spectralIndex: 'temperature farhenheit',
        shouldClipMaskLayer: true,
    } as MaskToolState;
};

const getPreloadedTrendToolState = (): TrendToolState => {
    const trendToolData = getTemporalProfileToolDataFromHashParams();

    return {
        ...initialTrendToolState,
        ...trendToolData,
        spectralIndex: 'temperature farhenheit',
    } as TrendToolState;
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        ImageryScenes: getPreloadedImageryScenesState(),
        MaskTool: getPreloadedMaskToolState(),
        TrendTool: getPreloadedTrendToolState(),
    };
};
