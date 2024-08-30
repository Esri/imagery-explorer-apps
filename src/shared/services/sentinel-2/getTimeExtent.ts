/* Copyright 2024 Esri
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
import { getTimeExtent } from '../helpers/getTimeExtent';
import { SENTINEL_2_SERVICE_URL } from './config';

let timeExtentData: ImageryServiceTimeExtentData = null;

/**
 * Get Sentinel-2 layer's time extent
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
export const getTimeExtentOfSentinel2Service =
    async (): Promise<ImageryServiceTimeExtentData> => {
        if (timeExtentData) {
            return timeExtentData;
        }

        const data = await getTimeExtent(SENTINEL_2_SERVICE_URL);

        return (timeExtentData = data);
    };
