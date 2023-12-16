import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAvailableScenes,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { useDispatch } from 'react-redux';
import { updateObjectIdOfSelectedScene } from '@shared/store/ImageryScene/thunks';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';

/**
 * This custom hooks tries to find the selected scene that was acquired from the selected acquisition date
 * whenever the available scenes and acquisition date changes
 */
export const useFindSelectedSceneByDate = (): void => {
    const dispatch = useDispatch();

    const { acquisitionDate } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    /**
     * available imagery scenes that intersect with input map geometry and were acquired during the input year.
     */
    const availableScenes = useSelector(selectAvailableScenes);

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
};
