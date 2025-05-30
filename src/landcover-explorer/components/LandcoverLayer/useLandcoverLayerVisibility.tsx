import { useAppSelector } from '@shared/store/configureStore';
import {
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import React, { useMemo } from 'react';

/**
 * Custom React hook to determine the visibility of the landcover layer.
 *
 * The visibility is computed based on three conditions:
 * - The satellite imagery layer must not be shown.
 * - No animation should be currently active.
 * - The map mode must be set to 'step'.
 *
 * @returns {boolean} `true` if the landcover layer should be visible, otherwise `false`.
 */
export const useLandcoverLayerVisibility = () => {
    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const showSatelliteImageryLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const visible = useMemo(() => {
        if (showSatelliteImageryLayer) {
            return false;
        }

        if (animationMode !== null) {
            return false;
        }

        return mode === 'step';
    }, [mode, animationMode, showSatelliteImageryLayer]);

    return visible;
};
