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

import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';

import { normalizeBandValue } from '@shared/components/SpectralProfileTool/helpers';

/**
 * Converts an array of Landsat Band Values to an array of LineChartDataItem objects.
 *
 * This function takes an array of numeric band values and processes them to create LineChartDataItem objects.
 * It keeps only the first 7 bands and normalizes the values to ensure they fall within the range 0-1.
 *
 * @param bandValues - An array of numeric values representing Landsat band values.
 * @returns An array of LineChartDataItem objects with normalized x and y values.
 */
export const formatLandsatBandValuesAsLineChartDataItems = (
    bandValues: number[]
) => {
    if (!bandValues || !bandValues.length) {
        return [];
    }

    return bandValues.slice(0, 7).map((val, index) => {
        return {
            x: index,
            y: normalizeBandValue(val, 0, 1),
        } as LineChartDataItem;
    });
};
