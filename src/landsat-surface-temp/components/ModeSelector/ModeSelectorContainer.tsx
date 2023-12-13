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
