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

import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { useAppDispatch } from '@shared/store/configureStore';
import { selectAppMode } from '@shared/store/ImageryScene/selectors';
import { modeChanged } from '@shared/store/ImageryScene/reducer';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { ModeSelector } from './ModeSelector';

type Props = {
    /**
     * If true, the sub modes under "Explore" mode (i.e. "Swipe" and "Opacity") will be hidden in the mode selector, as they are not applicable for app like Disaster Response Explorer, which only has one explore mode.
     */
    hideExploreSubModes?: boolean;
};

export const ModeSelectorContainer: FC<Props> = ({
    hideExploreSubModes = false,
}) => {
    const dispatch = useAppDispatch();

    const selectedMode = useAppSelector(selectAppMode);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    return (
        <ModeSelector
            selectedMode={selectedMode}
            disabled={isAnimationPlaying}
            hideExploreSubModes={hideExploreSubModes}
            selectedModeOnChange={(value) => {
                dispatch(modeChanged(value));
            }}
        />
    );
};
