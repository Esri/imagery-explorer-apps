import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectHideBottomPanel = createSelector(
    (state: RootState) => state.UI.hideBottomPanel,
    (hideBottomPanel) => hideBottomPanel
);
