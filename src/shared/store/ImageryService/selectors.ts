import { RootState } from '../configureStore';

export const selectImageryServiceTimeExtent = (state: RootState) =>
    state.ImageryService.timeExtent;

export const selectImageryServiceRasterFunctionInfo = (state: RootState) =>
    state.ImageryService.rasterFunctionInfo;

export const selectImageryServiceRasterFunctionLabelMap = (state: RootState) =>
    state.ImageryService.rasterFunctionLabelMap;
