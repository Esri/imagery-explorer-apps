/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import IExtent from '@arcgis/core/geometry/Extent';
import {
    getTimeExtentByYear,
    // TimeExtentData,
} from '@shared/services/sentinel-2-10m-landcover/timeInfo';
// import { SENTINEL_2_LANDCOVER_10M_IMAGE_SERVICE_URL } from '@shared/services/sentinel-2-10m-landcover/config';

type ExportImageParams = {
    /**
     * URL for the Land Cover Image Service
     */
    serviceUrl: string;
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

export const exportLandCoverImage = async ({
    serviceUrl,
    extent,
    width,
    height,
    year,
    rasterFunctionName,
    abortController,
}: ExportImageParams) => {
    const { xmin, xmax, ymin, ymax } = extent;

    const { start } = await getTimeExtentByYear(year, serviceUrl);

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

    const requestURL = `${serviceUrl}/exportImage?${params.toString()}`;

    const res = await fetch(requestURL, { signal: abortController.signal });

    const blob = await res.blob();

    return blob;
};
