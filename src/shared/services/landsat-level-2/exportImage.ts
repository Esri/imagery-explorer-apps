// /* Copyright 2024 Esri
//  *
//  * Licensed under the Apache License Version 2.0 (the "License");
//  * you may not use this file except in compliance with the License.
//  * You may obtain a copy of the License at
//  *
//  *     http://www.apache.org/licenses/LICENSE-2.0
//  *
//  * Unless required by applicable law or agreed to in writing, software
//  * distributed under the License is distributed on an "AS IS" BASIS,
//  * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
//  * See the License for the specific language governing permissions and
//  * limitations under the License.
//  */

// import IExtent from '@arcgis/core/geometry/Extent';
// import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
// import { getLockRasterMosaicRule } from '../helpers/getMosaicRuleByObjectId';
// // import { getMosaicRuleByObjectId } from './helpers';

// type ExportImageParams = {
//     /**
//      * Map Extent
//      */
//     extent: Pick<IExtent, 'xmin' | 'ymin' | 'xmax' | 'ymax'>;
//     /**
//      * width of map container
//      */
//     width: number;
//     /**
//      * height of map container
//      */
//     height: number;
//     /**
//      * raster function name that will be used in the rendering rule
//      */
//     rasterFunctionName: string;
//     /**
//      * object Id of the Landsat scene
//      */
//     objectId: number;
//     abortController: AbortController;
// };

// export const exportImage = async ({
//     extent,
//     width,
//     height,
//     rasterFunctionName,
//     objectId,
//     abortController,
// }: ExportImageParams) => {
//     const { xmin, xmax, ymin, ymax } = extent;

//     const params = new URLSearchParams({
//         f: 'image',
//         bbox: `${xmin},${ymin},${xmax},${ymax}`,
//         bboxSR: '102100',
//         imageSR: '102100',
//         format: 'jpgpng',
//         size: `${width},${height}`,
//         mosaicRule: JSON.stringify(getLockRasterMosaicRule([objectId])),
//         renderingRule: JSON.stringify({ rasterFunction: rasterFunctionName }),
//     });

//     const requestURL = `${LANDSAT_LEVEL_2_SERVICE_URL}/exportImage?${params.toString()}`;

//     const res = await fetch(requestURL, { signal: abortController.signal });

//     const blob = await res.blob();

//     return blob;
// };
