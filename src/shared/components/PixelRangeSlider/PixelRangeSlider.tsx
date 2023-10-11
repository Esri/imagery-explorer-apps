import React, { FC, useEffect, useRef } from 'react';
import ISlider from 'esri/widgets/Slider';
import { loadModules } from 'esri-loader';
// import classNames from 'classnames';
import './PixelRangeSlider.css';
import classNames from 'classnames';

type Props = {
    /**
     * value of the slider thumb
     */
    values: number[];
    /**
     * min value of the pixel range
     */
    min?: number;
    /**
     * max value of the pixel range
     */
    max?: number;
    /**
     * slider step
     */
    steps?: number;
    /**
     * count of ticks to be displayed on slider
     */
    countOfTicks?: number;
    /**
     * tick labels to be displayed on slider
     */
    tickLabels?: number[];
    /**
     * if true, should show slider tooltip when hover over the slider handlers
     */
    showSliderTooltip?: boolean;
    /**
     * emits when user changes the values of the slider either by dragging the thumb or the segment line
     * @param vals
     * @returns
     */
    valuesOnChange: (vals: number[]) => void;
};

/**
 * A slider component to select fixel range of the mask layer for selected Imagery scene
 * @param param0
 * @returns
 */
export const PixelRangeSlider: FC<Props> = ({
    values,
    min = -1,
    max = 1,
    steps = 0.05,
    countOfTicks = 0,
    tickLabels = [],
    showSliderTooltip,
    valuesOnChange,
}) => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<ISlider>();

    const init = async () => {
        type Modules = [typeof ISlider];

        try {
            const [Slider] = await (loadModules([
                'esri/widgets/Slider',
            ]) as Promise<Modules>);

            sliderRef.current = new Slider({
                container: containerRef.current,
                min,
                max,
                steps,
                values,
                snapOnClickEnabled: false,
                visibleElements: {
                    labels: false,
                    rangeLabels: false,
                },
                tickConfigs: [
                    {
                        mode: 'count',
                        values: countOfTicks,
                    },
                    {
                        mode: 'position',
                        values: tickLabels, //[-1, -0.5, 0, 0.5, 1],
                        labelsVisible: true,
                    },
                ],
                // layout: 'vertical',
            });

            sliderRef.current.on('thumb-drag', (evt) => {
                // const { value, index } = evt;
                // valOnChange(index, value);
                valuesOnChange(sliderRef.current.values);
            });

            sliderRef.current.on('segment-drag', (evt) => {
                valuesOnChange(sliderRef.current.values);
            });
        } catch (err) {
            console.error(err);
        }
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
        const sliderHandlerB = containerRef.current.querySelector(
            '.esri-slider__anchor-1'
        );

        const ATTR_NAME = 'aria-tooltip-text';

        if (sliderHandlerA) {
            sliderHandlerA.setAttribute(
                ATTR_NAME,
                values[0].toFixed(2).toString()
            );
        }

        if (sliderHandlerB) {
            sliderHandlerB.setAttribute(
                ATTR_NAME,
                values[1].toFixed(2).toString()
            );
        }
    };

    useEffect(() => {
        init();

        return () => {
            if (sliderRef.current) {
                sliderRef.current.destroy();
            }
        };
    }, []);

    // Synchronize the position of the slider thumb with the current value of cloud coverage.
    // The Cloud Filter component controls the cloud coverage for different scenes (e.g., left/right scenes in swipe mode).
    // Each scene can have a different cloud coverage, and the slider component should always display the value of cloud coverage from the selected scene.
    useEffect(() => {
        if (!sliderRef.current) {
            return;
        }

        if (values === undefined) {
            return;
        }

        // Check if the current value of the slider is different from the input value.
        // If so, update the slider's value to match the input value.
        if (sliderRef.current.values[0] !== values[0]) {
            sliderRef.current.viewModel.setValue(0, values[0]);
        }

        if (sliderRef.current.values[1] !== values[1]) {
            sliderRef.current.viewModel.setValue(1, values[1]);
        }

        addTooltipTextAttribute();
    }, [values]);

    return (
        <div
            className={classNames(
                'esri-slider-custom-style show-segment-between-handlers w-full',
                {
                    'show-slider-tooltip': showSliderTooltip,
                }
            )}
            ref={containerRef}
        ></div>
    );
};
