import { AnimationFrameAcquisitionDateDisplay } from '@shared/components/AnimationLayer/AnimationFrameAcquisitionDateDisplay';
import { useAppSelector } from '@shared/store/configureStore';
import { selectYear } from '@shared/store/LandcoverExplorer/selectors';
import { AnimationStatus } from '@shared/store/UI/reducer';
import React, { FC } from 'react';

type Props = {
    animationStatus: AnimationStatus;
};

/**
 * This component displays the current year of the animation
 * If the animation is playing or pausing, it shows the year in large text at the top-left corner.
 *
 * @param props.animationStatus The current status of the animation
 * @returns JSX.Element | null
 */
export const AnimationYearDisplay: FC<Props> = ({ animationStatus }) => {
    const selectedYear = useAppSelector(selectYear);

    return (
        <AnimationFrameAcquisitionDateDisplay
            animationStatus={animationStatus}
            acquisitionDate={selectedYear.toString()}
        />
    );
};
