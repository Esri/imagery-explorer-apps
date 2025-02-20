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

import { getMapCenterFromHashParams } from '@shared/utils/url-hash-params';

// import { initialUIState, UIState } from './UI/reducer';
import {
    initialImagerySceneState,
    ImageryScenesState,
    // QueryParams4ImageryScene,
} from '@shared/store/ImageryScene/reducer';
import { PartialRootState } from '@shared/store/configureStore';
import {
    SpectralSamplingToolState,
    initialSpectralSamplingToolState,
    SpectralSamplingToolSupportedService,
} from '@shared/store/SpectralSamplingTool/reducer';

const getPreloadedMapState = (hashParams: URLSearchParams): MapState => {
    const mapLocation = getMapCenterFromHashParams(hashParams);

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
    };
};

const getPreloadedImageryScenesState = (): ImageryScenesState => {
    return {
        ...initialImagerySceneState,
        mode: 'spectral sampling',
    };
};

const getProlodedSpectralSamplingState = (
    targetService: SpectralSamplingToolSupportedService
): SpectralSamplingToolState => {
    return {
        ...initialSpectralSamplingToolState,
        targetService,
    };
};

export const getPreloadedState = (
    targetService: SpectralSamplingToolSupportedService
): PartialRootState => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));
    return {
        ImageryScenes: getPreloadedImageryScenesState(),
        Map: getPreloadedMapState(hashParams),
        SpectralSamplingTool: getProlodedSpectralSamplingState(targetService),
    };
};
