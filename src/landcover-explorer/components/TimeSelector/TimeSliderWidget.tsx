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

import './TimeSliderWidget.css';
import React, { useRef, useEffect, FC, useMemo } from 'react';
// import ISlider from '@arcgis/core/widgets/Slider';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import classNames from 'classnames';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import {
    selectAvaiableYearsForLandCoverLayer,
    selectMapMode,
    // selectShouldShowSatelliteImageryLayer,
    selectYear,
} from '@shared/store/LandcoverExplorer/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
// import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { yearUpdated } from '@shared/store/LandcoverExplorer/reducer';
import { getSliderTickValues } from './helpers';
import { getUTCDate } from '@shared/utils/date-time/getUTCDate';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';

type TimeSliderMode = 'time-window' | 'instant';

type Props = {
    mode?: TimeSliderMode;
    /**
     * Available years
     *
     * @example
     * ```js
     * [2017, 2018, 2019, 2020, 2021]
     * ```
     */
    years: number[];
    /**
     * The time extent that will be used when initiate the time slider
     */
    initialTimeExtent?: {
        start: Date;
        end: Date;
    };
    /**
     * Visibility of Time Slider, no need to show this slider when is step mode, or viewing Sentinel-2 Imagery layer at zoom level 10 or less
     */
    visible: boolean;
    /**
     * Fires when the time extent of the Time Slider is changed
     *
     * @param startYear new start year
     * @param endYear ned end year
     */
    timeExtentOnChange?: (startYear: number, endYear: number) => void;
    /**
     * selected year
     */
    selectedYear?: number;
};

export const TimeSliderWidgetContainer = () => {
    const dispatch = useAppDispatch();

    const animationMode = useAppSelector(selectAnimationStatus);

    const mode = useAppSelector(selectMapMode);

    // const years = getAvailableYears();
    const years = useAppSelector(selectAvaiableYearsForLandCoverLayer);

    const year = useAppSelector(selectYear);

    const timeStepSliderVisibility = mode === 'step';

    return (
        <div
            className={classNames('w-full', {
                'pointer-events-none': animationMode !== null,
            })}
        >
            <TimeSliderWidget
                mode="instant"
                years={years}
                initialTimeExtent={{
                    start: getUTCDate(year, 0, 1),
                    end: getUTCDate(year, 0, 1),
                }}
                visible={timeStepSliderVisibility}
                timeExtentOnChange={(startYear) => {
                    dispatch(yearUpdated(startYear));
                }}
                selectedYear={year}
            />
        </div>
    );
};

export const TimeSliderWidget: FC<Props> = ({
    mode = 'time-window',
    years,
    initialTimeExtent,
    visible,
    timeExtentOnChange,
    selectedYear,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<TimeSlider>();

    const debounceDelay = useRef<NodeJS.Timeout>();

    const init = async () => {
        try {
            // get an array of Date objects represent the input years, use Jan 1st as month and day when create the Date obj
            const yearsAsDateObj: Date[] = years.map((year) => {
                return getUTCDate(year, 1, 1);
            });

            const startYear = years[0];
            const endYear = years[years.length - 1];

            const NUM_TICKS = IS_MOBILE_DEVICE ? 5 : 10; // reduce the number of ticks for mobile devices

            sliderRef.current = new TimeSlider({
                container: containerRef.current,
                mode,
                fullTimeExtent: {
                    start: getUTCDate(startYear, 1, 1),
                    end: getUTCDate(endYear, 1, 1),
                },
                timeExtent: initialTimeExtent,
                stops: { dates: yearsAsDateObj },
                tickConfigs: [
                    {
                        mode: 'position',
                        values: getSliderTickValues(yearsAsDateObj, NUM_TICKS),
                        labelsVisible: true,
                        labelFormatFunction: (value: any) => {
                            return new Date(value).getUTCFullYear();
                        },
                    } as any,
                ],
                visible,
            });

            // console.log(sliderRef.current);

            if (timeExtentOnChange) {
                reactiveUtils.watch(
                    () => sliderRef.current.timeExtent,
                    (timeExtent) => {
                        clearTimeout(debounceDelay.current);

                        debounceDelay.current = setTimeout(() => {
                            timeExtentOnChange(
                                timeExtent.start.getUTCFullYear(),
                                timeExtent.end.getUTCFullYear()
                            );
                        }, 500);
                    }
                );
            }

            // sliderRef.current.on('thumb-drag', (evt) => {
            //     clearTimeout(debounceDelay.current);

            // });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        init();

        return () => {
            sliderRef.current.destroy();
            console.log(sliderRef.current.destroyed);
        };
    }, []);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.visible = visible;
        }
    }, [visible]);

    useEffect(() => {
        if (!sliderRef.current || !selectedYear) {
            return;
        }

        const yearFromTimeSlider =
            sliderRef.current.timeExtent.start.getUTCFullYear();

        if (yearFromTimeSlider === selectedYear) {
            return;
        }

        sliderRef.current.timeExtent = {
            start: getUTCDate(selectedYear, 1, 1),
            end: getUTCDate(selectedYear, 1, 1),
        } as any;
    }, [selectedYear]);

    return (
        <div
            // id="timeSliderDiv"
            ref={containerRef}
            className={classNames(
                'customized-time-slider time-slider-container'
            )}
        ></div>
    );
};
