import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSpectralIndex4ChangeCompareTool = createSelector(
    (state: RootState) => state.ChangeCompareTool.spectralIndex,
    (spectralIndex) => spectralIndex
);

// export const selectSpectralProfileToolState = createSelector(
//     (state: RootState) => state.SpectralProfileTool,
//     (SpectralProfileTool) => SpectralProfileTool
// );
