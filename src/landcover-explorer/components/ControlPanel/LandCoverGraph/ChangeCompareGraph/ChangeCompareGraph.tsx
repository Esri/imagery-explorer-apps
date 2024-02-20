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

import React, { FC, useMemo, useRef } from 'react';
import useGetTooltipPositionOnHover from '@shared/hooks/useGetTooltipPositionOnHover';
import { DivergingBarChart } from '@vannizhang/react-d3-charts';
import { DivergingBarChartDataItem } from '@vannizhang/react-d3-charts/dist/DivergingBarChart/types';

// import DivergingBarChart from '@landcover-explorer/QuickD3Chart/DivergingBarChart/DivergingBarChart';
// import { QuickD3ChartData } from '@landcover-explorer/QuickD3Chart/types';

type Props = {
    data: DivergingBarChartDataItem[];
    itemOnHover: (index: number) => void;
};

const ChangeCompareGraph: FC<Props> = ({ data, itemOnHover }: Props) => {
    const containerRef = useRef<HTMLDivElement>();

    useGetTooltipPositionOnHover(containerRef);

    const customDomain4YScale = useMemo(() => {
        if (!data) {
            return [];
        }

        const absMaxVal = data.reduce((ans, d) => {
            return Math.max(ans, Math.abs(d.y));
        }, 0);

        const customYMax = absMaxVal * 1.25;

        return [-customYMax, customYMax];
    }, [data]);

    const getContent = () => {
        if (!data) {
            return (
                <div className="w-full flex justify-center items-center">
                    <calcite-loader active scale="s"></calcite-loader>
                </div>
            );
        }

        return (
            <DivergingBarChart
                data={data}
                showStickyLabelText={true}
                yScaleOptions={{
                    domain: customDomain4YScale,
                }}
                leftAxisOptions={{
                    shouldHide: true,
                }}
                bottomAxisOptions={{
                    shouldRotateTextLabels: true,
                }}
                margin={{
                    top: 20,
                    right: 10,
                    bottom: 50,
                    left: 10,
                }}
                innerPadding={0.4}
                onBarMouseEnter={(d) => {
                    itemOnHover(d?.index);
                }}
                onBarMouseLeave={() => {
                    itemOnHover(-1);
                }}
                // itemOnHover={itemOnHover}
            />
        );
    };

    return (
        <div
            className="relative first-letter:w-full h-full"
            ref={containerRef}
            style={
                {
                    '--axis-tick-line-color': 'rgba(0,0,0,0)',
                    '--axis-tick-text-color': 'var(--custom-light-blue-90)',
                    '--axis-tick-text-font-size': '11px',
                    '--bar-label-text-font-size': '11px',
                    '--bar-label-text-color': 'var(--custom-light-blue-90)',
                    '--divider-line-color': 'var(--custom-light-blue-25)',
                } as React.CSSProperties
            }
        >
            {getContent()}
        </div>
    );
};

export default ChangeCompareGraph;
