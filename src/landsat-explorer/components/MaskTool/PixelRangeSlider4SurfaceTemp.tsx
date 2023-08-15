import React, { FC, useEffect, useRef } from 'react';
import ISlider from 'esri/widgets/Slider';
import { loadModules } from 'esri-loader';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat-2/config';
// import classNames from 'classnames';

type Props = {
    /**
     * value of the slider thumb
     */
    values: number[];
    unit: 'celsius' | 'farhenheit';
    /**
     * fires when user selects a new min or max value using the slider
     */
    valOnChange: (index: number, val: number) => void;
};

/**
 * A slider component to select fixel range of the mask layer for selected Landsat scene
 * @param param0
 * @returns
 */
export const PixelRangeSlider: FC<Props> = ({ values, unit, valOnChange }) => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<ISlider>();

    const init = async () => {
        type Modules = [typeof ISlider];

        try {
            const [Slider] = await (loadModules([
                'esri/widgets/Slider',
            ]) as Promise<Modules>);

            const tickValuesCelsius = [-30, -15, 0, 15, 30, 45, 60, 75, 90];
            const tickValuesFarhenheit = [-20, 0, 30, 60, 90, 120, 150, 180];

            containerRef.current.innerHTML = `
                <div class="esri-slider-custom-style show-segment-between-handlers w-full"></div>
            `;

            const container = containerRef.current.querySelector(
                '.esri-slider-custom-style'
            ) as HTMLDivElement;

            sliderRef.current = new Slider({
                container,
                min:
                    unit === 'celsius'
                        ? LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS
                        : LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
                max:
                    unit === 'celsius'
                        ? LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS
                        : LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
                steps: 1,
                values,
                snapOnClickEnabled: false,
                visibleElements: {
                    labels: false,
                    rangeLabels: false,
                },
                tickConfigs: [
                    {
                        mode: 'position',
                        values:
                            unit === 'celsius'
                                ? tickValuesCelsius
                                : tickValuesFarhenheit,
                        labelsVisible: true,
                    },
                ],
                // layout: 'vertical',
            });

            sliderRef.current.on('thumb-drag', (evt) => {
                const { value, index } = evt;
                valOnChange(index, value);
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
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
    }, [values]);

    useEffect(() => {
        if (sliderRef.current) {
            sliderRef.current.destroy();
        }

        init();
    }, [unit]);

    return (
        <div className="w-full h-[120px]" ref={containerRef}>
            {/* <div
                className="esri-slider-custom-style show-segment-between-handlers w-full"
                ref={containerRef}
            ></div> */}
        </div>
    );
};
