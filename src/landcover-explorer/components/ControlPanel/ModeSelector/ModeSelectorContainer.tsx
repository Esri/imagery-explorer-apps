import { ContainerOfSecondaryControls } from '@shared/components/ModeSelector';
import React from 'react';
import { ModeSelector } from './ModeSelector';
import { useSelector } from 'react-redux';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

export const ModeSelectorContainer = () => {
    const animationMode = useSelector(selectAnimationStatus);

    return (
        <ContainerOfSecondaryControls>
            <ModeSelector disabled={animationMode !== null} />
        </ContainerOfSecondaryControls>
    );
};
