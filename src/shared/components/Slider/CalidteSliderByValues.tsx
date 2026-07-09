import React, { FC, useMemo } from 'react';
import './CalciteSlider.css';

type Props = {
    /**
     * value of the slider thumb
     * */
    value: number;
    /**
     * values of the slider steps, the slider thumbs may only be moved to the positions specified in the array.
     * */
    steps: number[];
    /**
     * The scale of the slider. The default value is "m".
     */
    scale?: 's' | 'm' | 'l';
    /**
     * emits when the slider value changes.
     * */
    onChange: (val: number) => void;
};

/**
 * A Calcite slider that restricts movement to a discrete set of values.
 * Internally maps each value to an integer index so the native slider step is always 1,
 * then converts back to the original value on change.
 */
export const CalciteSliderByValues: FC<Props> = ({
    value,
    steps,
    scale = 'm',
    onChange,
}) => {
    // Map indices to steps so the native slider always advances by 1
    const min = 0; // index of the first step is 0
    const max = steps.length > 0 ? steps.length - 1 : 0; // index of the last step is length - 1
    const step = 1; // always advance by 1 index

    // Reverse lookup: step value → index
    const stepIndexLookup = useMemo(() => {
        const lookup: Record<number, number> = {};
        steps.forEach((stepVal, index) => {
            lookup[stepVal] = index;
        });
        return lookup;
    }, [steps]);

    // Default to index 0 if the value is not found in steps
    const stepIndex = stepIndexLookup[value] ?? 0;

    return (
        <calcite-slider
            value={stepIndex}
            min={min}
            max={max}
            step={step}
            scale={scale}
            fillPlacement="none"
            oncalciteSliderInput={(e) => {
                const index = e.target.value as number;
                // Look up the original value from the index
                const val = steps[index];
                onChange(val);
            }}
        />
    );
};
