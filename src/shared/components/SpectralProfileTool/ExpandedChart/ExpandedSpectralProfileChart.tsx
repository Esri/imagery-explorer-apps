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

export const ExpandedSpectralProfileChart: FC<Props> = ({
    chartData,
    bottomAxisTickText,
}) => {
    return (
        <div
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
