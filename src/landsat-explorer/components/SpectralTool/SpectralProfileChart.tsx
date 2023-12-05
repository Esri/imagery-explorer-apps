import { MultipleLinesChart } from '@vannizhang/react-d3-charts';
import React, { FC, useMemo } from 'react';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';
import { LANDSAT_BAND_NAMES } from '@shared/services/landsat-level-2/config';

type Props = {
    /**
     * data that will be used to populate the Multilple Lines chart
     * for spectral profile tool
     */
    chartData: LineGroupData[];
};

export const SpectralProfileChart: FC<Props> = ({ chartData }) => {
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
                        const ticks = LANDSAT_BAND_NAMES.slice(0, 7);
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
