import { addMonths, format } from 'date-fns';
import IExtent from '@arcgis/core/geometry/Extent';
import { Sentinel2RasterFunction } from '../ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import {
    SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES,
    SENTINEL_2_IMAGE_SERVICE_URL,
} from './config';

const { AcquisitionDate, CloudCover } = SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES;

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
     * the month that will be used as time filter
     */
    month: number;
    /**
     * Sentinel 2 layer raster function name that will be used in the rendering rule
     */
    rasterFunctionName: Sentinel2RasterFunction;
    abortController: AbortController;
};

export const getMosaicRuleByAcquisitionDate = (
    year: number,
    month: number
    // day = 15
) => {
    // return {
    //     ascending: true,
    //     mosaicMethod: 'esriMosaicAttribute',
    //     sortField: SENTINEL_2_IMAGE_SERVICE_FIELD_NAMES.AcquisitionDate,
    //     sortValue: `${year}/${month}/${day}`,
    //     where: '(category = 2) OR (CloudCover < 0.1)',
    // };

    const startDate = new Date(year, month - 1, 1);
    const endDate = addMonths(startDate, 1);

    return {
        mosaicMethod: 'esriMosaicAttribute',
        // only get sentinel-2 imagery from the input month
        where: `${AcquisitionDate} BETWEEN timestamp '${format(
            startDate,
            'yyyy-MM-dd'
        )} 06:00:00' AND timestamp '${format(endDate, 'yyyy-MM-dd')} 05:59:59'`,
        // sort by cloud cover to get imagery with least cloud coverage
        sortField: CloudCover,
        sortValue: 0,
        ascending: true,
        mosaicOperation: 'MT_FIRST',
    };
};

export const exportImage = async ({
    extent,
    width,
    height,
    year,
    month,
    rasterFunctionName,
    abortController,
}: ExportImageParams) => {
    const { xmin, xmax, ymin, ymax } = extent;

    const params = new URLSearchParams({
        f: 'image',
        bbox: `${xmin},${ymin},${xmax},${ymax}`,
        bboxSR: '102100',
        imageSR: '102100',
        size: `${width},${height}`,
        format: 'jpgpng',
        mosaicRule: JSON.stringify(getMosaicRuleByAcquisitionDate(year, month)),
        renderingRule: JSON.stringify({ rasterFunction: rasterFunctionName }),
    });

    const requestURL = `${SENTINEL_2_IMAGE_SERVICE_URL}/exportImage?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const blob = await res.blob();

    return blob;
};
