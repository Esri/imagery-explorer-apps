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

import React, { FC, useRef } from 'react';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { BarChartBasic } from '@vannizhang/react-d3-charts';
import { BarChartDataItem } from '@vannizhang/react-d3-charts/dist/BarChart/types';
import { CalciteLoader } from '@esri/calcite-components-react';
// import BarChart from '@landcover-explorer/QuickD3Chart/BarChart/BarChart';
// import { MARGIN } from '@landcover-explorer/QuickD3Chart/constants';

// import DivergingBarChart from '@landcover-explorer/QuickD3Chart/DivergingBarChart/DivergingBarChart';
// import { QuickD3ChartData } from '@landcover-explorer/QuickD3Chart/types';

type Props = {
    data: BarChartDataItem[];
    scale?: 's' | 'm';
    itemOnHover: (index: number) => void;
};

const TotalAreaGraph: FC<Props> = ({
    data,
    scale = 'm',
    itemOnHover,
}: Props) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useGetTooltipPositionOnHover(containerRef);

    const chartTextFontSize = scale === 'm' ? '11px' : '.625rem';

    const getContent = () => {
        if (!data) {
            return (
                <div className="w-full flex justify-center items-center">
                    <CalciteLoader scale="s"></CalciteLoader>
                </div>
            );
        }

        if (!data.length) {
            return (
                <div className="w-full text-center">
                    <p className="text-sm opacity-50 mt-12">
                        Failed to fetch Land Cover data.
                    </p>
                </div>
            );
        }

        return (
            // <BarChart
            //     data4Bars={data}
            //     showAxis={true}
            //     showLabelOnTop={true}
            //     showXAxisLine={true}
            //     // itemOnHover={itemOnHover}
            // />
            <div
                className="relative w-full h-full"
                data-testid="total-area-graph"
            >
                <BarChartBasic
                    data={data}
                    showStickyLabelText={true}
                    leftAxisOptions={{
                        shouldHide: true,
                    }}
                    bottomAxisOptions={{
                        shouldRotateTextLabels: true,
                    }}
                    innerPadding={0.4}
                    margin={{
                        top: 35,
                        right: 5,
                        bottom: 50,
                        left: 25,
                    }}
                />
            </div>
        );
    };

    return (
        <div
            className="relative first-letter:w-full h-full"
            ref={containerRef}
            style={
                {
                    '--axis-tick-line-color': 'var(--custom-light-blue-50)',
                    '--axis-tick-text-color': 'var(--custom-light-blue-90)',
                    '--axis-tick-text-font-size': chartTextFontSize,
                    '--bar-label-text-font-size': chartTextFontSize,
                    '--bar-label-text-color': 'var(--custom-light-blue-90)',
                    '--bar-label-text-translate-y-position-sticky': '-22px',
                } as React.CSSProperties
            }
        >
            {getContent()}
        </div>
    );
};

export default TotalAreaGraph;
