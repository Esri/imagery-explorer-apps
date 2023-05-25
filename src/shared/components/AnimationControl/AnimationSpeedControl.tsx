import React, { FC, useEffect, useRef } from 'react';
import ISlider from 'esri/widgets/Slider';
import { loadModules } from 'esri-loader';
import classNames from 'classnames';
import { Slider } from '../Slider';

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
    return (
        <div
            // id="cloud-filter-container"
            className="flex-grow px-2 pt-2"
        >
            <Slider
                value={0.5} // 0.5 as the mid point of the slider, which is equivelant to 1 second per frame
                onChange={(newVal) => {
                    // speed cannot be zero, therefore we just use 0.1, which will be 20 milisecond per frame
                    newVal = newVal || 0.01;
                    onChange(newVal * MAX_SPEED);
                }}
            />

            <div className="text-xs text-center mt-1">
                <span>Speed</span>
            </div>
        </div>
    );
};
