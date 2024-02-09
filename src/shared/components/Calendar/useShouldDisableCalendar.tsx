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

import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';

/**
 * This custom hook returns a boolean value that indicates if the Calendar component should be disabled.
 * @returns
 */
export const useShouldDisableCalendar = () => {
    const mode = useSelector(selectAppMode);

    const analysisTool = useSelector(selectActiveAnalysisTool);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const isChangeCompareLayerOn = useSelector(selectChangeCompareLayerIsOn);

    const shouldBeDisabled = useMemo(() => {
        if (!queryParams || isAnimationPlaying) {
            return true;
        }

        // calendar should be disabled when user is viewing change compare layer
        if (mode === 'analysis' && analysisTool === 'change') {
            return isChangeCompareLayerOn;
        }

        return false;
    }, [
        queryParams,
        isAnimationPlaying,
        mode,
        analysisTool,
        isChangeCompareLayerOn,
    ]);

    return shouldBeDisabled;
};
