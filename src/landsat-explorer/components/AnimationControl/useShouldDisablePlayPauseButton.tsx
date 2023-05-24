import { selectQueryParams4ScenesInAnimateMode } from '@shared/store/Landsat/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { filterQueryParams4ScenesByAcquisitionDate } from './helpers';

export const useShouldDisablePlayPauseButton = () => {
    const queryParams4ScenesInAnimationMode = useSelector(
        selectQueryParams4ScenesInAnimateMode
    );

    /**
     * if true, the Animation Status Control Component will be diabled
     */
    const shouldDisablePlayPauseButton = useMemo(() => {
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

    return shouldDisablePlayPauseButton;
};
