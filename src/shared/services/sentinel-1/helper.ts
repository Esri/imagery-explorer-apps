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

import { RadarIndex } from '@typing/imagery-service';

export const calcRadarIndex = (
    indexName: RadarIndex,
    bandValues: number[]
): number => {
    let [VV, VH] = bandValues;

    let value = 0;

    // The raw pixel values are in Power Scale already
    // For SWI, we will need to convert the Power Scale to dB and then calculate the index
    // @see https://github.com/vannizhang/imagery-explorer-apps-private/issues/28
    if (indexName === 'water') {
        VV = 10 * Math.log10(VV);
        VH = 10 * Math.log10(VH);
    }

    // Calculate the value based on the input radar index
    if (indexName === 'water') {
        value =
            0.1747 * VV +
            0.0082 * VH * VV +
            ((0.0023 * VV) ^ 2) -
            ((0.0015 * VH) ^ 2) +
            0.1904;
    } else if (indexName === 'water anomaly') {
        value = 0.01 / (0.01 + VV * 2);
    }

    return value;
};

export const getSentinel1PixelValueRangeByRadarIndex = (
    indexName: RadarIndex
) => {
    if (indexName === 'water anomaly') {
        return [-2, 0];
    }

    if (indexName === 'water') {
        return [-0.5, 1];
    }

    return [0, 0];
};
