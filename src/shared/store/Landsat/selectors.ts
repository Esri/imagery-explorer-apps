import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectAvailableScenes = createSelector(
    (state: RootState) => state.Landsat.availableScenes,
    (availableScenes) => {
        const { objectIds, byObjectId } = availableScenes;
        return objectIds.map((objectId) => byObjectId[objectId]);
    }
);

export const selectAvailableScenesByObjectId = createSelector(
    (state: RootState) => state.Landsat.availableScenes,
    (availableScenes) => {
        const { byObjectId } = availableScenes;
        return byObjectId;
    }
);

export const selectLandsatMissionsToBeExcluded = createSelector(
    (state: RootState) => state.Landsat.missionsToBeExcluded,
    (missionsToBeExcluded) => missionsToBeExcluded
);
