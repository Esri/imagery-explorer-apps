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

import { MultipleLinesChart } from '@vannizhang/react-d3-charts';
import React, { FC, useMemo } from 'react';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';

type Props = {
    /**
     * data that will be used to populate the Multilple Lines chart
     * for spectral profile tool
     */
    chartData: LineGroupData[];
    /**
     * tick lable text for the bottom axis of the chart
     */
    bottomAxisTickText: string[];
};

export const SpectralProfileChart: FC<Props> = ({
    chartData,
    bottomAxisTickText,
}) => {
    if (!chartData || !chartData.length) {
        return null;
    }

    return (
        <div
            className="relative w-full h-full"
            style={
                {
                    '--axis-tick-line-color': 'var(--custom-light-blue-50)',
                    '--axis-tick-text-color': 'var(--custom-light-blue-50)',
                    '--crosshair-reference-line-color':
                        'var(--custom-light-blue-50)',
                    '--vertical-reference-line-color':
                        'var(--custom-light-blue-70)',
                    '--tooltip-text-font-size': '.725rem',
                    '--tooltip-text-color': 'var(--custom-light-blue-70)',
                    '--tooltip-background-color': 'var(--custom-background-95)',
                    '--tooltip-border-color': 'var(--custom-light-blue-50)',
                } as React.CSSProperties
            }
        >
            <MultipleLinesChart
                data={chartData}
                strokeWidth={1.5}
                yScaleOptions={{
                    domain: [0, 1],
                }}
                bottomAxisOptions={{
                    numberOfTicks: 7,
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
                    right: 30,
                    top: 10,
                }}
            />
        </div>
    );
};
