import IExtent from '@arcgis/core/geometry/Extent';
import {
    getTimeExtentByYear,
    // TimeExtentData,
} from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@landcover-explorer/services/sentinel-2-10m-landcover/config';

type ExportImageParams = {
    /**
     * Map Extent
     */
    extent: IExtent;
    /**
     * width of map container
     */
    width: number;
    /**
     * height of map container
     */
    height: number;
    /**
     * the year that will be used as time filter
     */
    year: number;
    /**
     * Land cover layer raster function name that will be used in the rendering rule
     */
    rasterFunctionName: string;
    abortController: AbortController;
};

export const exportImage = async ({
    extent,
    width,
    height,
    year,
    rasterFunctionName,
    abortController,
}: ExportImageParams) => {
    const { xmin, xmax, ymin, ymax } = extent;

    const { start } = await getTimeExtentByYear(year);

    const params = new URLSearchParams({
        f: 'image',
        bbox: `${xmin},${ymin},${xmax},${ymax}`,
        bboxSR: '102100',
        imageSR: '102100',
        format: 'jpgpng',
        size: `${width},${height}`,
        mosaicRule: JSON.stringify({
            ascending: true,
            mosaicMethod: 'esriMosaicNorthwest',
            mosaicOperation: 'MT_FIRST',
        }),
        renderingRule: JSON.stringify({ rasterFunction: rasterFunctionName }),
        time: start.toString(),
    });

    const requestURL = `${SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL}/exportImage?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const blob = await res.blob();

    return blob;
};
