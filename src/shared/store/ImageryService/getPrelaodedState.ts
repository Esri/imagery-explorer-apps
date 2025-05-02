import {
    ImageryServiceTimeExtentData,
    RasterFunctionInfo,
} from '@typing/imagery-service';
import { ImageryServiceState, initialImageryServiceState } from './reducer';
import { getRasterFunctionLabelMap } from './helpers';

export const getPreloadedState4ImageryService = (
    timeExtent: ImageryServiceTimeExtentData,
    rasterFunctionInfo: RasterFunctionInfo[]
): ImageryServiceState => {
    return {
        ...initialImageryServiceState,
        timeExtent,
        rasterFunctionInfo: rasterFunctionInfo || [],
        rasterFunctionLabelMap: getRasterFunctionLabelMap(rasterFunctionInfo),
    };
};
