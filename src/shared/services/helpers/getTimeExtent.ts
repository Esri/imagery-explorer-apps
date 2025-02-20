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

/**
 * Get time extent of a imagery service
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
export const getTimeExtent = async (
    serviceURL: string
): Promise<ImageryServiceTimeExtentData> => {
    try {
        const res = await fetch(`${serviceURL}?f=json`);

        if (!res.ok) {
            throw new Error('failed to fetch service JSON');
        }

        const data = await res.json();

        const [start, end] = data?.timeInfo?.timeExtent || [];

        return {
            start,
            end,
        };
    } catch (error) {
        console.error(error);
    }
};
