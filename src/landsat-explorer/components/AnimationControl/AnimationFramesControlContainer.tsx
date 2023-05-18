import React from 'react';
import { useSelector } from 'react-redux';
import { selectAppMode } from '../../../shared/store/Landsat/selectors';
import { AnimationFramesControl } from '../../../shared/components/AnimationFramesControl';

export const AnimationFramesControlContainer = () => {
    const mode = useSelector(selectAppMode);

    if (mode !== 'animate') {
        return null;
    }

    return <AnimationFramesControl />;
};
