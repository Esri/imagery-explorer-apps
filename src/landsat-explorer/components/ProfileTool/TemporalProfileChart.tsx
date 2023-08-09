import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { LineChartBasic } from '@vannizhang/react-d3-charts';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import { VerticalReferenceLineData } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { DATE_FORMAT } from '@shared/constants/UI';
import { TemporalProfileData } from '@typing/imagery-service';
import { SpectralIndex } from '@shared/store/Analysis/reducer';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { format } from 'date-fns';

type Props = {
    data: TemporalProfileData[];
    spectralIndex: SpectralIndex;
};

/**
 * Converts Landsat temporal profile data to chart data.
 * @param temporalProfileData - Array of temporal profile data.
 * @param spectralIndex - Spectral index to calculate the value for each data point.
 * @returns An array of QuickD3ChartDataItem objects representing the chart data.
 *
 */
export const convertLandsatTemporalProfileData2ChartData = (
    temporalProfileData: TemporalProfileData[],
    spectralIndex: SpectralIndex
): LineChartDataItem[] => {
    const data = temporalProfileData.map((d) => {
        const { acquisitionDate } = d;

        // Per discussion with Rob Waterman, we should use B9 to get surface temprate data
        const [B1, B2, B3, B4, B5, B6, B7, B8, B9] = d.values;

        let value = 0;

        // Calculate the value based on the specified spectral index
        if (spectralIndex === 'moisture') {
            value = (B5 - B6) / (B5 + B6);
        } else if (spectralIndex === 'vegetation') {
            value = (B5 - B4) / (B5 + B4);
        } else if (spectralIndex === 'water') {
            value = (B3 - B6) / (B3 + B6);
        }

        const tooltip = `${format(
            acquisitionDate,
            'LLL yyyy'
        )}: ${value.toFixed(2)}`;

        return {
            x: d.acquisitionDate,
            y: value,
            tooltip,
        };
    });

    return data;
};

export const TemporalProfileChart: FC<Props> = ({
    data,
    spectralIndex,
}: Props) => {
    const queryParams4SelectedScene =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const chartData = convertLandsatTemporalProfileData2ChartData(
        data,
        spectralIndex
    );

    const getCustomDomain4XScale = (): number[] => {
        if (!queryParams4SelectedScene?.acquisitionDate || !chartData.length) {
            return null;
        }

        const timestampOfAcquisitionDate = formattedDateString2Unixtimestamp(
            queryParams4SelectedScene.acquisitionDate
        );

        const xMin = chartData[0].x;

        const xMax = Math.max(
            timestampOfAcquisitionDate,
            chartData[chartData.length - 1].x
        );

        return [xMin, xMax];
    };

    const getData4VerticalReferenceLine = (): VerticalReferenceLineData[] => {
        if (!queryParams4SelectedScene?.acquisitionDate || !chartData.length) {
            return null;
        }

        const timestampOfAcquisitionDate = formattedDateString2Unixtimestamp(
            queryParams4SelectedScene.acquisitionDate
        );

        return [
            {
                x: timestampOfAcquisitionDate,
                tooltip: `Selected Image: <br />${format(
                    timestampOfAcquisitionDate,
                    DATE_FORMAT
                )}`,
            },
        ];
    };

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
                    '--reference-line-color': 'var(--custom-light-blue-70)',
                    '--tooltip-text-font-size': '.725rem',
                    '--tooltip-text-color': 'var(--custom-light-blue-70)',
                    '--tooltip-background-color': 'var(--custom-background-95)',
                    '--tooltip-border-color': 'var(--custom-light-blue-50)',
                } as React.CSSProperties
            }
        >
            <LineChartBasic
                data={chartData}
                showTooltip
                stroke="var(--custom-light-blue)"
                strokeWidth={1.5}
                yScaleOptions={{
                    domain: [-1, 1],
                }}
                xScaleOptions={{
                    useTimeScale: true,
                    domain: getCustomDomain4XScale(),
                }}
                bottomAxisOptions={{
                    /*
                     * Indicate number of ticks that should be renderd on x axis
                     */
                    numberOfTicks: 5,
                }}
                verticalReferenceLines={getData4VerticalReferenceLine()}
            />
        </div>
    );
};
