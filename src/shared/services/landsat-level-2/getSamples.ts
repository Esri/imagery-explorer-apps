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

// import { Point } from '@arcgis/core/geometry';
// import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';

// export type LandsatSampleData = {
//     locationId: number;
//     /**
//      * object id of the landsat imagery scene
//      */
//     rasterId: number;
//     resolution: number;
//     /**
//      * space separated band values returned by the server
//      */
//     value: string;
//     /**
//      * array of band values as numerical values
//      */
//     values: number[];
// };

// export const getSamples = async (
//     queryLocation: Point,
//     objectIds: number[],
//     controller: AbortController
// ): Promise<LandsatSampleData[]> => {
//     // const { x, y, spatialReference } = queryLocation;

//     const params = new URLSearchParams({
//         f: 'json',
//         geometry: JSON.stringify(queryLocation),
//         geometryType: 'esriGeometryPoint',
//         mosaicRule: JSON.stringify({
//             mosaicMethod: 'esriMosaicLockRaster',
//             ascending: true,
//             mosaicOperation: 'MT_FIRST',
//             lockRasterIds: objectIds,
//             method: 'esriMosaicLockRaster',
//             operation: 'MT_FIRST',
//             multidimensionalDefinition: [],
//         }),
//         returnFirstValueOnly: 'false',
//         returnGeometry: 'false',
//     });

//     const res = await fetch(
//         `${LANDSAT_LEVEL_2_SERVICE_URL}/getSamples?${params.toString()}`,
//         {
//             signal: controller.signal,
//         }
//     );

//     if (!res.ok) {
//         throw new Error('failed to get samples');
//     }

//     const data = await res.json();

//     if (data.error) {
//         throw data.error;
//     }

//     const samples: LandsatSampleData[] = data?.samples
//         ? data.samples.map((d: LandsatSampleData) => {
//               return {
//                   ...d,
//                   values: d.value.split(' ').map((d) => +d),
//               };
//           })
//         : [];

//     return samples;
// };
