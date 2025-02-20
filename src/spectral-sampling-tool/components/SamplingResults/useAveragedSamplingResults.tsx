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

import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from '@shared/store/SpectralSamplingTool/selectors';
import { averageMatrixColumns } from '@shared/utils/snippets/averageMatrixColumns';
// import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

/**
 * This custom hook calculates the averaged band values across all sampling points.
 * It extracts band values from spectral sampling points data and computes the column-wise averages.
 * @returns {Array} An array containing averaged band values across all sampling points.
 */
export const useAveragedBandValues = () => {
    const samplingPointsData = useAppSelector(selectSpectralSamplingPointsData);

    const averagedResults = useMemo(() => {
        if (!samplingPointsData || !samplingPointsData.length) {
            return [];
        }

        // a matrix that contains band values from all sampling points
        const matrixOfBandValues = samplingPointsData
            .filter((d) => d.bandValues !== null)
            .map((d) => d.bandValues);

        if (!matrixOfBandValues.length) {
            return [];
        }

        // create a single array containing the column-wise averages
        const averageBandValues = averageMatrixColumns(matrixOfBandValues);

        return averageBandValues;
    }, [samplingPointsData]);

    return averagedResults;
};
