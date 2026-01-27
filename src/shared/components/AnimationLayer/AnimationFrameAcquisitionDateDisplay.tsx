import { AnimationStatus } from '@shared/store/UI/reducer';
import React, { FC } from 'react';

type Props = {
    animationStatus: AnimationStatus;
    acquisitionDate: string;
};

/**
 * This component displays the acquisition date of the current animation frame.
 * If the animation is playing or pausing, it shows the year in large text at the top-left corner.
 *
 * @param props.animationStatus The current status of the animation
 * @returns JSX.Element | null
 */
export const AnimationFrameAcquisitionDateDisplay: FC<Props> = ({
    animationStatus,
    acquisitionDate,
}) => {
    if (animationStatus !== 'playing' && animationStatus !== 'pausing') {
        return null;
    }

    return (
        <div
            className="absolute top-0 left-0 p-2 text-6xl font-thin text-custom-light-gray pointer-events-none select-none"
            style={{ textShadow: '3px 3px 8px rgba(0, 0, 0, 0.9)' }}
        >
            <span>{acquisitionDate}</span>
        </div>
    );
};
