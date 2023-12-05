import { formatLandsatBandValuesAsLineChartDataItems } from '@landsat-explorer/components/SpectralTool/helper';
import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from '@shared/store/SpectralSamplingTool/selectors';
import { averageMatrixColumns } from '@shared/utils/snippets/averageMatrixColumns';
// import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

/**
 * This custom hook calculates the averaged band values across all sampling points.
 * It extracts band values from spectral sampling points data and computes the column-wise averages.
 * @returns {Array} An array containing averaged band values across all sampling points.
 */
export const useAveragedBandValues = () => {
    const samplingPointsData = useSelector(selectSpectralSamplingPointsData);

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
