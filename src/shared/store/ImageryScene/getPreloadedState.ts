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

import { InterestingPlaceData } from '@typing/shared';
import {
    AnalysisTool,
    AppMode,
    DefaultQueryParams4ImageryScene,
    initialImagerySceneState,
    ImageryScenesState,
    QueryParams4ImageryScene,
    // QueryParams4ImageryScene,
} from './reducer';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import {
    getHashParamValueByKey,
    getQueryParams4MainSceneFromHashParams,
    getListOfQueryParamsFromHashParams,
    getQueryParams4SecondarySceneFromHashParams,
} from '@shared/utils/url-hash-params';
import { Sentinel2FunctionName } from '@shared/services/sentinel-2/config';
import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';

export const getPreloadedState4ImageryScenes = (
    hashParams: URLSearchParams,
    randomInterestingPlace: InterestingPlaceData,
    defaultRasterFunction:
        | LandsatRasterFunctionName
        | Sentinel2FunctionName
        | Sentinel1FunctionName
): ImageryScenesState => {
    let mode: AppMode =
        (getHashParamValueByKey('mode', hashParams) as AppMode) || 'dynamic';

    // user is only allowed to use the "dynamic" mode when using mobile device
    if (IS_MOBILE_DEVICE) {
        mode = 'dynamic';
    }

    // const defaultRasterFunction: LandsatRasterFunctionName =
    //     'Natural Color with DRA';

    // Attempt to extract query parameters from the URL hash.
    // If not found, fallback to using the default values along with the raster function from a randomly selected interesting location,
    // which will serve as the map center.
    const queryParams4MainScene = getQueryParams4MainSceneFromHashParams(
        hashParams
    ) || {
        ...DefaultQueryParams4ImageryScene,
        rasterFunctionName:
            randomInterestingPlace?.renderer || defaultRasterFunction,
    };

    const queryParams4SecondaryScene =
        getQueryParams4SecondarySceneFromHashParams(hashParams) || {
            ...DefaultQueryParams4ImageryScene,
            rasterFunctionName: defaultRasterFunction,
        };

    const listOfQueryParams =
        getListOfQueryParamsFromHashParams(hashParams) || [];

    const queryParamsById: {
        [key: string]: QueryParams4ImageryScene;
    } = {};

    const tool = getHashParamValueByKey('tool', hashParams) as AnalysisTool;

    for (const queryParams of listOfQueryParams) {
        queryParamsById[queryParams.uniqueId] = queryParams;
    }

    return {
        ...initialImagerySceneState,
        mode,
        tool: tool || 'mask',
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParamsList: {
            byId: queryParamsById,
            ids: listOfQueryParams.map((d) => d.uniqueId),
            selectedItemID: listOfQueryParams[0]
                ? listOfQueryParams[0].uniqueId
                : null,
        },
        // idOfSelectedItemInListOfQueryParams: queryParams4ScenesInAnimation[0]
        //     ? queryParams4ScenesInAnimation[0].uniqueId
        //     : null,
    };
};
