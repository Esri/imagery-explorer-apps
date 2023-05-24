import React, { useMemo } from 'react';
import { AnimationFrameInfo } from '@shared/components/AnimationControl';
import { useSelector } from 'react-redux';
import {
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
} from '@shared/store/Landsat/selectors';
import { sortQueryParams4ScenesByAcquisitionDate } from './helpers';

export const useAnimationFramesInfo = () => {
    const selectedAnimationFrameId = useSelector(
        selectSelectedAnimationFrameId
    );

    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    const data: AnimationFrameInfo[] = useMemo(() => {
        if (!queryParams4ScenesInAnimationMode.length) {
            return [];
        }

        // get frame infos that are sorted using the acquisition date
        const framesInfo = sortQueryParams4ScenesByAcquisitionDate(
            queryParams4ScenesInAnimationMode
        ).map((d) => {
            const { animationFrameId, acquisitionDate, rasterFunctionName } = d;

            return {
                frameId: animationFrameId,
                acquisitionDate: acquisitionDate || 'date not selected',
                rasterFunctionName,
                selected: animationFrameId === selectedAnimationFrameId,
            } as AnimationFrameInfo;
        });

        return framesInfo;
    }, [queryParams4ScenesInAnimationMode, selectedAnimationFrameId]);

    return data;
};
