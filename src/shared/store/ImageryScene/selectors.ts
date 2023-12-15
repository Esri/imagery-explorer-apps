import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryParams4SceneInSelectedMode = createSelector(
    (state: RootState) => state.ImageryScenes.mode,
    (state: RootState) => state.ImageryScenes.queryParams4MainScene,
    (state: RootState) => state.ImageryScenes.queryParams4SecondaryScene,
    (state: RootState) => state.ImageryScenes.queryParamsList,
    (state: RootState) => state.ImageryScenes.isSecondarySceneActive,
    (state: RootState) => state.ImageryScenes.queryParamsList.selectedItemID,
    (state: RootState) => state.ImageryScenes.tool,
    // (state: RootState) => state.ChangeCompareTool.activeScene,
    (
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParamsList,
        isSecondarySceneActive,
        selectedItemID,
        activeAnalysisTool
        // activeSceneInChangeCompareTool
    ) => {
        if (mode === 'find a scene' || mode === 'dynamic') {
            return queryParams4MainScene;
        }

        if (mode === 'analysis') {
            if (activeAnalysisTool !== 'change') {
                return queryParams4MainScene;
            }

            // when in 'change compare' tool, we need to find the query params based on selected scene
            return isSecondarySceneActive
                ? queryParams4SecondaryScene
                : queryParams4MainScene;
        }

        if (mode === 'swipe') {
            return isSecondarySceneActive
                ? queryParams4SecondaryScene
                : queryParams4MainScene;
        }

        if (mode === 'animate' || mode === 'spectral sampling') {
            return queryParamsList.byId[selectedItemID] || null;
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

export const selectIsSecondarySceneActive = createSelector(
    (state: RootState) => state.ImageryScenes.isSecondarySceneActive,
    (isSecondarySceneActive) => isSecondarySceneActive
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
    (state: RootState) => state.ImageryScenes.queryParamsList,
    (queryParamsList) => {
        const { byId, ids } = queryParamsList;
        return ids.map((id) => byId[id]);
    }
);

export const selectSelectedItemFromListOfQueryParams = createSelector(
    (state: RootState) => state.ImageryScenes.queryParamsList,
    (state: RootState) => state.ImageryScenes.queryParamsList.selectedItemID,
    (queryParamsList, selectedItemID) => {
        const { byId } = queryParamsList;
        return byId[selectedItemID];
    }
);

export const selectIdOfSelectedItemInListOfQueryParams = createSelector(
    (state: RootState) => state.ImageryScenes.queryParamsList.selectedItemID,
    (selectedItemID) => selectedItemID
);

export const selectCloudCover = createSelector(
    (state: RootState) => state.ImageryScenes.cloudCover,
    (cloudCover) => cloudCover
);

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.ImageryScenes.tool,
    (tool) => tool
);
