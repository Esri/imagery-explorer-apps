import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import {
    selectAvailableScenesByObjectId,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/Landsat/selectors';
import { LandsatScene } from '@typing/imagery-service';

const landsatSceneByObjectId: Map<number, LandsatScene> = new Map();

export const useDataFromSelectedLandsatScene = () => {
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
