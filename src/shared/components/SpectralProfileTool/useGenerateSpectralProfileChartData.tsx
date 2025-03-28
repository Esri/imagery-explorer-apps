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
import React, { FC, useMemo } from 'react';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import {
    LandCoverType,
    SpectralProfileDataByLandCoverType,
} from '@shared/components/SpectralProfileTool';
import {
    formatBandValuesAsLineChartDataItems,
    getFillColorByLandCoverType,
} from '@shared/components/SpectralProfileTool/helpers';
import { useTranslation } from 'react-i18next';

/**
 * A custom hook that converts the band values from a user-selected location and
 * the matched land cover type into an array of LineGroupData, suitable for use
 * in a Spectral Profile Chart.
 *
 * This hook processes band values from both the user's selected location and a reference land cover type,
 * normalizes the data, and formats it for display in the chart. It limits the number of bands used by
 * taking the minimum of the available bands from both sources.
 *
 * @param {number[]} bandValuesFromSelectedLocation - Array of band values from the user-selected location.
 * @param {spectralProfileDataByLandCoverTypes} spectralProfileDataByLandCoverTypes -  Lookup table that contains spectral profile data for different land cover types.
 * @param {LandCoverType} landCoverType - The name of the matched or user-selected land cover type to be displayed in the Spectral Profile Chart.
 *
 * @returns {LineGroupData[]} An array of LineGroupData objects for populating the Spectral Profile Chart.
 */
export const useGenerateSpectralProfileChartData = (
    bandValuesFromSelectedLocation: number[],
    spectralProfileDataByLandCoverTypes: SpectralProfileDataByLandCoverType,
    landCoverType: LandCoverType
) => {
    const { t } = useTranslation();

    const chartData: LineGroupData[] = useMemo(() => {
        if (
            !bandValuesFromSelectedLocation ||
            !spectralProfileDataByLandCoverTypes ||
            !bandValuesFromSelectedLocation?.length ||
            !spectralProfileDataByLandCoverTypes[landCoverType] ||
            !landCoverType
        ) {
            return [];
        }

        const bandValuesFromSelectedLandCoverType =
            spectralProfileDataByLandCoverTypes[landCoverType];

        // The band values from the selected location may contain more data than necessary for display.
        // To ensure only the required number of band values are used, calculate the appropriate length
        // by taking the minimum of the available band values from both the selected location and the selected land cover type.
        const length = Math.min(
            bandValuesFromSelectedLocation.length,
            bandValuesFromSelectedLandCoverType.length
        );

        const lineChartData4SelectedLocation =
            formatBandValuesAsLineChartDataItems({
                bandValues: bandValuesFromSelectedLocation,
                title: t('selected_value'),
                length,
            });

        const lineChartData4SelectedLandCoverType =
            formatBandValuesAsLineChartDataItems({
                bandValues: bandValuesFromSelectedLandCoverType,
                title: t(landCoverType),
                length,
            });

        return [
            {
                fill: 'var(--custom-light-blue-90)',
                key: 'selected-location',
                values: lineChartData4SelectedLocation,
            } as LineGroupData,
            {
                fill: getFillColorByLandCoverType(landCoverType), //'var(--custom-light-blue-70)',
                key: landCoverType,
                values: lineChartData4SelectedLandCoverType,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData,
        ];
    }, [
        bandValuesFromSelectedLocation,
        spectralProfileDataByLandCoverTypes,
        landCoverType,
    ]);

    return chartData;
};
