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
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';
import { selectIsTemporalCompositeLayerOn } from '@shared/store/TemporalCompositeTool/selectors';

/**
 * This custom hook returns a boolean value that indicates if the Calendar component should be disabled.
 * @returns
 */
export const useShouldDisableCalendar = () => {
    const mode = useAppSelector(selectAppMode);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const isChangeCompareLayerOn = useAppSelector(selectChangeCompareLayerIsOn);

    const isTemporalCompositeLayerOn = useAppSelector(
        selectIsTemporalCompositeLayerOn
    );

    const shouldBeDisabled = useMemo(() => {
        if (!queryParams || isAnimationPlaying) {
            return true;
        }

        // calendar should be disabled when user is viewing change compare layer
        if (mode === 'analysis' && analysisTool === 'change') {
            return isChangeCompareLayerOn;
        }

        // calendar should be disabled when user is viewing the combined result of temporal composite layer
        if (mode === 'analysis' && analysisTool === 'temporal composite') {
            return isTemporalCompositeLayerOn;
        }

        return false;
    }, [
        queryParams,
        isAnimationPlaying,
        mode,
        analysisTool,
        isChangeCompareLayerOn,
        isTemporalCompositeLayerOn,
    ]);

    return shouldBeDisabled;
};
