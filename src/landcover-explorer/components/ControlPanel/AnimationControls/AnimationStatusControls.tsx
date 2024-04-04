import React from 'react';
import AnimationStatusButton from './AnimationStatusButton';
import { useSelector } from 'react-redux';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
} from '@shared/store/LandcoverExplorer/selectors';
import MonthPicker from '../AcquisitionMonthPicker/MonthPicker';

export const AnimationControls = () => {
    const mode = useSelector(selectMapMode);

    const animationMode = useSelector(selectAnimationStatus);

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer && isSentinel2LayerOutOfVisibleRange === false;

    if (mode !== 'step' || isSentinel2LayerOutOfVisibleRange) {
        return null;
    }

    return (
        <div className="relative hidden lg:block pt-4">
            <AnimationStatusButton />

            <div
                className="w-full mt-2"
                style={{
                    height: 26,
                }}
            >
                {shouldShowMonthPicker && (
                    <MonthPicker disabled={animationMode !== null} />
                )}
            </div>
        </div>
    );
};
