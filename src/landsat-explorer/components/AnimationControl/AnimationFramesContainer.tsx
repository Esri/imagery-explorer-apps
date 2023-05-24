import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    // selectAppMode,
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
} from '@shared/store/Landsat/selectors';
import {
    AnimationFrames,
    AnimationFrameInfo,
} from '@shared/components/AnimationControl';
import { useDispatch } from 'react-redux';
import {
    // addAnimationFrame,
    removeAnimationFrame,
} from '@shared/store/Landsat/thunks';
import { selectedAnimationFrameIdChanged } from '@shared/store/Landsat/reducer';
import { sortQueryParams4ScenesByAcquisitionDate } from './helpers';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';

export const AnimationFramesContainer = () => {
    const dispatch = useDispatch();

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const queryParams4ScenesInAnimateMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    const selectedAnimationFrameId = useSelector(
        selectSelectedAnimationFrameId
    );

    const data: AnimationFrameInfo[] = useMemo(() => {
        if (!queryParams4ScenesInAnimateMode.length) {
            return [];
        }

        // get frame infos that are sorted using the acquisition date
        const framesInfo = sortQueryParams4ScenesByAcquisitionDate(
            queryParams4ScenesInAnimateMode
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
    }, [queryParams4ScenesInAnimateMode, selectedAnimationFrameId]);

    return (
        <AnimationFrames
            data={data}
            disabled={isAnimationPlaying}
            frameOnSelect={(frameId: string) => {
                // select a scene
                dispatch(selectedAnimationFrameIdChanged(frameId));
            }}
            removeButtonOnClick={(frameId: string) => {
                // remove scene
                dispatch(removeAnimationFrame(frameId));
            }}
        />
    );
};
