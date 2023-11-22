import { MultipleLinesChart } from '@vannizhang/react-d3-charts';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';

import React, { FC, useMemo } from 'react';
// import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import {
    SpectralProfileDataByFeatureOfInterest,
    SpectralProfileFeatureOfInterest,
} from './config';
import { LineGroupData } from '@vannizhang/react-d3-charts/dist/MultipleLinesChart/types';

type Props = {
    /**
     * spectral profile chart data for user selected query location
     */
    data: number[];
    /**
     * selected feature of interest for the spectral profile tool
     */
    featureOfInterest: SpectralProfileFeatureOfInterest;
};

const normalizeBandValue = (value: number): number => {
    // band value should never go above 1
    value = Math.min(value, 1);
    // band value should never go below 0
    value = Math.max(value, 0);
    return value;
};

export const SpectralProfileChart: FC<Props> = ({
    data,
    featureOfInterest,
}) => {
    const chartData: LineGroupData[] = useMemo(() => {
        if (
            !data ||
            !data.length ||
            !featureOfInterest ||
            !SpectralProfileDataByFeatureOfInterest[featureOfInterest]
        ) {
            return [];
        }

        // only need to plot the first 7 bands in the spectral profile chart
        const bandValues4UserSelectedLocation = data.slice(0, 7);
        const bandValues4SelectedFeatureOfInterest =
            SpectralProfileDataByFeatureOfInterest[featureOfInterest].slice(
                0,
                7
            );

        const spectralProfileData4UserSelectedLocation =
            bandValues4UserSelectedLocation.map((val, index) => {
                return {
                    x: index,
                    y: normalizeBandValue(val),
                } as LineChartDataItem;
            });

        const spectralProfileData4SelectedFeatureOfInterest =
            bandValues4SelectedFeatureOfInterest.map((val, index) => {
                return {
                    x: index,
                    y: normalizeBandValue(val),
                } as LineChartDataItem;
            });

        return [
            {
                fill: 'var(--custom-light-blue)',
                key: 'selected-location',
                values: spectralProfileData4UserSelectedLocation,
            } as LineGroupData,
            {
                fill: 'var(--custom-light-blue-70)',
                key: featureOfInterest,
                values: spectralProfileData4SelectedFeatureOfInterest,
                dashPattern: '9 3', // use dash pattern to provide user a hint that the feature of interest is just a reference
            } as LineGroupData,
        ];
    }, [data, featureOfInterest]);

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
