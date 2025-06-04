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
import React, { FC, useEffect } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

import {
    selectIsSatelliteImageryLayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSatelliteImageryLayer,
    // selectYear,
} from '@shared/store/LandcoverExplorer/selectors';

import { TimeSliderWidgetContainer } from './TimeSliderWidget';
import TimeSelector4SwipeMode from './TimeSelector4SwipeMode';
import { SatelliteImageryLayerOutOfVisibleRangeWarning } from './SatelliteImageryLayerOutOfVisibleRangeWarning';
import { AnimationAndExportControls } from '../AnimationAndExportControls/AnimationAndExportControls';
import { AcquisitionMonthPickerStepMode } from './AcquisitionMonthPicker/AcquisitionMonthPickerStepMode';
import { TimeSelectorHeader } from './TimeSelectorHeader';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

type TimeSelectorContainerProps = {
    /**
     * Title for the imagery layer.
     */
    title4Imagery: string;
    /**
     * Title for the land cover layer.
     */
    title4LandCover: string;
    /**
     * Indicates whether the download GeoTIFF button should be shown.
     */
    showDownloadGeoTIFFButton: boolean;
    /**
     * Name of the satellite for which the warning is displayed when the layer is out of visible range.
     */
    satelliteName: string;
};

export const LandcoverTimeSelectorContainer: FC<TimeSelectorContainerProps> = ({
    title4Imagery,
    title4LandCover,
    showDownloadGeoTIFFButton,
    satelliteName,
}) => {
    const { t } = useTranslation();

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
            <TimeSelectorHeader
                // titleForImagery={t('sentinel_layer_title', { ns: APP_NAME })}
                // titleForLandCover={t('land_cover_layer_title', { ns: APP_NAME })}
                titleForImagery={title4Imagery}
                titleForLandCover={title4LandCover}
            />

            <AnimationAndExportControls
                showDownloadGeoTIFFButton={showDownloadGeoTIFFButton}
            />

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

            <SatelliteImageryLayerOutOfVisibleRangeWarning
                satelliteName={satelliteName}
            />
        </div>
    );
};
