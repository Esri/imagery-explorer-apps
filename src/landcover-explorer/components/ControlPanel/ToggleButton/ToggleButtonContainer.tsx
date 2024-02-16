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

import React from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { hideControlPanelToggled } from '@landcover-explorer/store/UI/reducer';
import {
    selectAnimationMode,
    selectShouldHideControlPanel,
} from '@landcover-explorer/store/UI/selectors';
import ToggleButton from './ToggleButton';

const ToggleButtonContainer = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationMode);

    const hideControlPanel = useSelector(selectShouldHideControlPanel);

    if (animationMode) {
        return null;
    }

    return (
        <ToggleButton
            hideControlPanel={hideControlPanel}
            onClickHandler={() => {
                dispatch(hideControlPanelToggled());
            }}
        />
    );
};

export default ToggleButtonContainer;
