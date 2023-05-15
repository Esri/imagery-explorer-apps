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

export const selectAppMode = createSelector(
    (state: RootState) => state.UI.appMode,
    (appMode) => appMode
);
