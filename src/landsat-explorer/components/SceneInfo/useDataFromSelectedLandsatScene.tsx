import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAvailableScenesByObjectId,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import { LandsatScene } from '@typing/imagery-service';

export const useDataFromSelectedLandsatScene = () => {
    /**
     * Save/cache Landsat scene data using the object ID as the key.
     * Why is it necessary to do this? The reason is that the `availableScenesByObjectId` does not get updated during animation playback.
     * As a result, it may not contain data for the Landsat scene associated with the animation frame. However, we still want to populate
     * the scene information for each animation frame. Therefore, it is a good idea to retrieve the cached data from this map.
     */
    const landsatSceneByObjectId: Map<number, LandsatScene> = useMemo(() => {
        return new Map();
    }, []);

    const queryParams4SelectedScene = useSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const availableScenesByObjectId = useSelector(
        selectAvailableScenesByObjectId
    );

    const landsatScene = useMemo(() => {
        const objectId = queryParams4SelectedScene?.objectIdOfSelectedScene;

        if (!objectId) {
            return null;
        }

        if (landsatSceneByObjectId.has(objectId)) {
            return landsatSceneByObjectId.get(objectId);
        }

        const data = availableScenesByObjectId[objectId] as LandsatScene;

        landsatSceneByObjectId.set(objectId, { ...data });

        return data;
    }, [queryParams4SelectedScene, availableScenesByObjectId]);

    return landsatScene;
};
