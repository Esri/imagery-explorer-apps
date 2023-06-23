import React, { FC, useEffect, useRef } from 'react';
// import ISlider from 'esri/widgets/Slider';
// import { loadModules } from 'esri-loader';
// import classNames from 'classnames';
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
const MAX_SPEED_IN_MILLISECONDS = 2000;

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
                    // The slider range is set between 0 and 1. In this UI, a value of 0 indicates the slowest speed,
                    // while a value of 1 indicates the fastest speed. To achieve this, we calculate a speed ratio
                    // that determines the animation speed.
                    let speedRatio = 1 - newVal;

                    // Ensure speedRatio is not zero, so we set it to a minimum of 0.01, which corresponds to 20 milliseconds per frame.
                    speedRatio = speedRatio || 0.01;

                    onChange(MAX_SPEED_IN_MILLISECONDS * speedRatio);
                }}
            />

            <div className="text-xs text-center mt-1">
                <span>Speed</span>
            </div>
        </div>
    );
};
