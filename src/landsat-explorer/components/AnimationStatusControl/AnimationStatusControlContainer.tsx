import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { selectAnimationStatus } from '../../../shared/store/UI/selectors';
import { useDispatch } from 'react-redux';
import { AnimationStatusControl } from '../../../shared/components/AnimationStatusControl';
import { animationStatusChanged } from '../../../shared/store/UI/reducer';
import {
    selectAppMode,
    selectQueryParams4ScenesInAnimateMode,
    selectSelectedAnimationFrameId,
} from '../../../shared/store/Landsat/selectors';
import { filterQueryParams4ScenesByAcquisitionDate } from '../AnimationFramesControl/helpers';

export const AnimationStatusControlContainer = () => {
    const dispatch = useDispatch();

    const animationStatus = useSelector(selectAnimationStatus);

    const mode = useSelector(selectAppMode);

    const selectedAnimationFrameId = useSelector(
        selectSelectedAnimationFrameId
    );

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

    if (mode !== 'animate' || !selectedAnimationFrameId) {
        return null;
    }

    return (
        <AnimationStatusControl
            status={animationStatus}
            disabled={disabled}
            statusOnChange={(status) => {
                dispatch(animationStatusChanged(status));
            }}
        />
    );
};
