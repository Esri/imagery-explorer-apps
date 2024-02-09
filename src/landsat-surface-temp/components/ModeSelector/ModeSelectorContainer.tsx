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

import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { ModeSelector } from './ModeSelector';
import { batch } from 'react-redux';
import {
    selectAppMode,
    selectActiveAnalysisTool,
} from '@shared/store/ImageryScene/selectors';
import {
    activeAnalysisToolChanged,
    modeChanged,
} from '@shared/store/ImageryScene/reducer';

export const ModeSelectorContainer = () => {
    const dispatch = useDispatch();

    const selectedMode = useSelector(selectAppMode);

    const activeAnalysisTool = useSelector(selectActiveAnalysisTool);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    return (
        <ModeSelector
            selectedMode={selectedMode}
            selectedAnalysisTool={activeAnalysisTool}
            disabled={isAnimationPlaying}
            selectedModeOnChange={(value) => {
                dispatch(modeChanged(value));
            }}
            highlightButtonOnClick={() => {
                batch(() => {
                    dispatch(activeAnalysisToolChanged('mask'));
                    dispatch(modeChanged('analysis'));
                });
            }}
            profileButtonOnClick={() => {
                batch(() => {
                    dispatch(activeAnalysisToolChanged('trend'));
                    dispatch(modeChanged('analysis'));
                });
            }}
        />
    );
};
