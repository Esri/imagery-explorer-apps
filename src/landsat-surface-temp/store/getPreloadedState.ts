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

const getPreloadedMapState = (hashParams: URLSearchParams): MapState => {
    const mapLocation = getMapCenterFromHashParams(hashParams);

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
    };
};

const getPreloadedImageryScenesState = (
    hashParams: URLSearchParams
): ImageryScenesState => {
    const mode: AppMode =
        (getHashParamValueByKey('mode', hashParams) as AppMode) || 'dynamic';

    const queryParams4MainScene = getQueryParams4MainSceneFromHashParams(
        hashParams
    ) || {
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

const getPreloadedMaskToolState = (
    hashParams: URLSearchParams
): MaskToolState => {
    const maskToolData = getMaskToolDataFromHashParams(hashParams);

    return {
        ...initialMaskToolState,
        ...maskToolData,
        spectralIndex: 'temperature farhenheit',
        shouldClipMaskLayer: true,
    } as MaskToolState;
};

const getPreloadedTrendToolState = (
    hashParams: URLSearchParams
): TrendToolState => {
    const trendToolData = getTemporalProfileToolDataFromHashParams(hashParams);

    return {
        ...initialTrendToolState,
        ...trendToolData,
        spectralIndex: 'temperature farhenheit',
    } as TrendToolState;
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));

    return {
        Map: getPreloadedMapState(hashParams),
        ImageryScenes: getPreloadedImageryScenesState(hashParams),
        MaskTool: getPreloadedMaskToolState(hashParams),
        TrendTool: getPreloadedTrendToolState(hashParams),
    };
};
