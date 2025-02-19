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

import { MultipleLinesChart } from '@vannizhang/react-d3-charts';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import React, { FC } from 'react';
import { SpectralProfileChartStyle } from '../SpectralProfileChart';

type Props = {
    chartData: LineGroupData[];
    /**
     * tick lable text for the bottom axis of the chart
     */
    bottomAxisTickText: string[];
};

export const EXPANDED_SPECTRAL_PROFILE_CHART_CONTAINER_ID =
    'expanded-spectral-profile-chart-container';

export const ExpandedSpectralProfileChart: FC<Props> = ({
    chartData,
    bottomAxisTickText,
}) => {
    return (
        <div
            id={EXPANDED_SPECTRAL_PROFILE_CHART_CONTAINER_ID}
            className="relative w-full h-full"
            style={SpectralProfileChartStyle}
        >
            <MultipleLinesChart
                data={chartData}
                strokeWidth={1.5}
                showTooltip={true}
                yScaleOptions={{
                    domain: [0, 1],
                }}
                leftAxisOptions={{
                    showGridLines: true,
                }}
                bottomAxisOptions={{
                    numberOfTicks: bottomAxisTickText.length,
                    shouldRotateTextLabels: false,
                    tickFormatFunction: (val: number | string, index) => {
                        // console.log(val, index)
                        return (
                            bottomAxisTickText[val as number] || val.toString()
                        );
                    },
                }}
                margin={{
                    bottom: 20,
                    left: 30,
                    right: 10,
                    top: 10,
                }}
            />
        </div>
    );
};
