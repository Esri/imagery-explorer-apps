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

import React, { FC, useMemo } from 'react';
// import { useAppSelector } from '@shared/store/configureStore';
import { LineChartBasic } from '@vannizhang/react-d3-charts';
// import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
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
// import {
//     LANDSAT_SURFACE_TEMPERATURE_MIN_CELSIUS,
//     LANDSAT_SURFACE_TEMPERATURE_MIN_FAHRENHEIT,
//     LANDSAT_SURFACE_TEMPERATURE_MAX_CELSIUS,
//     LANDSAT_SURFACE_TEMPERATURE_MAX_FAHRENHEIT,
// } from '@shared/services/landsat-level-2/config';
// import { calcSpectralIndex } from '@shared/services/landsat-level-2/helpers';
// import { selectTrendToolOption } from '@shared/store/TrendTool/selectors';
// import { getMonthAbbreviation } from '@shared/utils/date-time/getMonthName';
import { TrendToolOption } from '@shared/store/TrendTool/reducer';
import { calcTrendLine } from './helpers';
import { getMonthAbbreviation } from '@shared/utils/date-time/monthHelpers';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { useTranslation } from 'react-i18next';

type Props = {
    /**
     * data that will be used to plot the Line chart for the Temporal Profile Tool
     */
    chartData: LineChartDataItem[];
    /**
     * custom domain for the Y-Scale of the Line chart
     */
    customDomain4YScale: number[];
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

export const TemporalProfileChart: FC<Props> = ({
    chartData,
    customDomain4YScale,
    trendToolOption,
    acquisitionYear,
    selectedAcquisitionDate,
    onClickHandler,
}: Props) => {
    const { t } = useTranslation();

    // const trendToolOption = useAppSelector(selectTrendToolOption);

    // const queryParams4SelectedScene =
    //     useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

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
                          tooltip: `${t(
                              'selected_image'
                          )}: <br />${formatInUTCTimeZone(
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
                tooltip: `${t('selected_image')}: <br />${formatInUTCTimeZone(
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
