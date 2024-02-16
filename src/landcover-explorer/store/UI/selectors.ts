import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectShowInfoPanel = createSelector(
    (state: RootState) => state.UI.showInfoPanel,
    (showInfoPanel) => showInfoPanel
);

export const selectShowDownloadPanel = createSelector(
    (state: RootState) => state.UI.showDownloadPanel,
    (showDownloadPanel) => showDownloadPanel
);

export const selectTooltipXPosition = createSelector(
    (state: RootState) => state.UI.tooltipXPosition,
    (tooltipXPosition) => tooltipXPosition
);

export const selectTooltipData = createSelector(
    (state: RootState) => state.UI.tooltipData,
    (tooltipData) => tooltipData
);

export const selectShowSwipeWidgetYearIndicator = createSelector(
    (state: RootState) => state.UI.showSwipeWidgetYearIndicator,
    (showSwipeWidgetYearIndicator) => showSwipeWidgetYearIndicator
);

export const selectShouldHideControlPanel = createSelector(
    (state: RootState) => state.UI.hideControlPanel,
    (hideControlPanel) => hideControlPanel
);

export const selectAnimationMode = createSelector(
    (state: RootState) => state.UI.animationMode,
    (animationMode) => animationMode
);

export const selectShowAboutThisApp = createSelector(
    (state: RootState) => state.UI.showAboutThisApp,
    (showAboutThisApp) => showAboutThisApp
);

export const selectShowSaveWebMap = createSelector(
    (state: RootState) => state.UI.showSaveWebMap,
    (showSaveWebMap) => showSaveWebMap
);
