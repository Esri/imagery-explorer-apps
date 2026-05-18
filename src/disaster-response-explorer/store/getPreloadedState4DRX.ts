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

// import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { getMapCenterFromHashParams } from '@shared/utils/url-hash-params';

import { PartialRootState } from '@shared/store/configureStore';
import { getPreloadedState4UI } from '@shared/store/UI/getPreloadedState';
import { getPreloadedState4Map } from '@shared/store/Map/getPreloadedState';

export const getPreloadedState4DRX = (): PartialRootState => {
    const hashParams = new URLSearchParams(window.location.hash.slice(1));

    /**
     * Map location info that contains center and zoom info from URL Hash Params
     */
    const mapLocationFromHashParams = getMapCenterFromHashParams(hashParams);

    return {
        Map: getPreloadedState4Map(hashParams, undefined),
        UI: getPreloadedState4UI(hashParams, undefined),
        // ImageryScenes: getPreloadedState4ImageryScenes(
        //     hashParams,
        //     randomInterestingPlace,
        //     defaultRasterFunction
        // ),
        // ImageryService: getPreloadedState4ImageryService(
        //     timeExtent,
        //     rasterFunctionInfo
        // ),
    };
};
