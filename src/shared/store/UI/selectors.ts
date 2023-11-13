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
    (state: RootState) => state.UI.shouldShowDownloadAnimationPanel,
    (shouldShowDownloadAnimationPanel) => shouldShowDownloadAnimationPanel
);
