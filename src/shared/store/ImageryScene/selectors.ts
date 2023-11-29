import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryParams4SceneInSelectedMode = createSelector(
    (state: RootState) => state.ImageryScenes.mode,
    (state: RootState) => state.ImageryScenes.queryParams4MainScene,
    (state: RootState) => state.ImageryScenes.queryParams4SecondaryScene,
    (state: RootState) => state.ImageryScenes.queryParams4ScenesInAnimateMode,
    (state: RootState) => state.ImageryScenes.selectedSide4SwipeMode,
    (state: RootState) => state.ImageryScenes.selectedAnimationFrameId,
    (state: RootState) => state.ImageryScenes.tool,
    (state: RootState) => state.ChangeCompareTool.activeScene,
    (
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParams4ScenesInAnimateMode,
        selectedSide4SwipeMode,
        selectedAnimationFrameId,
        activeAnalysisTool,
        activeSceneInChangeCompareTool
    ) => {
        if (mode === 'find a scene' || mode === 'dynamic') {
            return queryParams4MainScene;
        }

        if (mode === 'analysis') {
            // analysis tools other than 'change compare' should always use the main scene
            if (activeAnalysisTool !== 'change') {
                return queryParams4MainScene;
            }

            // when in 'change compare' tool, we need to find the query params based on selected scene
            return activeSceneInChangeCompareTool === 'scene a'
                ? queryParams4MainScene
                : queryParams4SecondaryScene;
        }

        if (mode === 'swipe') {
            return selectedSide4SwipeMode === 'left'
                ? queryParams4MainScene
                : queryParams4SecondaryScene;
        }

        if (mode === 'animate') {
            return (
                queryParams4ScenesInAnimateMode.byFrameId[
                    selectedAnimationFrameId
                ] || null
            );
        }

        return null;
    }
);

export const selectQueryParams4MainScene = createSelector(
    (state: RootState) => state.ImageryScenes.queryParams4MainScene,
    (queryParams4MainScene) => queryParams4MainScene
);

export const selectQueryParams4SecondaryScene = createSelector(
    (state: RootState) => state.ImageryScenes.queryParams4SecondaryScene,
    (queryParams4SecondaryScene) => queryParams4SecondaryScene
);

export const selectSelectedSideOfSwipeMode = createSelector(
    (state: RootState) => state.ImageryScenes.selectedSide4SwipeMode,
    (selectedSide4SwipeMode) => selectedSide4SwipeMode
);

export const selectAppMode = createSelector(
    (state: RootState) => state.ImageryScenes.mode,
    (mode) => mode
);

export const selectIsSwipeModeOn = createSelector(
    (state: RootState) => state.ImageryScenes.mode,
    (mode) => mode === 'swipe'
);

export const selectQueryParams4ScenesInAnimateMode = createSelector(
    (state: RootState) => state.ImageryScenes.queryParams4ScenesInAnimateMode,
    (queryParams4ScenesInAnimateMode) => {
        const { byFrameId, frameIds } = queryParams4ScenesInAnimateMode;
        return frameIds.map((id) => byFrameId[id]);
    }
);

export const selectQueryParamsOfPreviousAnimationFrame = createSelector(
    (state: RootState) => state.ImageryScenes.queryParams4MainScene,
    (state: RootState) => state.ImageryScenes.queryParams4ScenesInAnimateMode,
    (state: RootState) => state.ImageryScenes.selectedAnimationFrameId,
    (
        queryParams4MainScene,
        queryParams4ScenesInAnimateMode,
        selectedAnimationFrameId
    ) => {
        const { byFrameId } = queryParams4ScenesInAnimateMode;
        return byFrameId[selectedAnimationFrameId] || queryParams4MainScene;
    }
);

export const selectSelectedAnimationFrameId = createSelector(
    (state: RootState) => state.ImageryScenes.selectedAnimationFrameId,
    (selectedAnimationFrameId) => selectedAnimationFrameId
);

export const selectCloudCover = createSelector(
    (state: RootState) => state.ImageryScenes.cloudCover,
    (cloudCover) => cloudCover
);

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.ImageryScenes.tool,
    (tool) => tool
);
