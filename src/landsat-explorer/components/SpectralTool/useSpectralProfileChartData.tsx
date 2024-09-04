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
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import { formatLandsatBandValuesAsLineChartDataItems } from './helper';
import { LandCoverType } from '@shared/components/SpectralProfileTool';
import { getFillColorByLandCoverType } from '@shared/components/SpectralProfileTool/helpers';
import { LandsatSpectralProfileData } from './config';

/**
 * This is a custom hook that convert the band values from user selected location and
 * the matched land cover type into an array of LineGroupData
 *
 * @param data spectral profile chart data for user selected query location
 * @param {LandCoverType} landCoverType matched or user selected land cover type (feature of interest) for the spectral profile tool
 * @returns
 */
export const useSpectralProfileChartData = (
    data: number[],
    landCoverType: LandCoverType
) => {
    const chartData: LineGroupData[] = useMemo(() => {
        if (
            !data ||
            !data.length ||
            !landCoverType ||
            !LandsatSpectralProfileData[landCoverType]
        ) {
            return [];
        }

        const spectralProfileData4UserSelectedLocation =
            formatLandsatBandValuesAsLineChartDataItems(data);

        const spectralProfileData4SelectedLandCoverType =
            formatLandsatBandValuesAsLineChartDataItems(
                LandsatSpectralProfileData[landCoverType]
            );

        return [
            {
                fill: 'var(--custom-light-blue-90)',
                key: 'selected-location',
                values: spectralProfileData4UserSelectedLocation,
            } as LineGroupData,
            {
                fill: getFillColorByLandCoverType(landCoverType), //'var(--custom-light-blue-70)',
                key: landCoverType,
                values: spectralProfileData4SelectedLandCoverType,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData,
        ];
    }, [data, landCoverType]);

    return chartData;
};
