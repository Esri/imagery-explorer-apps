import { LANDSAT_RASTER_FUNCTION_INFOS } from '../landsat/config';

let rasterFunctionLabelMap: Map<string, string> = null;

const initRasterFunctionLabelMap = () => {
    rasterFunctionLabelMap = new Map();

    const infos = [...LANDSAT_RASTER_FUNCTION_INFOS];

    for (const { name, label } of infos) {
        rasterFunctionLabelMap.set(name, label);
    }
};

/**
 * Get label text for a raster function for diplaying purpose.
 * @param rasterFunctionName name of the raster function
 * @returns {string} label associated with the raster function
 */
export const getRasterFunctionLabelText = (
    rasterFunctionName: string
): string => {
    if (!rasterFunctionLabelMap) {
        initRasterFunctionLabelMap();
    }

    return rasterFunctionLabelMap.get(rasterFunctionName) || rasterFunctionName;
};
