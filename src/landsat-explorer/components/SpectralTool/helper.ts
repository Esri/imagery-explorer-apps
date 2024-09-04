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

import {
    SpectralProfileDataByLandCoverType,
    LandCoverType,
} from '@shared/components/SpectralProfileTool';
import { normalizeBandValue } from '@shared/components/SpectralProfileTool/helpers';

/**
 * given an array of band values from user selected location and the spectral data lookup table,
 * find the land cover type that is most similar to it.
 *
 * @param {number[]} bandValues band value from user selected location
 * @param {Spectr} spectralProfileData lookup table that provide typical spectral profile data for different land cover types
 * @returns {LandCoverType} name of the land cover type (feature of interest) that has the spectral profile that is most similar to the into band values
 */
export const findMostSimilarLandCoverType = (
    bandValues: number[],
    spectralProfileData: SpectralProfileDataByLandCoverType
): LandCoverType => {
    // let minSumOfDifferences = Infinity;
    let minSumOfSquaredDifferences = Infinity;
    let output: LandCoverType = null;

    for (const [landCoverType, value] of Object.entries(spectralProfileData)) {
        // let sumOfDiff = 0;
        let sumOfSquaredDiff = 0;

        const len = Math.min(bandValues.length, value.length);

        for (let i = 0; i < len; i++) {
            const diff = Math.abs(bandValues[i] - value[i]);
            // sumOfDiff += diff;

            // By squaring the differences, larger deviations from the expected values will have a
            // more significant impact on the total difference.
            // Therefore, it might provide a more accurate measure of similarity between spectral profiles.
            sumOfSquaredDiff += diff * diff;
        }

        if (sumOfSquaredDiff < minSumOfSquaredDifferences) {
            minSumOfSquaredDifferences = sumOfSquaredDiff;
            output = landCoverType as LandCoverType;
        }
    }

    return output;
};

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
