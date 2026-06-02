import RasterFunction from '@arcgis/core/layers/support/RasterFunction';
import { grayscale } from '@arcgis/core/layers/support/rasterFunctionUtils';

export const getGrayscaleRasterFunction = (
    objectId: number
): RasterFunction => {
    if (objectId === undefined) {
        return null;
    }

    // Convert each input scene to greyscale using the luminosity method,
    // The formula for luminosity is 0.21 R + 0.72 G + 0.07 B.
    const grayScaleWeights = [21, 72, 7];

    return grayscale({
        weights: grayScaleWeights,
        raster: '$' + objectId,
    });
};
