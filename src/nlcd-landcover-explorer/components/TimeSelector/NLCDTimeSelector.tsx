import { AnimationControls } from '@landcover-explorer/components/ControlPanel/AnimationControls/AnimationStatusControls';
import { ExtraOptions } from '@landcover-explorer/components/ControlPanel/TimeSelector/ExtraOptions';
import TimeSelector4SwipeMode from '@landcover-explorer/components/ControlPanel/TimeSelector/TimeSelector4SwipeMode';
import { TimeSelectorHeader } from '@landcover-explorer/components/ControlPanel/TimeSelector/TimeSelectorHeader';
import { TimeSliderWidgetContainer } from '@landcover-explorer/components/ControlPanel/TimeSelector/TimeSliderWidget';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectShouldShowSatelliteImageryLayer } from '@shared/store/LandcoverExplorer/selectors';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NLCDTimeSelectorHeader } from './NLCDTimeSelectorHeader';

export const NLCDTimeSelector = () => {
    const { t } = useTranslation();

    const shouldShowSatellteLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    // const shouldShowMonthPicker =
    //     shouldShowSentinel2Layer && isSentinel2LayerOutOfVisibleRange === false;

    return (
        <div className="w-landcover-explorer-time-slider-width text-center mx-6">
            <NLCDTimeSelectorHeader />

            <ExtraOptions />

            <div className={classNames('relative w-full mt-4')}>
                <div className="flex">
                    <TimeSliderWidgetContainer />
                    <AnimationControls />
                </div>

                <TimeSelector4SwipeMode
                    shouldShowMonthPicker={shouldShowSatellteLayer}
                />
            </div>
        </div>
    );
};
