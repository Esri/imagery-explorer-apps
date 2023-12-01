import { formatLandsatBandValuesAsLineChartDataItems } from '@landsat-explorer/components/SpectralTool/helper';
import { selectSpectralSamplingPointsData } from '@shared/store/SpectralSamplingTool/selectors';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useChartData = () => {
    const samplingPointsData = useSelector(selectSpectralSamplingPointsData);

    const chartData = useMemo(() => {
        if (!samplingPointsData || !samplingPointsData.length) {
            return [];
        }

        return samplingPointsData
            .filter((d) => d.location && d.bandValues)
            .map((d, index) => {
                const values = formatLandsatBandValuesAsLineChartDataItems(
                    d.bandValues
                );

                return {
                    fill: 'var(--custom-light-blue-90)',
                    key: index.toString(),
                    values,
                    // dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
                } as LineGroupData;
            });
    }, [samplingPointsData]);

    return chartData;
};
