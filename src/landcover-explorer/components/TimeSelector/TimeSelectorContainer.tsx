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
import { selectAnimationStatus } from '@shared/store/UI/selectors';

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

    const mode = useAppSelector(selectMapMode);

    const shouldShowSatellteLayer = useAppSelector(
        selectShouldShowSatelliteImageryLayer
    );

    const isSatelliteImagertLayerOutOfVisibleRange = useAppSelector(
        selectIsSatelliteImageryLayerOutOfVisibleRange
    );

    const isImageryLayerOutOfVisibleRangeWarningMessageOn =
        shouldShowSatellteLayer &&
        isSatelliteImagertLayerOutOfVisibleRange === true;

    const animationStatus = useAppSelector(selectAnimationStatus);

    const [showAnimationControls, setShowAnimationControls] = React.useState(
        animationStatus !== null
    );

    const getContent = () => {
        if (isImageryLayerOutOfVisibleRangeWarningMessageOn) {
            return (
                <SatelliteImageryLayerOutOfVisibleRangeWarning
                    satelliteName={satelliteName}
                />
            );
        }

        return (
            <>
                <AnimationAndExportControls
                    showDownloadGeoTIFFButton={showDownloadGeoTIFFButton}
                    showAnimationControls={
                        mode === 'step' && showAnimationControls
                    }
                    toggleAnimationControlsButtonOnClick={(
                        shouldShowAnimationControls
                    ) => {
                        setShowAnimationControls(shouldShowAnimationControls);
                    }}
                />

                <div className={classNames('relative w-full mt-4')}>
                    {mode === 'step' && showAnimationControls === false && (
                        <div className="flex">
                            <TimeSliderWidgetContainer />
                            <AcquisitionMonthPickerStepMode />
                        </div>
                    )}
                    {mode === 'swipe' && (
                        <TimeSelector4SwipeMode
                            shouldShowMonthPicker={shouldShowSatellteLayer}
                        />
                    )}
                </div>
            </>
        );
    };

    // useEffect(() => {
    //     // Reset the animation controls visibility when the mode changes
    //     setShowAnimationControls(false);
    // }, [mode]);

    useEffect(() => {
        if (animationStatus) {
            return;
        }

        // Reset the animation controls visibility when the animation mode becomes null,
        // or when the mode changes
        // This is to ensure that the animation controls are hidden when user exits animation mode
        if (!animationStatus || mode !== 'step') {
            setShowAnimationControls(false);
        }
    }, [animationStatus, mode]);

    return (
        <div className="w-landcover-explorer-time-slider-width shrink-0 text-center mx-6">
            <TimeSelectorHeader
                // titleForImagery={t('sentinel_layer_title', { ns: APP_NAME })}
                // titleForLandCover={t('land_cover_layer_title', { ns: APP_NAME })}
                titleForImagery={title4Imagery}
                titleForLandCover={title4LandCover}
            />

            {getContent()}
        </div>
    );
};
