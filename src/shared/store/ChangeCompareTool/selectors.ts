import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSpectralIndex4ChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.spectralIndex,
    (spectralIndex) => spectralIndex
);

export const selectActiveScene4ChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.activeScene,
    (activeScene) => activeScene
);

export const selectChangeCompareLayerIsOn = createSelector(
    (state: RootState) => state.ChangeCompareTool.changeCompareLayerIsOn,
    (changeCompareLayerIsOn) => changeCompareLayerIsOn
);

export const selectUserSelectedRangeInChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.selectedRange,
    (selectedRange) => selectedRange
);

export const selectChangeCompareToolState = createSelector(
    (state: RootState) => state.ChangeCompareTool,
    (ChangeCompareTool) => ChangeCompareTool
);
