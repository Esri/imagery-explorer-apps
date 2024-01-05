import React, { FC, useMemo } from 'react';
import { useSelector } from 'react-redux';
import { LineChartBasic } from '@vannizhang/react-d3-charts';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import {
    formattedDateString2Unixtimestamp,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
import { VerticalReferenceLineData } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import { DATE_FORMAT } from '@shared/constants/UI';
import { TemporalProfileData } from '@typing/imagery-service';
import { SpectralIndex } from '@typing/imagery-service';
import { LineChartDataItem } from '@vannizhang/react-d3-charts/dist/LineChart/types';
import {
    LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
    LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
    LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
} from '@shared/services/landsat-level-2/config';
import { calcSpectralIndex } from '@shared/services/landsat-level-2/helpers';
// import { selectTrendToolOption } from '@shared/store/TrendTool/selectors';
// import { getMonthAbbreviation } from '@shared/utils/date-time/getMonthName';
import { TrendToolOption } from '@shared/store/TrendTool/reducer';
import { calcTrendLine } from './helpers';
import { getMonthAbbreviation } from '@shared/utils/date-time/getMonthName';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';

type Props = {
    /**
     * data that will be used to plot the trend chart
     */
    data: TemporalProfileData[];
    /**
     * user selected spectral index
     */
    spectralIndex: SpectralIndex;
    /**
     * user selected trend tool option
     */
    trendToolOption: TrendToolOption;
    /**
     * user selected acquisition year for the 'month-to-month' option
     */
    acquisitionYear: number;
    /**
     * user selected acquisition date in format of (YYYY-MM-DD)
     * this date will be rendered as a vertical reference line in the trend chart
     */
    selectedAcquisitionDate: string;
    onClickHandler: (index: number) => void;
};

/**
 * Converts Landsat temporal profile data to chart data.
 * @param temporalProfileData - Array of temporal profile data.
 * @param spectralIndex - Spectral index to calculate the value for each data point.
 * @param month2month - if true, user is trying to plot month to month trend line for a selected year.
 * @returns An array of QuickD3ChartDataItem objects representing the chart data.
 *
 */
export const convertLandsatTemporalProfileData2ChartData = (
    temporalProfileData: TemporalProfileData[],
    spectralIndex: SpectralIndex,
    month2month?: boolean
): LineChartDataItem[] => {
    const data = temporalProfileData.map((d) => {
        const { acquisitionDate, values } = d;

        // calculate the spectral index that will be used as the y value for each chart vertex
        let y = calcSpectralIndex(spectralIndex, values);

        let yMin = -1;
        let yMax = 1;

        // justify the y value for surface temperature index to make it not go below the hardcoded y min
        if (
            spectralIndex === 'temperature farhenheit' ||
            spectralIndex === 'temperature celcius'
        ) {
            yMin =
                spectralIndex === 'temperature farhenheit'
                    ? LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT
                    : LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS;

            yMax =
                spectralIndex === 'temperature farhenheit'
                    ? LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT
                    : LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS;
        }

        // y should not go below y min
        y = Math.max(y, yMin);

        // y should not go beyond y max
        y = Math.min(y, yMax);

        const tooltip = `${formatInUTCTimeZone(
            acquisitionDate,
            'LLL yyyy'
        )}: ${y.toFixed(2)}`;

        return {
            x: month2month ? d.acquisitionMonth : d.acquisitionDate,
            y,
            tooltip,
        };
    });

    return data;
};

export const TemporalProfileChart: FC<Props> = ({
    data,
    spectralIndex,
    trendToolOption,
    acquisitionYear,
    selectedAcquisitionDate,
    onClickHandler,
}: Props) => {
    // const trendToolOption = useSelector(selectTrendToolOption);

    // const queryParams4SelectedScene =
    //     useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const chartData = convertLandsatTemporalProfileData2ChartData(
        data,
        spectralIndex,
        trendToolOption === 'month-to-month'
    );

    const customDomain4XScale = useMemo(() => {
        if (!chartData.length) {
            return null;
        }

        if (trendToolOption === 'month-to-month') {
            // use 1 (for Janurary) and 12 (for December) as the x domain
            return [1, 12];
        }

        let xMax = chartData[chartData.length - 1].x;

        // In the "year-to-year" option, we aim to display the indicator line for the selected acquisition date on the chart.
        // To achieve this, we adjust the xMax value to ensure it fits within the chart's boundaries.
        // In the "month-to-month" option, we only display the indicator line for the selected acquisition date if it falls within the user-selected acquisition year.
        if (trendToolOption === 'year-to-year' && selectedAcquisitionDate) {
            xMax = Math.max(
                // user selected acquisition date in Calendar component
                formattedDateString2Unixtimestamp(selectedAcquisitionDate),
                // acquisition date of the last item in the chart data
                chartData[chartData.length - 1].x
            );
        }

        const xMin = chartData[0].x;

        return [xMin, xMax];
    }, [chartData, selectedAcquisitionDate, trendToolOption]);

    const customDomain4YScale = useMemo(() => {
        const yValues = chartData.map((d) => d.y);

        // boundary of y axis, for spectral index, the boundary should be -1 and 1
        let yUpperLimit = 1;
        let yLowerLimit = -1;

        // temperature is handled differently as we display the actual values in the chart
        if (spectralIndex === 'temperature farhenheit') {
            yLowerLimit = LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT;
            yUpperLimit = LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT;
        }

        if (spectralIndex === 'temperature celcius') {
            yLowerLimit = LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS;
            yUpperLimit = LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS;
        }

        // get min and max from the data
        let ymin = Math.min(...yValues);
        let ymax = Math.max(...yValues);

        // get range between min and max from the data
        const yRange = ymax - ymin;

        // adjust ymin and ymax to add 10% buffer to it, but also need to make sure it fits in the upper and lower limit
        ymin = Math.max(yLowerLimit, ymin - yRange * 0.1);
        ymax = Math.min(yUpperLimit, ymax + yRange * 0.1);

        return [ymin, ymax];
    }, [chartData]);

    const trendLineData = useMemo(() => {
        if (!chartData || !chartData.length) {
            return [];
        }

        const yVals = chartData.map((d) => d.y);

        const [y1, y2] = calcTrendLine(yVals);

        return [
            {
                y1,
                y2,
            },
        ];
    }, [chartData]);

    const getData4VerticalReferenceLine = (): VerticalReferenceLineData[] => {
        if (!selectedAcquisitionDate || !chartData.length) {
            return null;
        }

        const timestampOfAcquisitionDate = formattedDateString2Unixtimestamp(
            selectedAcquisitionDate
        );

        if (trendToolOption === 'month-to-month') {
            // only show vertical reference line if the year of user selected acquisition date
            // is the same as user selected acquisition year of the trend tool
            return getYearFromFormattedDateString(selectedAcquisitionDate) ===
                acquisitionYear
                ? [
                      {
                          x: getMonthFromFormattedDateString(
                              selectedAcquisitionDate
                          ),
                          tooltip: `Selected Image: <br />${formatInUTCTimeZone(
                              timestampOfAcquisitionDate,
                              DATE_FORMAT
                          )}`,
                      },
                  ]
                : [];
        }

        return [
            {
                x: timestampOfAcquisitionDate,
                tooltip: `Selected Image: <br />${formatInUTCTimeZone(
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
                    '--horizontal-reference-line-color':
                        'var(--custom-light-blue-80)',
                    '--horizontal-reference-line-stroke-dasharray': '2 2',
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
                margin={{
                    bottom: 30,
                    left: 45,
                    right: 20,
                    top: 15,
                }}
                yScaleOptions={{
                    domain: customDomain4YScale,
                }}
                xScaleOptions={{
                    useTimeScale: trendToolOption === 'year-to-year',
                    domain: customDomain4XScale,
                }}
                bottomAxisOptions={{
                    /*
                     * Indicate number of ticks that should be renderd on x axis
                     */
                    numberOfTicks: trendToolOption === 'year-to-year' ? 5 : 8,
                    tickFormatFunction: (val: any) => {
                        if (!val) {
                            return '';
                        }

                        if (trendToolOption === 'year-to-year') {
                            return formatInUTCTimeZone(val, 'yyyy');
                        }

                        return getMonthAbbreviation(val).slice(0, 1);
                    },
                }}
                verticalReferenceLines={getData4VerticalReferenceLine()}
                horizontalReferenceLines={trendLineData}
                onClick={onClickHandler}
            />
        </div>
    );
};
