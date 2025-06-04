import React from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import {
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import MonthPicker from './MonthPicker';

export const AcquisitionMonthPickerStepMode = () => {
    const mode = useAppSelector(selectMapMode);

    const animationMode = useAppSelector(selectAnimationStatus);

    const shouldShowSatelliteImagery = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    if (!shouldShowSatelliteImagery || mode !== 'step') {
        return null;
    }

    return (
        <div className="relative hidden lg:block pt-4">
            <div
                className="w-ful"
                style={{
                    height: 26,
                }}
            >
                {shouldShowSatelliteImagery && (
                    <MonthPicker disabled={animationMode !== null} />
                )}
            </div>
        </div>
    );
};
