import './style.css';
import React, { FC, useEffect, useRef } from 'react';
import ISlider from 'esri/widgets/Slider';
import { loadModules } from 'esri-loader';
import { CloudIcons } from './CloudIcons';

type Props = {
    /**
     * user selected cloud coverage threshold ranges from 0 to 1
     */
    cloudCoverage: number;
    /**
     * fires when user selects a new cloud coverage threshold
     * @param val new cloud coverage threshold
     * @returns
     */
    onChange: (val: number) => void;
};

export const CloudFilter: FC<Props> = ({ cloudCoverage, onChange }) => {
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
                min: 0,
                max: 1,
                steps: [0, 0.1, 0.2, 0.3, 0.4, 0.5, 0.6, 0.7, 0.8, 0.9, 1],
                values: [0.5],
                snapOnClickEnabled: false,
                visibleElements: {
                    labels: false,
                    rangeLabels: false,
                },
                layout: 'vertical',
            });

            sliderRef.current.on('thumb-drag', (evt) => {
                // console.log(evt.value)
                clearTimeout(debounceDelay.current);

                debounceDelay.current = setTimeout(() => {
                    const value = +evt.value;
                    onChange(value);
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
        <div className="mx-4">
            <div className="text-center text-xs mb-4">
                <span>{Math.floor(cloudCoverage * 100)}% Cloud</span>
                <br />
                <span className="uppercase text-custom-light-blue-50">
                    Tolerance
                </span>
            </div>

            <div className="flex mx-2">
                <div
                    id="cloud-filter-container"
                    className="text-custom-light-blue h-cloud-slider-height w-6"
                    ref={containerRef}
                ></div>

                <CloudIcons />
            </div>
        </div>
    );
};
