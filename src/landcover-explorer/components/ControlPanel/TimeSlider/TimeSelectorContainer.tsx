/* Copyright 2024 Esri
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
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { yearUpdated } from '@shared/store/LandcoverExplorer/reducer';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';

import HeaderText from '../HeaderText/HeaderText';
// import AnimationButton from '../AnimationControls/AnimationStatusButton';
// import ModeSelector from './ModeSelector';
// import MonthPicker from '../AcquisitionMonthPicker/MonthPicker';
import TimeSliderWidget from './TimeSliderWidget';
import TimeSelector4SwipeMode from './TimeSelector4SwipeMode';
import { Sentinel2OutOfVisibleRangeWarning } from './Sentinel2OutOfVisibleRangeWarning';
import { AnimationControls } from '../AnimationControls/AnimationStatusControls';
import { ExtraOptions } from './ExtraOptions';

export const TimeSelectorContainer = () => {
    const dispatch = useDispatch();

    const animationMode = useSelector(selectAnimationStatus);

    const mode = useSelector(selectMapMode);

    const years = getAvailableYears();

    const isSentinel2LayerOutOfVisibleRange = useSelector(
        selectIsSentinel2LayerOutOfVisibleRange
    );

    const shouldShowSentinel2Layer = useSelector(
        selectShouldShowSentinel2Layer
    );

    const year = useSelector(selectYear);

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer && isSentinel2LayerOutOfVisibleRange === false;

    const timeStepSliderVisibility =
        mode === 'step' && isSentinel2LayerOutOfVisibleRange === false;

    return (
        <div className="w-[430px] text-center">
            <HeaderText
                title={`${
                    shouldShowSentinel2Layer
                        ? 'Sentinel-2 Imagery'
                        : '10m Land Cover'
                }`}
                subTitle={
                    mode === 'swipe'
                        ? 'Choose Two Years to Compare'
                        : 'Choose a Year to View'
                }
            />

            <ExtraOptions />

            <div className={classNames('relative w-full mt-4')}>
                <div className="flex">
                    <div
                        className={classNames('w-full', {
                            'pointer-events-none': animationMode !== null,
                        })}
                    >
                        <TimeSliderWidget
                            mode="instant"
                            years={years}
                            initialTimeExtent={{
                                start: new Date(year, 0, 1),
                                end: new Date(year, 0, 1),
                            }}
                            visible={timeStepSliderVisibility}
                            timeExtentOnChange={(startYear) => {
                                batch(() => {
                                    dispatch(yearUpdated(startYear));
                                });
                            }}
                            selectedYear={year}
                        />
                    </div>

                    <AnimationControls />
                </div>

                <TimeSelector4SwipeMode
                    shouldShowMonthPicker={shouldShowMonthPicker}
                />
            </div>

            <Sentinel2OutOfVisibleRangeWarning />
        </div>
    );
};
