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
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectTrendToolData,
    selectSelectedIndex4TrendTool,
    selectTrendToolOption,
} from '@shared/store/TrendTool/selectors';
import { RadarIndex, TemporalProfileData } from '@typing/imagery-service';
import { SpectralIndex } from '@typing/imagery-service';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import {
    calcRadarIndex,
    getSentinel1PixelValueRangeByRadarIndex,
} from '@shared/services/sentinel-1/helper';

/**
 * Converts Sentinel-1 temporal profile data to chart data.
 * @param temporalProfileData - Array of temporal profile data.
 * @param spectralIndex - Spectral index to calculate the value for each data point.
 * @param month2month - if true, user is trying to plot month to month trend line for a selected year.
 * @returns An array of QuickD3ChartDataItem objects representing the chart data.
 *
 */
const convertSentinel1TemporalProfileData2ChartData = (
    temporalProfileData: TemporalProfileData[],
    selectedIndx: RadarIndex,
    month2month?: boolean
): LineChartDataItem[] => {
    if (!temporalProfileData || !temporalProfileData.length) {
        return [];
    }

    const data = temporalProfileData.map((d) => {
        const { acquisitionDate, values } = d;

        // calculate the radar index that will be used as the y value for each chart vertex
        const y = calcRadarIndex(selectedIndx, values);
        // console.log(y)

        // const [yMin, yMax] = getSentinel1PixelValueRangeByRadarIndex(selectedIndx)

        // // y should not go below y min
        // y = Math.max(y, yMin);

        // // y should not go beyond y max
        // y = Math.min(y, yMax);

        const tooltip = `${formatInUTCTimeZone(
            acquisitionDate,
            'LLL yyyy'
        )}: ${y.toFixed(4)}`;

        return {
            x: month2month ? d.acquisitionMonth : d.acquisitionDate,
            y,
            tooltip,
        };
    });

    return data;
};

export const useSentinel1TemporalProfileDataAsChartData = () => {
    const temporalProfileData = useAppSelector(selectTrendToolData);

    const selectedIndx: RadarIndex = useAppSelector(
        selectSelectedIndex4TrendTool
    ) as RadarIndex;

    const trendToolOption = useAppSelector(selectTrendToolOption);

    const chartData = useMemo(() => {
        return convertSentinel1TemporalProfileData2ChartData(
            temporalProfileData,
            selectedIndx,
            trendToolOption === 'month-to-month'
        );
    }, [temporalProfileData, selectedIndx, trendToolOption]);

    return chartData;
};
