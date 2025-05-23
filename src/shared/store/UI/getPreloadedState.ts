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
import { UIState, initialUIState } from './reducer';
import { getAnimationSpeedFromHashParams } from '@shared/utils/url-hash-params';
import { getOpenSavePanelFromSessionStorage } from '@shared/utils/session-storage/sessionStorage';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';

export const getPreloadedState4UI = (
    hashParams: URLSearchParams,
    randomInterestingPlace: InterestingPlaceData
): UIState => {
    const animationSpeed = getAnimationSpeedFromHashParams(hashParams);

    const showSavePanel = getOpenSavePanelFromSessionStorage();

    const proloadedUIState: UIState = {
        ...initialUIState,
        keyOfSelectedInterestingPlace: randomInterestingPlace?.key || '',
        showSavePanel,
    };

    if (animationSpeed && IS_MOBILE_DEVICE === false) {
        proloadedUIState.animationSpeed = animationSpeed;
        proloadedUIState.animationStatus = 'loading';
    }

    return proloadedUIState;
};
