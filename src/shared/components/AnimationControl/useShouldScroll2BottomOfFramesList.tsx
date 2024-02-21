import React, { useEffect, useState } from 'react';
import { useAnimationFramesInfo } from './useAnimationFramesInfo';
import { usePrevious } from '@shared/hooks/usePrevious';

export const useShouldScroll2BottomOfFramesList = () => {
    const animationFramesData = useAnimationFramesInfo();

    const prevVal = usePrevious(animationFramesData?.length);

    const [shouldScroll2Bottom, setShouldScroll2Bottom] =
        useState<boolean>(false);

    useEffect(() => {
        if (!animationFramesData?.length || !prevVal) {
            return;
        }

        console.log(animationFramesData?.length > prevVal);
        setShouldScroll2Bottom(animationFramesData?.length > prevVal);
    }, [animationFramesData?.length]);

    return shouldScroll2Bottom;
};
