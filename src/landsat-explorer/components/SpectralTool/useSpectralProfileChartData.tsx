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
import React, { FC, useMemo } from 'react';
// import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import {
    SpectralProfileDataByFeatureOfInterest,
    // SpectralProfileFeatureOfInterest,
} from './config';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import { formatLandsatBandValuesAsLineChartDataItems } from './helper';
import { SpectralProfileFeatureOfInterest } from '@shared/components/SpectralProfileTool';
import { getFillColorByFeatureOfInterest } from '@shared/components/SpectralProfileTool/helpers';

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
                fill: 'var(--custom-light-blue-90)',
                key: 'selected-location',
                values: spectralProfileData4UserSelectedLocation,
            } as LineGroupData,
            {
                fill: getFillColorByFeatureOfInterest(featureOfInterest), //'var(--custom-light-blue-70)',
                key: featureOfInterest,
                values: spectralProfileData4SelectedFeatureOfInterest,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData,
        ];
    }, [data, featureOfInterest]);

    return chartData;
};
