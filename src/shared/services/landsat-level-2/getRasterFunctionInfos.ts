import { RasterFunctionInfo } from '@typing/imagery-service';
import { LANDSAT_RASTER_FUNCTION_INFOS } from './config';

/**
 * Get raster function infos of the Landsat-2 Imagery Service
 * @returns
 */
export const getRasterFunctionInfos = (): RasterFunctionInfo[] => {
    const data = LANDSAT_RASTER_FUNCTION_INFOS.slice(0, 9);
    return data;
};
