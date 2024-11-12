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

export const selectHideBottomPanel = createSelector(
    (state: RootState) => state.UI.hideBottomPanel,
    (hideBottomPanel) => hideBottomPanel
);

export const selectShouldShowAboutThisApp = createSelector(
    (state: RootState) => state.UI.shouldShowAboutThisApp,
    (shouldShowAboutThisApp) => shouldShowAboutThisApp
);

export const selectAnimationStatus = createSelector(
    (state: RootState) => state.UI.animationStatus,
    (animationStatus) => animationStatus
);

export const selectIsAnimationPlaying = createSelector(
    (state: RootState) => state.UI.animationStatus,
    (animationStatus) => animationStatus !== null
);

export const selectAnimationSpeed = createSelector(
    (state: RootState) => state.UI.animationSpeed,
    (animationSpeed) => animationSpeed
);

export const selectTooltipXPosition = createSelector(
    (state: RootState) => state.UI.tooltipXPosition,
    (tooltipXPosition) => tooltipXPosition
);

export const selectTooltipData = createSelector(
    (state: RootState) => state.UI.tooltipData,
    (tooltipData) => tooltipData
);

export const selectShouldShowDownloadAnimationPanel = createSelector(
    (state: RootState) => state.UI.showDownloadAnimationPanel,
    (showDownloadAnimationPanel) => showDownloadAnimationPanel
);

export const selectNameOfSelectedInterestingPlace = createSelector(
    (state: RootState) => state.UI.nameOfSelectedInterestingPlace,
    (nameOfSelectedInterestingPlace) => nameOfSelectedInterestingPlace
);

export const selectShowDownloadPanel = createSelector(
    (state: RootState) => state.UI.showDownloadPanel,
    (showDownloadPanel) => showDownloadPanel
);

export const selectShowSaveWebMapPanel = createSelector(
    (state: RootState) => state.UI.showSaveWebMapPanel,
    (showSaveWebMapPanel) => showSaveWebMapPanel
);

export const selectAnimationLinkIsCopied = createSelector(
    (state: RootState) => state.UI.animationLinkIsCopied,
    (animationLinkIsCopied) => animationLinkIsCopied
);

export const selectShouldShowDocPanel = createSelector(
    (state: RootState) => state.UI.showDocPanel,
    (showDocPanel) => showDocPanel
);

export const selectShowSavePanel = createSelector(
    (state: RootState) => state.UI.showSavePanel,
    (showSavePanel) => showSavePanel
);
