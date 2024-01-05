import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useDispatch } from 'react-redux';
// import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { queryAvailableScenes } from '@shared/store/Landsat/thunks';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
// import { selectAcquisitionYear } from '@shared/store/ImageryScene/selectors';

/**
 * This custom hook queries the landsat service and find landsat scenes
 * that were acquired within the selected year and intersect with the center of the map screen
 * @returns
 */
export const useQueryAvailableLandsatScenes = (): void => {
    const dispatch = useDispatch();

    // const acquisitionYear = useSelector(selectAcquisitionYear);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDateRange = queryParams?.acquisitionDateRange;

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    useEffect(() => {
        if (!center || !acquisitionDateRange) {
            return;
        }

        if (isAnimationPlaying) {
            return;
        }

        dispatch(queryAvailableScenes(acquisitionDateRange));
    }, [
        center,
        acquisitionDateRange,
        isAnimationPlaying,
        missionsToBeExcluded,
    ]);

    return null;
};
