import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAppMode,
    selectAvailableScenes,
    selectLandsatMissionsToBeExcluded,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useDispatch } from 'react-redux';
import {
    queryAvailableScenes,
    updateObjectIdOfSelectedScene,
} from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';

/**
 * This custom hook queries the landsat service and find landsat scenes
 * that were acquired within the selected year and intersect with the center of the map screen
 * @returns
 */
const useAvailableScenes = (acquisitionYear: number) => {
    const dispatch = useDispatch();

    const { acquisitionDate } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const missionsToBeExcluded = useSelector(selectLandsatMissionsToBeExcluded);

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    /**
     * available landsat scenes that intersect with input map geometry and were acquired during the input year.
     */
    const availableScenes = useSelector(selectAvailableScenes);

    useEffect(() => {
        if (!center || !acquisitionYear) {
            return;
        }

        if (isAnimationPlaying) {
            return;
        }

        dispatch(queryAvailableScenes(acquisitionYear));
    }, [center, acquisitionYear, isAnimationPlaying, missionsToBeExcluded]);

    useEffect(() => {
        // It is unnecessary to update the object ID of the selected scene while the animation is playing.
        // This is because the available scenes associated with each animation frame do not get updated during animation playback.
        // Moreover, when the animation is playing, the map center or acquisition date cannot be changed.
        // Therefore, the object ID of the Landsat scene for each animation frame remains fixed, eliminating the need for updating it.
        if (isAnimationPlaying) {
            return;
        }

        // we should try to find a scene that was acquired from the selected acquisition date
        // whenever the available scenes and acquisition date changes
        const selectedScene = availableScenes.find(
            (d) => d.formattedAcquisitionDate === acquisitionDate
        );

        dispatch(
            updateObjectIdOfSelectedScene(selectedScene?.objectId || null)
        );
    }, [availableScenes, acquisitionDate, isAnimationPlaying]);

    return {
        availableScenes,
    };
};

export default useAvailableScenes;
