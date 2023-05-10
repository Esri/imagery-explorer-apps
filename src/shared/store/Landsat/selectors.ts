import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectLandsatRasterFunction = createSelector(
    (state: RootState) => state.Landsat.rasterFunctionName,
    (rasterFunctionName) => rasterFunctionName
);
