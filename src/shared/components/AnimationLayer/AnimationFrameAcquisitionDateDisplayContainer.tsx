import { AnimationStatus } from '@shared/store/UI/reducer';
import React, { FC } from 'react';
import { AnimationFrameAcquisitionDateDisplay } from './AnimationFrameAcquisitionDateDisplay';
import { useAppSelector } from '@shared/store/configureStore';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';

type Props = {
    animationStatus: AnimationStatus;
};

export const AnimationFrameAcquisitionDateDisplayContainer: FC<Props> = ({
    animationStatus,
}) => {
    const queryParamsOfActiveFrame = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const acquisitionDate = queryParamsOfActiveFrame?.acquisitionDate ?? '';

    if (!acquisitionDate) {
        return null;
    }

    return (
        <AnimationFrameAcquisitionDateDisplay
            animationStatus={animationStatus}
            acquisitionDate={acquisitionDate}
        />
    );
};
