import { AnimationStartButtonOnMap } from '@shared/components/AnimationStartButtonOnMap/AnimationStartButtonOnMap';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectMapMode,
    selectShowAnimationControls4Landcover,
} from '@shared/store/LandcoverExplorer/selectors';
import { animationStatusChanged } from '@shared/store/UI/reducer';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React from 'react';

export const AnimationStartButtonOnMap4LandcoverExplorer = () => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectMapMode);

    const shouldShowAnimationControls = useAppSelector(
        selectShowAnimationControls4Landcover
    );

    const animationStatus = useAppSelector(selectAnimationStatus);

    if (mode !== 'step' || !shouldShowAnimationControls || animationStatus) {
        return null;
    }

    return (
        <AnimationStartButtonOnMap
            startAnimationButtonOnClick={() => {
                dispatch(animationStatusChanged('loading'));
            }}
        />
    );
};
