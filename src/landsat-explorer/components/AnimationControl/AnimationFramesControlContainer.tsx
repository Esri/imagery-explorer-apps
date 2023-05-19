import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
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
import { selectedAnimationFrameIdChanged } from '../../../shared/store/Landsat/reducer';
import { formattedDateString2Unixtimestamp } from '../../../shared/utils/snippets/formatDateString';

export const AnimationFramesControlContainer = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

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

        const framesInfo = queryParams4ScenesInAnimateMode.map((d) => {
            const { animationFrameId, acquisitionDate, rasterFunctionName } = d;

            return {
                frameId: animationFrameId,
                acquisitionDate: acquisitionDate || 'date not selected',
                rasterFunctionName,
                selected: animationFrameId === selectedAnimationFrameId,
            } as AnimationFrameInfo;
        });

        framesInfo.sort((a, b) => {
            // if both frame has selected acquisition date, sort using selected acquisition date
            if (a.acquisitionDate && b.acquisitionDate) {
                return (
                    formattedDateString2Unixtimestamp(a.acquisitionDate) -
                    formattedDateString2Unixtimestamp(b.acquisitionDate)
                );
            }
            // put `a` before `b` if `a` has a selected acquisition date
            else if (a.acquisitionDate) {
                return -1;
            }
            // put `b` before `a` if `b` has a selected acquisition date
            else if (b.acquisitionDate) {
                return 1;
            } else {
                return 0;
            }
        });

        return framesInfo;
    }, [queryParams4ScenesInAnimateMode, selectedAnimationFrameId]);

    if (mode !== 'animate') {
        return null;
    }

    return (
        <AnimationFramesControl
            data={data}
            frameOnSelect={(frameId: string) => {
                // select a scene
                dispatch(selectedAnimationFrameIdChanged(frameId));
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
