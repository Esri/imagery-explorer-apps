import { AnimationAndExportControls } from '@landcover-explorer/components/AnimationAndExportControls/AnimationAndExportControls';
import TimeSelector4SwipeMode from '@landcover-explorer/components/TimeSelector/TimeSelector4SwipeMode';
import { TimeSelectorHeader } from '@landcover-explorer/components/TimeSelector/TimeSelectorHeader';
import { TimeSliderWidgetContainer } from '@landcover-explorer/components/TimeSelector/TimeSliderWidget';
import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectShouldShowSatelliteImageryLayer,
} from '@shared/store/LandcoverExplorer/selectors';
import classNames from 'classnames';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { NLCDTimeSelectorHeader } from './NLCDTimeSelectorHeader';
import { AcquisitionMonthPickerStepMode } from '@landcover-explorer/components/TimeSelector/AcquisitionMonthPicker/AcquisitionMonthPickerStepMode';
import { SatelliteImageryLayerOutOfVisibleRangeWarning } from '@landcover-explorer/components/TimeSelector/SatelliteImageryLayerOutOfVisibleRangeWarning';

export const NLCDTimeSelector = () => {
    const { t } = useTranslation();

    const shouldShowSatellteLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const shouldShowMonthPicker =
        shouldShowSatellteLayer &&
        isSatelliteImagertLayerOutOfVisibleRange === false;

    return (
        <div className="w-landcover-explorer-time-slider-width text-center mx-6">
            <NLCDTimeSelectorHeader />

            <AnimationAndExportControls showDownloadGeoTIFFButton={false} />

            <div className={classNames('relative w-full mt-4')}>
                <div className="flex">
                    <TimeSliderWidgetContainer />
                    {shouldShowMonthPicker && (
                        <AcquisitionMonthPickerStepMode />
                    )}
                </div>

                <TimeSelector4SwipeMode
                    shouldShowMonthPicker={shouldShowMonthPicker}
                />
            </div>

            <SatelliteImageryLayerOutOfVisibleRangeWarning satelliteName="Landsat" />
        </div>
    );
};
