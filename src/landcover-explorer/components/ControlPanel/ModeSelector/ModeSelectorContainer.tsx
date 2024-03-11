import { ContainerOfSecondaryControls } from '@shared/components/ModeSelector';
import React from 'react';
import { ModeSelector } from './ModeSelector';

export const ModeSelectorContainer = () => {
    return (
        <ContainerOfSecondaryControls>
            <ModeSelector />
        </ContainerOfSecondaryControls>
    );
};
