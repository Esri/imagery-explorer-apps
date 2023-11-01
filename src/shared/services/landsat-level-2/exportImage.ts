import IExtent from '@arcgis/core/geometry/Extent';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
import { getMosaicRuleByObjectId } from './helpers';

type ExportImageParams = {
    /**
     * Map Extent
     */
    extent: Pick<IExtent, 'xmin' | 'ymin' | 'xmax' | 'ymax'>;
    /**
     * width of map container
     */
    width: number;
    /**
     * height of map container
     */
    height: number;
    /**
     * raster function name that will be used in the rendering rule
     */
    rasterFunctionName: string;
    /**
     * object Id of the Landsat scene
     */
    objectId: number;
    abortController: AbortController;
};

export const exportImage = async ({
    extent,
    width,
    height,
    rasterFunctionName,
    objectId,
    abortController,
}: ExportImageParams) => {
    const { xmin, xmax, ymin, ymax } = extent;

    const params = new URLSearchParams({
        f: 'image',
        bbox: `${xmin},${ymin},${xmax},${ymax}`,
        bboxSR: '102100',
        imageSR: '102100',
        format: 'jpgpng',
        size: `${width},${height}`,
        mosaicRule: JSON.stringify(getMosaicRuleByObjectId(objectId)),
        renderingRule: JSON.stringify({ rasterFunction: rasterFunctionName }),
    });

    const requestURL = `${LANDSAT_LEVEL_2_SERVICE_URL}/exportImage?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const blob = await res.blob();

    return blob;
};
