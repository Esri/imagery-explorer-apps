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

export const selectShowInfoPanel = createSelector(
    (state: RootState) => state.LandcoverUI.showInfoPanel,
    (showInfoPanel) => showInfoPanel
);

export const selectShowDownloadPanel = createSelector(
    (state: RootState) => state.LandcoverUI.showDownloadPanel,
    (showDownloadPanel) => showDownloadPanel
);

export const selectTooltipXPosition = createSelector(
    (state: RootState) => state.LandcoverUI.tooltipXPosition,
    (tooltipXPosition) => tooltipXPosition
);

export const selectTooltipData = createSelector(
    (state: RootState) => state.LandcoverUI.tooltipData,
    (tooltipData) => tooltipData
);

export const selectShowSwipeWidgetYearIndicator = createSelector(
    (state: RootState) => state.LandcoverUI.showSwipeWidgetYearIndicator,
    (showSwipeWidgetYearIndicator) => showSwipeWidgetYearIndicator
);

// export const selectShouldHideControlPanel = createSelector(
//     (state: RootState) => state.LandcoverUI.hideControlPanel,
//     (hideControlPanel) => hideControlPanel
// );

export const selectAnimationMode = createSelector(
    (state: RootState) => state.LandcoverUI.animationMode,
    (animationMode) => animationMode
);

// export const selectShowAboutThisApp = createSelector(
//     (state: RootState) => state.LandcoverUI.showAboutThisApp,
//     (showAboutThisApp) => showAboutThisApp
// );

export const selectShowSaveWebMap = createSelector(
    (state: RootState) => state.LandcoverUI.showSaveWebMap,
    (showSaveWebMap) => showSaveWebMap
);
