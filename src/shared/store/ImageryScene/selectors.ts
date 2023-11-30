import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryParams4SceneInSelectedMode = createSelector(
    (state: RootState) => state.ImageryScenes.mode,
    (state: RootState) => state.ImageryScenes.queryParams4MainScene,
    (state: RootState) => state.ImageryScenes.queryParams4SecondaryScene,
    (state: RootState) => state.ImageryScenes.listOfQueryParams,
    (state: RootState) => state.ImageryScenes.selectedSide4SwipeMode,
    (state: RootState) =>
        state.ImageryScenes.idOfSelectedItemInListOfQueryParams,
    (state: RootState) => state.ImageryScenes.tool,
    (state: RootState) => state.ChangeCompareTool.activeScene,
    (
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        listOfQueryParams,
        selectedSide4SwipeMode,
        idOfSelectedItemInListOfQueryParams,
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

        if (mode === 'animate' || mode === 'spectral sampling') {
            return (
                listOfQueryParams.byId[idOfSelectedItemInListOfQueryParams] ||
                null
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

export const selectListOfQueryParams = createSelector(
    (state: RootState) => state.ImageryScenes.listOfQueryParams,
    (listOfQueryParams4Scenes) => {
        const { byId, ids } = listOfQueryParams4Scenes;
        return ids.map((id) => byId[id]);
    }
);

export const selectSelectedItemFromListOfQueryParams = createSelector(
    (state: RootState) => state.ImageryScenes.listOfQueryParams,
    (state: RootState) =>
        state.ImageryScenes.idOfSelectedItemInListOfQueryParams,
    (listOfQueryParams4Scenes, idOfSelectedItemInListOfQueryParams) => {
        const { byId } = listOfQueryParams4Scenes;
        return byId[idOfSelectedItemInListOfQueryParams];
    }
);

export const selectIdOfSelectedItemInListOfQueryParams = createSelector(
    (state: RootState) =>
        state.ImageryScenes.idOfSelectedItemInListOfQueryParams,
    (idOfSelectedItemInListOfQueryParams) => idOfSelectedItemInListOfQueryParams
);

export const selectCloudCover = createSelector(
    (state: RootState) => state.ImageryScenes.cloudCover,
    (cloudCover) => cloudCover
);

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.ImageryScenes.tool,
    (tool) => tool
);
