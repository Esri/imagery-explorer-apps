import React, { FC } from 'react';
import './CalciteSlider.css';

type Props = {
    /**
     * The value of the slider. The default value is 0.
     */
    value: number;
    /**
     * The minimum value of the slider. The default value is 0.
     */
    min: number;
    /**
     * The maximum value of the slider. The default value is 100.
     */
    max: number;
    /**
     * The step granularity that the slider must adhere to. The default value is 1.
     */
    step: number;
    /**
     * The scale of the slider. The default value is "m".
     */
    scale?: 's' | 'm' | 'l';
    /**
     * Emits when the slider value changes.
     * @param val
     * @returns
     */
    onChange: (val: number) => void;
};

export const CalciteSlider: FC<Props> = ({
    value,
    min,
    max,
    step,
    scale,
    onChange,
}) => {
    return (
        <calcite-slider
            style={{}}
            value={value}
            min={min}
            max={max}
            step={step}
            scale={scale || 'm'}
            fillPlacement="none"
            oncalciteSliderInput={(e) => {
                const val = e.target.value as number;
                // console.log('slider value changed: ', val);
                onChange(val);
            }}
        ></calcite-slider>
    );
};
