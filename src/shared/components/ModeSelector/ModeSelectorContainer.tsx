import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectAppMode } from '@shared/store/Landsat/selectors';
import { modeChanged } from '@shared/store/Landsat/reducer';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { ModeSelector } from './ModeSelector';
import { updateHashParams } from '@shared/utils/url-hash-params';

export const ModeSelectorContainer = () => {
    const dispatch = useDispatch();

    const selectedMode = useSelector(selectAppMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    useEffect(() => {
        updateHashParams('mode', selectedMode);
    }, [selectedMode]);

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
