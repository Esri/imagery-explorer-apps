import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';

import React, { FC, useMemo } from 'react';
// import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import {
    SpectralProfileDataByFeatureOfInterest,
    SpectralProfileFeatureOfInterest,
} from './config';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import { formatLandsatBandValuesAsLineChartDataItems } from './helper';

/**
 * This is a custom hook that convert the band values from user selected location and
 * the matched feature of interest into an array of LineGroupData
 *
 * @param data spectral profile chart data for user selected query location
 * @param featureOfInterest selected feature of interest for the spectral profile tool
 * @returns
 */
export const useSpectralProfileChartData = (
    data: number[],
    featureOfInterest: SpectralProfileFeatureOfInterest
) => {
    const chartData: LineGroupData[] = useMemo(() => {
        if (
            !data ||
            !data.length ||
            !featureOfInterest ||
            !SpectralProfileDataByFeatureOfInterest[featureOfInterest]
        ) {
            return [];
        }

        // // only need to plot the first 7 bands in the spectral profile chart
        // const bandValues4UserSelectedLocation = data.slice(0, 7);
        // const bandValues4SelectedFeatureOfInterest =
        //     SpectralProfileDataByFeatureOfInterest[featureOfInterest].slice(
        //         0,
        //         7
        //     );

        const spectralProfileData4UserSelectedLocation =
            formatLandsatBandValuesAsLineChartDataItems(data);
        // bandValues4UserSelectedLocation.map((val, index) => {
        //     return {
        //         x: index,
        //         y: normalizeBandValue(val),
        //     } as LineChartDataItem;
        // });

        const spectralProfileData4SelectedFeatureOfInterest =
            formatLandsatBandValuesAsLineChartDataItems(
                SpectralProfileDataByFeatureOfInterest[featureOfInterest]
            );
        // bandValues4SelectedFeatureOfInterest.map((val, index) => {
        //     return {
        //         x: index,
        //         y: normalizeBandValue(val),
        //     } as LineChartDataItem;
        // });

        return [
            {
                fill: 'var(--custom-light-blue)',
                key: 'selected-location',
                values: spectralProfileData4UserSelectedLocation,
            } as LineGroupData,
            {
                fill: 'var(--custom-light-blue-70)',
                key: featureOfInterest,
                values: spectralProfileData4SelectedFeatureOfInterest,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData,
        ];
    }, [data, featureOfInterest]);

    return chartData;
};
