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

import { ImageryServiceTimeExtentData } from '@typing/imagery-service';
import { LANDSAT_LEVEL_2_SERVICE_URL } from './config';
import { getTimeExtent } from '../helpers/getTimeExtent';

let timeExtentData: ImageryServiceTimeExtentData = null;

/**
 * Get Landsat layer's time extent
 * @returns TimeExtentData
 *
 * @example
 * Usage
 * ```
 * getTimeExtent()
 * ```
 *
 * Returns
 * ```
 * {
 *   start: 1363622294000,
 *   end: 1683500585000
 * }
 * ```
 */
export const getTimeExtentOfLandsatService =
    async (): Promise<ImageryServiceTimeExtentData> => {
        if (timeExtentData) {
            return timeExtentData;
        }

        try {
            // const res = await fetch(`${LANDSAT_LEVEL_2_SERVICE_URL}?f=json`);

            // if (!res.ok) {
            //     throw new Error('failed to fetch JSON for Landsat-2 service');
            // }

            // const data = await res.json();

            // const [start, end] = data?.timeInfo?.timeExtent || [];

            // return (timeExtentData = {
            //     start,
            //     end,
            // });

            const data = await getTimeExtent(LANDSAT_LEVEL_2_SERVICE_URL);

            return (timeExtentData = data);
        } catch (error) {
            console.error(error);
        }
    };
