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
    AUTO_SWIPE_SPEED_DEFAULTVALUE,
    MapState,
    initialMapState,
} from './reducer';
import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
} from '@shared/utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';

export const getPreloadedState4Map = (
    hashParams: URLSearchParams,
    randomInterestingPlace: InterestingPlaceData
): MapState => {
    let mapLocation = getMapCenterFromHashParams(hashParams);

    if (!mapLocation) {
        mapLocation = randomInterestingPlace?.location;
    }

    // show map labels if there is no `hideMapLabels` in hash params
    const showMapLabel =
        getHashParamValueByKey('hideMapLabels', hashParams) === null;

    // show terrain if there is no `hideTerrain` in hash params
    const showTerrain =
        getHashParamValueByKey('hideTerrain', hashParams) === null;

    const showBasemap =
        getHashParamValueByKey('hideBasemap', hashParams) === null;

    const autoSwipeSpeed = getHashParamValueByKey('autoSwipeSpeed', hashParams);

    const mapState: MapState = {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
        showMapLabel,
        showTerrain,
        showBasemap,
        autoSwipeSpeed: autoSwipeSpeed
            ? +autoSwipeSpeed
            : AUTO_SWIPE_SPEED_DEFAULTVALUE,
        autoSwipeStatus: autoSwipeSpeed ? 'playing' : null,
    };

    return mapState;
};
