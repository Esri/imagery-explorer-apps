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

import { LANDSAT_RASTER_FUNCTION_INFOS } from '../landsat-level-2/config';

let rasterFunctionLabelMap: Map<string, string> = null;

const initRasterFunctionLabelMap = () => {
    rasterFunctionLabelMap = new Map();

    const infos = [...LANDSAT_RASTER_FUNCTION_INFOS];

    for (const { name, label } of infos) {
        rasterFunctionLabelMap.set(name, label);
    }
};

/**
 * Get label text for a raster function for diplaying purpose.
 * @param rasterFunctionName name of the raster function
 * @returns {string} label associated with the raster function
 */
export const getRasterFunctionLabelText = (
    rasterFunctionName: string
): string => {
    if (!rasterFunctionLabelMap) {
        initRasterFunctionLabelMap();
    }

    return rasterFunctionLabelMap.get(rasterFunctionName) || rasterFunctionName;
};
