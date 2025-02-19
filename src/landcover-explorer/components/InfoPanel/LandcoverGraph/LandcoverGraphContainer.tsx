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

import React, { FC, useEffect, useMemo, useState } from 'react';

// import { QuickD3ChartData } from '@landcover-explorer/QuickD3Chart/types';
// import BarChart from '@landcover-explorer/QuickD3Chart/BarChart/BarChart';
// import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import { GroupedBarChartGroupData } from '@vannizhang/react-d3-charts/dist/GroupedBarChart/types';
import { GroupedBarChart } from '@vannizhang/react-d3-charts';
// import { MARGIN } from '@landcover-explorer/QuickD3Chart/constants';

// const margin = {
//     ...MARGIN,
//     bottom: 25,
// };

type Props = {
    chartData: GroupedBarChartGroupData[];
    // uniqueLandCoverClasses: string[];
};

const LandcoverGraphContainer: FC<Props> = ({
    chartData,
}: // uniqueLandCoverClasses,
Props) => {
    // const years = getAvailableYears();

    const containerMinWidth = useMemo(() => {
        if (!chartData || !chartData.length) {
            return 1600;
        }

        const groups = chartData.length;
        const itemsPerGroup = chartData[0].data.length;
        const minWidthPerItem = 32;

        const minWidthPerGroup = itemsPerGroup * minWidthPerItem;
        const spacesBetweenGroups = (groups - 1) * minWidthPerItem;

        return groups * minWidthPerGroup + spacesBetweenGroups;
    }, [chartData]);

    const customDomain4YScale = useMemo(() => {
        if (!chartData) {
            return [];
        }

        const yMax = chartData.reduce((ans, d) => {
            const localMax = d.data.reduce((localMax, item) => {
                return Math.max(localMax, item.y);
            }, 0);

            return Math.max(ans, localMax);
        }, 0);

        return [0, yMax * 1.25];
    }, [chartData]);

    if (!chartData) {
        return (
            <div
                className="w-full h-full flex justify-center items-center"
                style={{
                    height: '60vh',
                }}
            >
                <calcite-loader active scale="s"></calcite-loader>
            </div>
        );
    }

    return (
        <div
            className="relative w-full h-full overflow-x-auto"
            style={{
                minWidth: containerMinWidth,
                height: '50vh',
            }}
        >
            <div className="w-full h-full flex flex-col relative">
                <div
                    className="grow"
                    style={
                        {
                            '--axis-tick-line-color':
                                'var(--custom-light-blue-50)',
                            '--axis-tick-text-color':
                                'var(--custom-light-blue-80)',
                            '--axis-tick-text-font-size': '12px',
                            '--bar-label-text-color':
                                'var(--custom-light-blue-80)',
                            '--divider-line-color':
                                'var(--custom-light-blue-25)',
                            '--bar-label-text-translate-y-position-sticky':
                                '10px',
                        } as React.CSSProperties
                    }
                >
                    {/* <BarChart
                        data4Bars={chartData}
                        numberOfBarsPerGroup={years.length}
                        showAxis={false}
                        showVerticalDividerLines={true}
                        showLabelOnTop={true}
                        showValueLabel={true}
                        margin={margin}
                    /> */}

                    <GroupedBarChart
                        groupedData={chartData}
                        yScaleOptions={{
                            domain: customDomain4YScale,
                        }}
                        leftAxisOptions={{
                            shouldHide: true,
                        }}
                        showDividerLines={true}
                        innerPadding={0.25}
                        groupPadding={0.2}
                        showLabelText={true}
                        showStickyLabelText={true}
                    />
                </div>

                {/* <div
                    className="w-full text-white flex"
                    style={{
                        paddingLeft: margin.left,
                        paddingRight: margin.right,
                    }}
                >
                    {uniqueLandCoverClasses.map((className) => {
                        return (
                            <div
                                className="text-center text-custom-light-blue shrink-0 text-sm"
                                key={className}
                                style={{
                                    width: `${
                                        (1 / uniqueLandCoverClasses.length) *
                                        100
                                    }%`,
                                }}
                            >
                                <span>{className}</span>
                            </div>
                        );
                    })}
                </div> */}
            </div>
        </div>
    );
};

export default LandcoverGraphContainer;
