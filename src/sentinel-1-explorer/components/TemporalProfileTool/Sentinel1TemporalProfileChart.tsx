import React from 'react';
import { useSentinel1TemporalProfileDataAsChartData } from './useTemporalProfileDataAsChartData';
import { useCustomDomain4YScale } from './useCustomDomain4YScale';
import { TemporalProfileChart } from '@shared/components/TemporalProfileChart';

export const Sentinel1TemporalProfileChart = () => {
    const chartData = useSentinel1TemporalProfileDataAsChartData();

    const customDomain4YScale = useCustomDomain4YScale(chartData);

    return (
        <TemporalProfileChart
            chartData={chartData}
            customDomain4YScale={customDomain4YScale}
        />
    );
};
