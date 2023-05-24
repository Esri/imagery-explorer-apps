import React, { FC, useEffect, useRef } from 'react';
import ISlider from 'esri/widgets/Slider';
import { loadModules } from 'esri-loader';
import classNames from 'classnames';

type Props = {
    /**
     * fires when user selects a new cloud coverage threshold
     * @param val new cloud coverage threshold
     * @returns
     */
    onChange: (speed: number) => void;
};

/**
 * Maximum Animation Speed in Milliseconds
 */
const MAX_SPEED = 2000;

/**
 * A slider component to control the speed of animation
 * @param param0
 * @returns
 */
export const AnimationSpeedControl: FC<Props> = ({ onChange }) => {
    const containerRef = useRef<HTMLDivElement>();

    const sliderRef = useRef<ISlider>();

    const debounceDelay = useRef<NodeJS.Timeout>();

    const init = async () => {
        type Modules = [typeof ISlider];

        try {
            const [Slider] = await (loadModules([
                'esri/widgets/Slider',
            ]) as Promise<Modules>);

            sliderRef.current = new Slider({
                container: containerRef.current,
                min: 0, // slowest speed
                max: 1, // fastest speed
                steps: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                values: [0.5],
                snapOnClickEnabled: false,
                visibleElements: {
                    labels: false,
                    rangeLabels: false,
                },
                // layout: 'vertical',
            });

            sliderRef.current.on('thumb-drag', (evt) => {
                // console.log(evt.value)
                clearTimeout(debounceDelay.current);

                debounceDelay.current = setTimeout(() => {
                    const ratio = +evt.value;
                    const speed = ratio * MAX_SPEED;
                    onChange(speed);
                }, 500);
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

    return (
        <div
            // id="cloud-filter-container"
            className="text-custom-light-blue w-20 h-6"
            ref={containerRef}
        ></div>
    );
};
