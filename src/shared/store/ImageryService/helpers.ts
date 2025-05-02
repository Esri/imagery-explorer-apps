import { RasterFunctionInfo } from '@typing/imagery-service';

export const getRasterFunctionLabelMap = (
    rasterFunctionInfo: RasterFunctionInfo[]
) => {
    const rasterFunctionLabelMap = new Map();

    if (!rasterFunctionInfo) return rasterFunctionLabelMap;

    for (const { name, label } of rasterFunctionInfo) {
        rasterFunctionLabelMap.set(name, label);
    }

    return rasterFunctionLabelMap;
};
