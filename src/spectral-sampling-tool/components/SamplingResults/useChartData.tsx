import { formatLandsatBandValuesAsLineChartDataItems } from '@landsat-explorer/components/SpectralTool/helper';
import {
    selectIdOfItem2Highlight,
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from '@shared/store/SpectralSamplingTool/selectors';
import { averageMatrixColumns } from '@shared/utils/snippets/averageMatrixColumns';
// import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useAveragedBandValues } from './useAveragedSamplingResults';

/**
 * The custom hook that returns data to be used to render sampling results chart.
 * The chart should include:
 * - a line represent spectral profile of currently selected point
 * - a line represents the average spectral profile from all sampling point
 * @returns
 */
export const useChartData = () => {
    const samplingPointsData = useSelector(selectSpectralSamplingPointsData);

    const idOfItem2Highlight = useSelector(selectIdOfItem2Highlight);

    const selectedSamplingPointsData = useSelector(
        selectSelectedSpectralSamplingPointData
    );

    const averageBandValues = useAveragedBandValues();

    const chartData = useMemo(() => {
        if (!samplingPointsData || !samplingPointsData.length) {
            return [];
        }

        const output: LineGroupData[] = samplingPointsData
            .filter((d) => d.location && d.bandValues)
            .map((d, index) => {
                const values = formatLandsatBandValuesAsLineChartDataItems(
                    d.bandValues
                );

                return {
                    fill:
                        d.uniqueId === idOfItem2Highlight
                            ? 'var(--custom-light-blue-90)'
                            : 'var(--custom-light-blue-25)',
                    key: index.toString(),
                    values,
                    // dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
                } as LineGroupData;
            });

        if (!output.length) {
            return [];
        }

        if (samplingPointsData.length > 1 && averageBandValues.length) {
            // const averageBandValues = averageMatrixColumns(matrixOfBandValues);

            output.push({
                fill: 'var(--custom-light-blue-90)',
                key: 'average',
                values: formatLandsatBandValuesAsLineChartDataItems(
                    averageBandValues
                ),
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            });
        }

        return output;
    }, [
        samplingPointsData,
        selectedSamplingPointsData,
        averageBandValues,
        idOfItem2Highlight,
    ]);

    return chartData;
};
