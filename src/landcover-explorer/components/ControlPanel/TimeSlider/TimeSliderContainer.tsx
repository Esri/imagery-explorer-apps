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
import {
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    yearUpdated,
} from '@shared/store/LandcoverExplorer/reducer';
import {
    selectIsSentinel2LayerOutOfVisibleRange,
    selectMapMode,
    selectShouldShowSentinel2Layer,
    selectYear,
    selectYearsForSwipeWidgetLayers,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import {
    saveActiveYearToHashParams,
    saveTimeExtentToHashParams,
} from '@landcover-explorer/utils/URLHashParams';
import HeaderText from '../HeaderText/HeaderText';
import AnimationButton from './AnimationButton';
// import ModeSelector from './ModeSelector';
import MonthPicker from './MonthPicker';
import TimeSliderWidget from './TimeSliderWidget';
import TimeSelector4SwipeMode from './TimeSelector4SwipeMode';

const TimeSliderContainer = () => {
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
    const { year4LeadingLayer, year4TrailingLayer } = useSelector(
        selectYearsForSwipeWidgetLayers
    );

    const year = useSelector(selectYear);

    const shouldShowMonthPicker =
        shouldShowSentinel2Layer && isSentinel2LayerOutOfVisibleRange === false;

    const timeRangeSliderVisibility =
        mode === 'swipe' && isSentinel2LayerOutOfVisibleRange === false;

    const timeStepSliderVisibility =
        mode === 'step' && isSentinel2LayerOutOfVisibleRange === false;

    useEffect(() => {
        saveTimeExtentToHashParams(year4LeadingLayer, year4TrailingLayer);
    }, [year4LeadingLayer, year4TrailingLayer]);

    useEffect(() => {
        saveActiveYearToHashParams(mode === 'step' ? year : null);
    }, [year, mode]);

    return (
        <div className="text-center w-full xl:w-auto">
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

            {/* <ModeSelector disabled={animationMode !== null} /> */}

            <div
                className={classNames(
                    'relative w-full md:w-11/12 xl:w-full xl:max-w-md mt-2'
                )}
            >
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
                            // console.log(startYear)

                            batch(() => {
                                dispatch(yearUpdated(startYear));
                            });
                        }}
                        selectedYear={year}
                    />
                </div>

                {isSentinel2LayerOutOfVisibleRange === false &&
                    mode === 'swipe' && (
                        <TimeSelector4SwipeMode
                            shouldShowMonthPicker={shouldShowMonthPicker}
                        />
                    )}

                {isSentinel2LayerOutOfVisibleRange === false &&
                    mode === 'step' && (
                        <div
                            className="absolute hidden lg:block"
                            style={{
                                right: -40,
                                bottom: 11,
                                width: 55,
                            }}
                        >
                            <div className="mb-3">
                                <AnimationButton />
                            </div>

                            <div
                                className="w-full"
                                style={{
                                    height: 26,
                                }}
                            >
                                {shouldShowMonthPicker && (
                                    <MonthPicker
                                        disabled={animationMode !== null}
                                    />
                                )}
                            </div>
                        </div>
                    )}
            </div>

            {isSentinel2LayerOutOfVisibleRange && (
                <div className="mt-9 text-center text-sm opacity-50">
                    <p>
                        {mode === 'swipe'
                            ? 'Zoom in to compare Sentinel-2 Imagery Layers'
                            : 'Zoom in to enable time slider'}
                    </p>
                </div>
            )}
        </div>
    );
};

export default TimeSliderContainer;
