import {
    ImageryServiceTimeExtentData,
    RasterFunctionInfo,
} from '@typing/imagery-service';
import { ImageryServiceState, initialImageryServiceState } from './reducer';

export const getPreloadedState4ImageryService = (
    timeExtent: ImageryServiceTimeExtentData,
    rasterFunctionInfo: RasterFunctionInfo[]
): ImageryServiceState => {
    return {
        ...initialImageryServiceState,
        timeExtent,
        rasterFunctionInfo: rasterFunctionInfo || [],
    };
};
