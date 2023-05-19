import React from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationStatus } from '../../../shared/store/UI/selectors';
import { useDispatch } from 'react-redux';
import { AnimationStatusControl } from '../../../shared/components/AnimationStatusControl';
import { animationStatusChanged } from '../../../shared/store/UI/reducer';
import {
    selectAppMode,
    selectSelectedAnimationFrameId,
} from '../../../shared/store/Landsat/selectors';

export const AnimationStatusControlContainer = () => {
    const dispatch = useDispatch();

    const animationStatus = useSelector(selectAnimationStatus);

    const mode = useSelector(selectAppMode);

    const selectedAnimationFrameId = useSelector(
        selectSelectedAnimationFrameId
    );

    if (mode !== 'animate' || !selectedAnimationFrameId) {
        return null;
    }

    return (
        <AnimationStatusControl
            status={animationStatus}
            statusOnChange={(status) => {
                dispatch(animationStatusChanged(status));
            }}
        />
    );
};
