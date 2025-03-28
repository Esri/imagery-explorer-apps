/* Copyright 2025 Esri
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

export const selectIsAnimationPlaying = createSelector(
    (state: RootState) => state.UI.animationStatus,
    (state: RootState) => state.Map.autoSwipeStatus,
    (animationStatus, autoSwipeStatus) =>
        animationStatus !== null || autoSwipeStatus !== null
);

export const selectAnimationSpeed = (state: RootState) =>
    state.UI.animationSpeed;

export const selectTooltipXPosition = (state: RootState) =>
    state.UI.tooltipXPosition;

export const selectTooltipData = (state: RootState) => state.UI.tooltipData;

export const selectShouldShowDownloadAnimationPanel = (state: RootState) =>
    state.UI.showDownloadAnimationPanel;

export const selectKeyOfSelectedInterestingPlace = (state: RootState) =>
    state.UI.keyOfSelectedInterestingPlace;

export const selectShowDownloadPanel = (state: RootState) =>
    state.UI.showDownloadPanel;

export const selectShowSaveWebMapPanel = (state: RootState) =>
    state.UI.showSaveWebMapPanel;

export const selectAnimationLinkIsCopied = (state: RootState) =>
    state.UI.animationLinkIsCopied;

export const selectShouldShowDocPanel = (state: RootState) =>
    state.UI.showDocPanel;

export const selectShowSavePanel = (state: RootState) => state.UI.showSavePanel;

export const selectHideBottomPanel = (state: RootState) =>
    state.UI.hideBottomPanel;

export const selectShouldShowAboutThisApp = (state: RootState) =>
    state.UI.shouldShowAboutThisApp;

export const selectAnimationStatus = (state: RootState) =>
    state.UI.animationStatus;
