import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryParams4SceneInSelectedMode = createSelector(
    (state: RootState) => state.Landsat.mode,
    (state: RootState) => state.Landsat.queryParams4MainScene,
    (state: RootState) => state.Landsat.queryParams4SecondaryScene,
    (state: RootState) => state.Landsat.queryParams4ScenesInAnimateMode,
    (state: RootState) => state.Landsat.selectedSide4SwipeMode,
    (state: RootState) =>
        state.Landsat.frameIdOfSelectedQueryParams4AnimateMode,
    (
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParams4ScenesInAnimateMode,
        selectedSide4SwipeMode,
        frameIdOfSelectedQueryParams4AnimateMode
    ) => {
        if (mode === 'find a scene') {
            return queryParams4MainScene;
        }

        if (mode === 'swipe') {
            return selectedSide4SwipeMode === 'left'
                ? queryParams4MainScene
                : queryParams4SecondaryScene;
        }

        if (mode === 'animate') {
            return (
                queryParams4ScenesInAnimateMode.byFrameId[
                    frameIdOfSelectedQueryParams4AnimateMode
                ] || {}
            );
        }

        return {};
    }
);

export const selectQueryParams4SceneOnLeftSideOfSwipeMode = createSelector(
    (state: RootState) => state.Landsat.queryParams4MainScene,
    (queryParams4MainScene) => queryParams4MainScene
);

export const selectQueryParams4SceneOnRightSideOfSwipeMode = createSelector(
    (state: RootState) => state.Landsat.queryParams4SecondaryScene,
    (queryParams4SecondaryScene) => queryParams4SecondaryScene
);

export const selectSelectedSideOfSwipeMode = createSelector(
    (state: RootState) => state.Landsat.selectedSide4SwipeMode,
    (selectedSide4SwipeMode) => selectedSide4SwipeMode
);

export const selectAppMode = createSelector(
    (state: RootState) => state.Landsat.mode,
    (mode) => mode
);

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
