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

import './Slider.css';
import React, { FC, useEffect, useRef } from 'react';
import SliderWidget from '@arcgis/core/widgets/Slider';
import classNames from 'classnames';

type Props = {
    /**
     * value of the slider thumb
     */
    value: number;
    /**
     * Steps on the slider that restrict user input to specific values,
     * the slider thumbs may only be moved to the positions specified in the array.
     */
    steps?: number[];
    /**
     * if true, should show slider tooltip when hover over the slider handlers
     */
    showSliderTooltip?: boolean;
    /**
     * The function to format the text to be displayed in slider tooltip
     * @param val
     * @returns
     */
    tooltipTextFormatter?: (val: number) => string;
    /**
     * fires when user selects a new value using the slider
     */
    onChange: (val: number) => void;
};

/**
 * A slider component to select cloud coverage that will be used to find Landsat scenes
 * @param param0
 * @returns
 */
export const Slider: FC<Props> = ({
    value,
    steps,
    showSliderTooltip,
    tooltipTextFormatter,
    onChange,
}) => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<SliderWidget>();

    const init = async () => {
        steps = steps || [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1];

        const min = steps[0];
        const max = steps[steps.length - 1];

        sliderRef.current = new SliderWidget({
            container: containerRef.current,
            min,
            max,
            steps: steps,
            values: [value],
            snapOnClickEnabled: false,
            visibleElements: {
                labels: false,
                rangeLabels: false,
            },
            // layout: 'vertical',
        });

        sliderRef.current.on('thumb-drag', (evt) => {
            const value = +evt.value;
            onChange(value);
        });
    };

    /**
     * add custom attribute `aria-tooltip-text` to `.esri-slider__anchor` elements
     * so that it can be used to populate the tooltip when user hovers the slider handles
     * @returns void
     */
    const addTooltipTextAttribute = () => {
        if (!showSliderTooltip) {
            return;
        }

        const sliderHandlerA = containerRef.current.querySelector(
            '.esri-slider__anchor-0'
        );

        const ATTR_NAME = 'aria-tooltip-text';

        const tooltipText = tooltipTextFormatter
            ? tooltipTextFormatter(value)
            : value.toFixed(2).toString();

        if (sliderHandlerA) {
            sliderHandlerA.setAttribute(ATTR_NAME, tooltipText);
        }
    };

    useEffect(() => {
        init();

        return () => {
            sliderRef.current.destroy();
        };
    }, []);

    // Synchronize the position of the slider thumb with the current value of cloud coverage.
    // The Cloud Filter component controls the cloud coverage for different scenes (e.g., left/right scenes in swipe mode).
    // Each scene can have a different cloud coverage, and the slider component should always display the value of cloud coverage from the selected scene.
    useEffect(() => {
        if (!sliderRef.current) {
            return;
        }

        if (value === undefined) {
            return;
        }

        // Check if the current value of the slider is different from the input value.
        // If so, update the slider's value to match the input value.
        if (sliderRef.current.values[0] !== value) {
            sliderRef.current.viewModel.setValue(0, value);
        }

        addTooltipTextAttribute();
    }, [value]);

    return (
        <div
            // id="cloud-filter-container"
            className={classNames('esri-slider-custom-style w-full', {
                'show-slider-tooltip': showSliderTooltip,
            })}
            ref={containerRef}
        ></div>
    );
};
