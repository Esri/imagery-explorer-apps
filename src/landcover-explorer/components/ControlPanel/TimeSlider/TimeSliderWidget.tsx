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

import './TimeSliderWidget.css';
import React, { useRef, useEffect, FC, useMemo } from 'react';
// import ISlider from '@arcgis/core/widgets/Slider';
import TimeSlider from '@arcgis/core/widgets/TimeSlider';
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import classNames from 'classnames';

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
    visible?: boolean;
    /**
     * Fires when the time extent of the Time Slider is changed
     *
     * @param startYear new start year
     * @param endYear ned end year
     */
    timeExtentOnChange: (startYear: number, endYear: number) => void;
    /**
     * selected year
     */
    selectedYear?: number;
};

const TimeSliderWidget: FC<Props> = ({
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
                return new Date(year, 0, 1);
            });

            const startYear = years[0];
            const endYear = years[years.length - 1];

            sliderRef.current = new TimeSlider({
                container: containerRef.current,
                mode,
                fullTimeExtent: {
                    start: new Date(startYear, 0, 1),
                    end: new Date(endYear, 0, 1),
                },
                timeExtent: initialTimeExtent,
                stops: { dates: yearsAsDateObj },
                tickConfigs: [
                    {
                        mode: 'position',
                        values: yearsAsDateObj.map((year) => year.getTime()),
                        labelsVisible: true,
                        labelFormatFunction: (value: any) => {
                            return new Date(value).getFullYear();
                        },
                    } as any,
                ],
                visible,
            });

            // console.log(sliderRef.current);

            reactiveUtils.watch(
                () => sliderRef.current.timeExtent,
                (timeExtent) => {
                    clearTimeout(debounceDelay.current);

                    debounceDelay.current = setTimeout(() => {
                        timeExtentOnChange(
                            timeExtent.start.getFullYear(),
                            timeExtent.end.getFullYear()
                        );
                    }, 500);
                }
            );

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
            sliderRef.current.timeExtent.start.getFullYear();

        if (yearFromTimeSlider === selectedYear) {
            return;
        }

        sliderRef.current.timeExtent = {
            start: new Date(selectedYear, 0, 1),
            end: new Date(selectedYear, 0, 1),
        } as any;
    }, [selectedYear]);

    return (
        <div
            id="timeSliderDiv"
            ref={containerRef}
            className={classNames('time-slider-container')}
        ></div>
    );
};

export default TimeSliderWidget;
