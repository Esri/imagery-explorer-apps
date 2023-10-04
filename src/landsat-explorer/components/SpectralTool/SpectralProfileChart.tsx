import { MultipleLinesChart } from '@vannizhang/react-d3-charts';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';

import React, { FC, useMemo } from 'react';
import { SpectralProfileFeatureOfInterest } from './SpectralToolContainer';
import { SpectralProfileDataByFeatureOfInterest } from './config';

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

const FillColorByFeatureOfInterest: Record<
    SpectralProfileFeatureOfInterest,
    string
> = {
    Cloud: 'rgb(30, 36, 87)',
    'Snow/Ice': 'rgb(165, 242, 243)',
    Desert: 'rgb(236, 197, 168)',
    'Dry Grass': 'rgb(218, 165, 32)',
    Concrete: 'rgb(128, 128, 128)',
    'Lush Grass': 'rgb(124, 252, 0)',
    Urban: 'rgb(0, 128, 128)',
    Rock: 'rgb(90, 77, 65)',
    Forest: 'rgb(34, 139, 34)',
    Water: 'rgb(64, 164, 223)',
};

export const SpectralProfileChart: FC<Props> = ({
    data,
    featureOfInterest,
}) => {
    const chartData = useMemo(() => {
        if (
            !data ||
            !data.length ||
            !featureOfInterest ||
            !SpectralProfileDataByFeatureOfInterest[featureOfInterest]
        ) {
            return [];
        }

        const spectralProfileData4UserSelectedLocation = data
            .slice(0, 7)
            .map((val, index) => {
                return {
                    x: index,
                    y: val,
                } as LineChartDataItem;
            });

        const spectralProfileData4SelectedFeatureOfInterest =
            SpectralProfileDataByFeatureOfInterest[featureOfInterest]
                .slice(0, 7)
                .map((val, index) => {
                    return {
                        x: index,
                        y: val,
                    } as LineChartDataItem;
                });

        return [
            {
                fill: 'var(--custom-light-blue)',
                key: 'selected-location',
                values: spectralProfileData4UserSelectedLocation,
            },
            {
                fill: FillColorByFeatureOfInterest[featureOfInterest],
                key: 'water',
                values: spectralProfileData4SelectedFeatureOfInterest,
            },
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
