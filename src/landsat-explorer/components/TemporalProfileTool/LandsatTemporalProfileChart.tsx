import React from 'react';
import { useTemporalProfileDataAsChartData } from './useTemporalProfileDataAsChartData';
import { useCustomDomain4YScale } from './useCustomDomain4YScale';
import { TemporalProfileChart } from '@shared/components/TemporalProfileChart';

export const LandsatTemporalProfileChart = () => {
    const chartData = useTemporalProfileDataAsChartData();

    const customDomain4YScale = useCustomDomain4YScale(chartData);

    return (
        <TemporalProfileChart
            chartData={chartData}
            customDomain4YScale={customDomain4YScale}
        />
    );
};
