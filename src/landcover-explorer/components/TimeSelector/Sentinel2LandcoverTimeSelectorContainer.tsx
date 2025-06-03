/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import classNames from 'classnames';
import React, { useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
// import { useAppDispatch } from '@shared/store/configureStore';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
// import { yearUpdated } from '@shared/store/LandcoverExplorer/reducer';
import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    // selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
// import { selectAnimationStatus } from '@shared/store/UI/selectors';

// import HeaderText from '../ControlPanel/HeaderText/HeaderText';
// import AnimationButton from '../AnimationControls/AnimationStatusButton';
// import ModeSelector from './ModeSelector';
// import MonthPicker from '../AcquisitionMonthPicker/MonthPicker';
import { TimeSliderWidgetContainer } from './TimeSliderWidget';
import TimeSelector4SwipeMode from './TimeSelector4SwipeMode';
import { SatelliteImageryLayerOutOfVisibleRangeWarning } from './SatelliteImageryLayerOutOfVisibleRangeWarning';
// import { AnimationControls } from '../AnimationAndExportControls/AnimationStatusControls';
import { AnimationAndExportControls } from '../AnimationAndExportControls/AnimationAndExportControls';
// import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
// import { TimeSelectorHeader } from './TimeSelectorHeader';
import { Sentinel2LandcoverTimeSelecterHeader } from './Sentinel2LandcoverTimeSelecterHeader';
import { AcquisitionMonthPickerStepMode } from './AcquisitionMonthPicker/AcquisitionMonthPickerStepMode';

export const Sentinel2LandcoverTimeSelectorContainer = () => {
    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer &&
        isSatelliteImagertLayerOutOfVisibleRange === false;

    return (
        <div className="w-landcover-explorer-time-slider-width shrink-0 text-center mx-6">
            <Sentinel2LandcoverTimeSelecterHeader />

            <AnimationAndExportControls showDownloadGeoTIFFButton={true} />

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

            <SatelliteImageryLayerOutOfVisibleRangeWarning satelliteName="Sentinel-2" />
        </div>
    );
};
