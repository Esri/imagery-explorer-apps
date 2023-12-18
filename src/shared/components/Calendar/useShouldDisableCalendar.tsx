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
