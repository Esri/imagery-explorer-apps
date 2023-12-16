import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

// export const selectLandsatScenes = createSelector(
//     (state: RootState) => state.Landsat.landsatScenes,
//     (landsatScenes) => {
//         const { objectIds, byObjectId } = landsatScenes;
//         return objectIds.map((objectId) => byObjectId[objectId]);
//     }
// );

export const selectAvailableScenesByObjectId = createSelector(
    (state: RootState) => state.Landsat.landsatScenes.byObjectId,
    (byObjectId) => byObjectId
);

export const selectLandsatMissionsToBeExcluded = createSelector(
    (state: RootState) => state.Landsat.missionsToBeExcluded,
    (missionsToBeExcluded) => missionsToBeExcluded
);
