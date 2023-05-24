import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { useDispatch } from 'react-redux';
import { AnimationControl } from '@shared/components/AnimationControl';
import {
    animationSpeedChanged,
    animationStatusChanged,
} from '@shared/store/UI/reducer';
import {
    selectAppMode,
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
} from '@shared/store/Landsat/selectors';
import { filterQueryParams4ScenesByAcquisitionDate } from './helpers';
import { AnimationFramesContainer } from './AnimationFramesContainer';
import { addAnimationFrame } from '@shared/store/Landsat/thunks';

export const AnimationControlContainer = () => {
    const dispatch = useDispatch();

    const animationStatus = useSelector(selectAnimationStatus);

    const mode = useSelector(selectAppMode);

    // const selectedAnimationFrameId = useSelector(
    //     selectSelectedAnimationFrameId
    // );

    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    /**
     * if true, the Animation Status Control Component will be diabled
     */
    const disabled = useMemo(() => {
        /**
         * find query params for scenes that have selected Acquisition Date
         */
        const filtered = filterQueryParams4ScenesByAcquisitionDate(
            queryParams4ScenesInAnimationMode
        );

        if (!filtered || !filtered.length) {
            return true;
        }

        return false;
    }, [queryParams4ScenesInAnimationMode]);

    if (mode !== 'animate') {
        return null;
    }

    return (
        <div>
            <AnimationFramesContainer />

            <AnimationControl
                status={animationStatus}
                disabled={disabled}
                addButtonOnClick={() => {
                    dispatch(addAnimationFrame());
                }}
                statusOnChange={(status) => {
                    dispatch(animationStatusChanged(status));
                }}
                speedOnChange={(speed) => {
                    dispatch(animationSpeedChanged(speed));
                }}
            />
        </div>
    );
};
