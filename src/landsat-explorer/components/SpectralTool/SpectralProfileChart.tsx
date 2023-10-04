import { LineChartBasic } from '@vannizhang/react-d3-charts';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';

import React, { FC, useMemo } from 'react';

type Props = {
    /**
     * spectral profile chart data for user selected query location
     */
    data: number[];
};

export const SpectralProfileChart: FC<Props> = ({ data }) => {
    const chartData = useMemo(() => {
        if (!data || !data.length) {
            return [];
        }

        return data.slice(0, 7).map((val, index) => {
            return {
                x: index,
                y: val,
            } as LineChartDataItem;
        });
    }, [data]);

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
            <LineChartBasic
                data={chartData}
                stroke="var(--custom-light-blue)"
                strokeWidth={1.5}
                yScaleOptions={{
                    domain: [0, 1],
                }}
                bottomAxisOptions={{
                    numberOfTicks: 7,
                    tickFormatFunction: (val: number | string, index) => {
                        // console.log(val, index)
                        const ticks = [
                            'Costal',
                            'Blue',
                            'Green',
                            'Red',
                            'NIR',
                            'SWIR1',
                            'SWIR2',
                        ];
                        return ticks[val];
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
