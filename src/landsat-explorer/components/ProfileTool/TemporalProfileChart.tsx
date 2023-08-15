import React, { FC } from 'react';
import { useSelector } from 'react-redux';
import { LineChartBasic } from '@vannizhang/react-d3-charts';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import { formattedDateString2Unixtimestamp } from '@shared/utils/date-time/formatDateString';
import { VerticalReferenceLineData } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { DATE_FORMAT } from '@shared/constants/UI';
import { TemporalProfileData } from '@typing/imagery-service';
import { SpectralIndex } from '@typing/imagery-service';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { format } from 'date-fns';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat-2/config';
import { calcSpectralIndex } from '@shared/services/landsat-2/helpers';

type Props = {
    data: TemporalProfileData[];
    spectralIndex: SpectralIndex;
    onClickHandler: (index: number) => void;
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
        const { acquisitionDate, values } = d;

        // calculate the spectral index that will be used as the y value for each chart vertex
        let y = calcSpectralIndex(spectralIndex, values);

        // justify the y value for surface temperature index to make it not go below the hardcoded y min
        if (
            spectralIndex === 'temperature farhenheit' ||
            spectralIndex === 'temperature celcius'
        ) {
            const yMin =
                spectralIndex === 'temperature farhenheit'
                    ? LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT
                    : LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS;

            y = Math.max(y, yMin);
        }

        const tooltip = `${format(acquisitionDate, 'LLL yyyy')}: ${y.toFixed(
            2
        )}`;

        return {
            x: d.acquisitionDate,
            y,
            tooltip,
        };
    });

    return data;
};

export const TemporalProfileChart: FC<Props> = ({
    data,
    spectralIndex,
    onClickHandler,
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

    const getCustomDomain4YScale = (): number[] => {
        if (spectralIndex === 'temperature farhenheit') {
            return [
                LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
                LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
            ];
        }

        if (spectralIndex === 'temperature celcius') {
            return [
                LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
                LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
            ];
        }

        return [-1, 1];
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
                showTooltip
                stroke="var(--custom-light-blue)"
                strokeWidth={1.5}
                yScaleOptions={{
                    domain: getCustomDomain4YScale(),
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
                onClick={onClickHandler}
            />
        </div>
    );
};
