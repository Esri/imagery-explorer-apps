import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectImageryServiceTimeExtent = (state: RootState) =>
    state.ImageryService.timeExtent;

export const selectImageryServiceRasterFunctionInfo = (state: RootState) =>
    state.ImageryService.rasterFunctionInfo;

export const selectImageryServiceRasterFunctionLabelMap = createSelector(
    (state: RootState) => state.ImageryService.rasterFunctionInfo,
    (rasterFunctionInfo) => {
        const rasterFunctionLabelMap = new Map();

        if (!rasterFunctionInfo) return rasterFunctionLabelMap;

        for (const { name, label } of rasterFunctionInfo) {
            rasterFunctionLabelMap.set(name, label);
        }

        return rasterFunctionLabelMap;
    }
);
