import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import { modeChanged } from '@shared/store/Landsat/reducer';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { ModeSelector } from './ModeSelector';

export const ModeSelectorContainer = () => {
    const dispatch = useDispatch();

    const selectedMode = useSelector(selectAppMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    return (
        <ModeSelector
            selectedMode={selectedMode}
            disabled={isAnimationPlaying}
            selectedModeOnChange={(value) => {
                dispatch(modeChanged(value));
            }}
        />
    );
};
