import './Slider.css';
import React, { FC, useEffect, useRef } from 'react';
import ISlider from 'esri/widgets/Slider';
import { loadModules } from 'esri-loader';
import classNames from 'classnames';

type Props = {
    /**
     * value of the slider thumb
     */
    value: number;
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
export const Slider: FC<Props> = ({ value, onChange }) => {
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
                min: 0,
                max: 1,
                steps: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
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
        } catch (err) {
            console.error(err);
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
    }, [value]);

    return (
        <div
            // id="cloud-filter-container"
            className="esri-slider-custom-style w-full"
            ref={containerRef}
        ></div>
    );
};
