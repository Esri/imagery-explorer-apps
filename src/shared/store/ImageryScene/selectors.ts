/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    (
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParamsList,
        isSecondarySceneActive,
        selectedItemID,
        activeAnalysisTool
    ) => {
        if (mode === 'find a scene' || mode === 'dynamic') {
            return queryParams4MainScene;
        }

        if (mode === 'analysis') {
            // when in 'change compare' tool, we need to find the query params based on selected scene
            if (activeAnalysisTool === 'change') {
                return isSecondarySceneActive
                    ? queryParams4SecondaryScene
                    : queryParams4MainScene;
            }

            // For the 'temporal composite' tool, there are three items in queryParamsList that represent the imagery scenes
            // to be used for the red, green, and blue bands in that respective order.
            // The queryParamsList and selectedItemID are configured by the `initiateImageryScenes4TemporalCompositeTool` thunk function.
            if (activeAnalysisTool === 'temporal composite') {
                return queryParamsList.byId[selectedItemID] || null;
            }

            return queryParams4MainScene;
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

// export const selectAcquisitionYear = createSelector(
//     (state: RootState) => state.ImageryScenes.acquisitionYear,
//     (acquisitionYear) => acquisitionYear
// );

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.ImageryScenes.tool,
    (tool) => tool
);

export const selectAvailableScenes = createSelector(
    (state: RootState) => state.ImageryScenes.availableImageryScenes,
    (availableImageryScenes) => {
        const { objectIds, byObjectId } = availableImageryScenes;
        return objectIds.map((objectId) => byObjectId[objectId]);
    }
);
