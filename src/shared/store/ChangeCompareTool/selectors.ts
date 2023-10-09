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

export const selectIsViewingChangeInChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.isViewingChange,
    (isViewingChange) => isViewingChange
);

// export const selectSpectralProfileToolState = createSelector(
//     (state: RootState) => state.SpectralProfileTool,
//     (SpectralProfileTool) => SpectralProfileTool
// );
