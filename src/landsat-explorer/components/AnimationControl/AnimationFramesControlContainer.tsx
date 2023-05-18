import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4ScenesInAnimateMode,
} from '../../../shared/store/Landsat/selectors';
import {
    AnimationFramesControl,
    AnimationFrameInfo,
} from '../../../shared/components/AnimationFramesControl';
import { useDispatch } from 'react-redux';
import {
    addAnimationFrame,
    removeAnimationFrame,
} from '../../../shared/store/Landsat/thunks';
import { frameIdOfSelectedQueryParams4AnimateModeChanged } from '../../../shared/store/Landsat/reducer';

export const AnimationFramesControlContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const queryParams4ScenesInAnimateMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    const data: AnimationFrameInfo[] = useMemo(() => {
        if (!queryParams4ScenesInAnimateMode.length) {
            return [];
        }

        return queryParams4ScenesInAnimateMode.map((d) => {
            const { animationFrameId, acquisitionDate, rasterFunctionName } = d;

            return {
                frameId: animationFrameId,
                acquisitionDate: acquisitionDate || 'date not selected',
                rasterFunctionName,
            } as AnimationFrameInfo;
        });
    }, [queryParams4ScenesInAnimateMode]);

    if (mode !== 'animate') {
        return null;
    }

    return (
        <AnimationFramesControl
            data={data}
            frameOnSelect={(frameId: string) => {
                // select a scene
                dispatch(
                    frameIdOfSelectedQueryParams4AnimateModeChanged(frameId)
                );
            }}
            addButtonOnClick={() => {
                // add scene
                dispatch(addAnimationFrame());
            }}
            removeButtonOnClick={(frameId: string) => {
                // remove scene
                dispatch(removeAnimationFrame(frameId));
            }}
        />
    );
};
