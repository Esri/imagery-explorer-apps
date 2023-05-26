import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAvailableScenes,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import { selectMapCenter } from '@shared/store/Map/selectors';
import { useDispatch } from 'react-redux';
import {
    queryAvailableScenes,
    updateObjectIdOfSelectedScene,
} from '@shared/store/Landsat/thunks';

/**
 * This custom hook queries the landsat service and find landsat scenes
 * that were acquired within the selected year and intersect with the center of the map screen
 * @returns
 */
const useAvailableScenes = (acquisitionYear: number) => {
    const dispatch = useDispatch();

    const { acquisitionDate } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    /**
     * available landsat scenes that intersect with input map geometry and were acquired during the input year.
     */
    const availableScenes = useSelector(selectAvailableScenes);

    useEffect(() => {
        if (center && acquisitionYear) {
            dispatch(queryAvailableScenes(acquisitionYear));
        }
    }, [center, acquisitionYear]);

    useEffect(() => {
        // we should try to find a scene that was acquired from the selected acquisition date
        // whenever the available scenes and acquisition date changes
        const selectedScene = availableScenes.find(
            (d) => d.formattedAcquisitionDate === acquisitionDate
        );
        dispatch(
            updateObjectIdOfSelectedScene(selectedScene?.objectId || null)
        );
    }, [availableScenes, acquisitionDate]);

    return {
        availableScenes,
    };
};

export default useAvailableScenes;
