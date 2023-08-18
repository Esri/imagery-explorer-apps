import React, { FC, useEffect, useRef } from 'react';
// import ISlider from 'esri/widgets/Slider';
// import { loadModules } from 'esri-loader';
// import classNames from 'classnames';
import { Slider } from '../Slider';

type Props = {
    /**
     * current animation speed in milliseconds
     */
    speed: number;
    /**
     * fires when user selects a new animation speed
     * @param val new animation speed
     * @returns
     */
    onChange: (speed: number) => void;
};

/**
 * Maximum Animation Speed in Milliseconds
 */
const MAX_SPEED_IN_MILLISECONDS = 2000;

/**
 * Calculates the position of a slider thumb based on the given animation speed.
 *
 * @param {number} speed - The animation speed in milliseconds.
 * @returns {number} - The position of the slider thumb, ranging from 0 (slowest) to 1 (fastest).
 */
const getSliderThumbPositionByAnimationSpeed = (speed: number): number => {
    /**
     * Calculate the speed ratio relative to the maximum speed in milliseconds.
     * A value of 1 indicates the slowest speed, while 0.1 indicates the fastest speed.
     */
    const speedRatio = speed / MAX_SPEED_IN_MILLISECONDS;

    /**
     * Calculate the position of the slider thumb.
     * The left end of the slider corresponds to a value of 0,
     * and the right end of the slider corresponds to a value of 1.
     * To represent slow-to-fast animation, the slider thumb position is reversed.
     */
    const position = 1 - speedRatio;

    return +position.toFixed(1);
};

/**
 * A slider component to control the speed of animation
 * @param param0
 * @returns
 */
export const AnimationSpeedControl: FC<Props> = ({ speed, onChange }) => {
    return (
        <div
            // id="cloud-filter-container"
            className="flex-grow px-2 pt-2"
        >
            <Slider
                value={getSliderThumbPositionByAnimationSpeed(speed)} // 0.5 as the mid point of the slider, which is equivelant to 1 second per frame
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
