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

import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import {
    MonthData,
    getMonthAbbrName,
    getNumberOfDays,
} from '@shared/utils/date-time/monthHelpers';
import {
    getFormatedDateString,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
import { DATE_FORMAT } from '@shared/constants/UI';
import { formatInUTCTimeZone } from '@shared/utils/date-time/formatInUTCTimeZone';
import { DateRange } from '@typing/shared';

/**
 * Formatted data of Imagery Scene
 */
export type FormattedImageryScene = {
    /**
     * date as unix timestamp
     */
    acquisitionDate: number;
    /**
     * date in format of (YYYY-MM-DD)
     */
    formattedAcquisitionDate: string;
    /**
     * name of the satellite (e.g., `Landsat-7`)
     */
    satellite: string;
    /**
     * Flag indicating if the imagery scene does not meet all user-selected criteria
     */
    doesNotMeetCriteria: boolean;
    /**
     * custom text to be displayed in the calendar component
     */
    customTooltipText?: string[];
};

type CalendarProps = {
    /**
     * date range that will be used to populate the calendar
     */
    dateRange: DateRange;
    /**
     * Selected imagery acquisition date as a string in format of (YYYY-MM-DD)
     * @example `2023-05-03`
     */
    selectedAcquisitionDate: string;
    /**
     * Array of available imagery scenes, the dates from these scenes will be rendered using different style on the Calendar
     * so that the user can know there are available data on these days
     */
    availableScenes?: FormattedImageryScene[];
    /**
     * Fires when user select a new acquisition date
     * @param date date string in format of (YYYY-MM-DD)
     * @returns
     */
    onSelect: (formattedAcquisitionDate?: string) => void;
};

type MonthGridProps = Omit<CalendarProps, 'dateRange'> & {
    /**
     * the year
     */
    year: number;
    /**
     * month number from 1 to 12
     */
    month: number;
    /**
     * abbreviation label of this month (e.g. 'O' for 'October')
     */
    abbrLabel: string;
    /**
     * number of days in this month
     */
    days: number;
};

const MonthGrid: FC<MonthGridProps> = ({
    year,
    month,
    abbrLabel,
    days,
    selectedAcquisitionDate,
    availableScenes,
    // shouldHideCloudCoverInfo,
    onSelect,
}: MonthGridProps) => {
    const dataOfImagerySceneByAcquisitionDate = useMemo(() => {
        const map: Map<string, FormattedImageryScene> = new Map();

        if (!availableScenes || !availableScenes.length) {
            return map;
        }

        for (const item of availableScenes) {
            const { formattedAcquisitionDate } = item;
            map.set(formattedAcquisitionDate, item);
        }

        return map;
    }, [availableScenes]);

    const getGridCells = () => {
        return [...new Array(days)].map((_, index) => {
            /**
             * formated date string, e.g., '2023-05-02'
             */
            const formatedDateStr = getFormatedDateString({
                year,
                month,
                day: index + 1,
            });

            const dataOfImageryScene =
                dataOfImagerySceneByAcquisitionDate.get(formatedDateStr);

            /**
             * if true, there is a available scene for this day
             */
            const hasAvailableData = dataOfImageryScene !== undefined;

            const isSelected = formatedDateStr === selectedAcquisitionDate;

            /**
             * data atrributes that will be used for testing, monitoring purposes
             */
            const dataProps: { [key: string]: string } = {
                'data-testid': 'calendar-cell-' + formatedDateStr,
            };

            if (hasAvailableData) {
                dataProps['data-element'] =
                    'calendar-cell-with-available-scene';
            }

            return (
                <div
                    className={classNames('relative h-2 w-2 border group', {
                        'cursor-pointer': isSelected || hasAvailableData,
                        'border-custom-calendar-border': isSelected === false,
                        'bg-custom-calendar-background-selected': isSelected,
                        'border-custom-calendar-border-selected': isSelected,
                        // 'drop-shadow-custom-light-blue': isSelected,
                        'border-custom-calendar-border-available':
                            isSelected === false &&
                            hasAvailableData &&
                            dataOfImageryScene?.doesNotMeetCriteria === true,
                        'bg-custom-calendar-background-available':
                            isSelected === false &&
                            hasAvailableData &&
                            dataOfImageryScene?.doesNotMeetCriteria === false,
                        'border-custom-calendar-background-available':
                            isSelected === false &&
                            hasAvailableData &&
                            dataOfImageryScene?.doesNotMeetCriteria === false,
                    })}
                    style={{
                        // why do not use drop-shadow? It seems the drop shadow get applied to child elements,
                        // which is not what we want, but box shadow doesn't.
                        boxShadow: isSelected
                            ? `0 0 4px var(--custom-light-blue)`
                            : '',
                    }}
                    key={index}
                    {...dataProps}
                    // title={formatedDateStr}
                    onClick={() => {
                        // unselect if this date is already selected
                        if (isSelected) {
                            onSelect('');
                            return;
                        }

                        // cannot be selected if this date has no available data
                        if (!hasAvailableData) {
                            return;
                        }

                        onSelect(formatedDateStr);
                    }}
                >
                    {hasAvailableData && (
                        <div
                            data-testid={`calendar-cell-tooltip-${formatedDateStr}`}
                            className={`
                                absolute bottom-[-30px] left-5 w-[90px] py-[2px] text-xs z-50
                                bg-custom-background border border-custom-light-blue-50  
                                hidden group-hover:block
                            `}
                        >
                            <span>{dataOfImageryScene.satellite}</span>
                            <br />
                            <span>
                                {formatInUTCTimeZone(
                                    dataOfImageryScene.acquisitionDate
                                )}
                            </span>
                            <br />
                            {dataOfImageryScene?.customTooltipText
                                ? dataOfImageryScene?.customTooltipText.map(
                                      (text) => {
                                          return (
                                              <div key={text}>
                                                  <span>{text}</span>
                                              </div>
                                          );
                                      }
                                  )
                                : null}
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div
            className="text-center mx-1"
            data-testid={`month-grid-${year}-${month}`}
        >
            <h4 className="text-sm text-custom-light-blue-80 mb-1">
                {abbrLabel}
            </h4>
            <div className={classNames('grid grid-cols-4 gap-[2px]')}>
                {getGridCells()}
            </div>
        </div>
    );
};

/**
 * This calendar component enables filtering of the imagery layer and visualization of
 * additional information, such as dates with available data and those with cloudy conditions.
 * @returns
 */
const Calendar: FC<CalendarProps> = ({
    dateRange,
    selectedAcquisitionDate,
    availableScenes,
    // shouldHideCloudCoverInfo,
    onSelect,
}: CalendarProps) => {
    const { startDate, endDate } = dateRange;

    const startYear = getYearFromFormattedDateString(startDate);

    const endYear = getYearFromFormattedDateString(endDate);

    let monthGrids: React.ReactNode[] = [];

    // Start date and End date fall into the same year,
    // just render the normal calendar start from Jan thru Dec for the year in the input date range
    if (startYear === endYear) {
        const year = startYear;

        monthGrids = MonthData.map((d, index) => {
            const month = index + 1;

            return (
                <MonthGrid
                    year={year}
                    month={index + 1}
                    key={`${year}-${month}`}
                    abbrLabel={getMonthAbbrName(month)}
                    days={getNumberOfDays(year, month)}
                    selectedAcquisitionDate={selectedAcquisitionDate}
                    availableScenes={availableScenes}
                    // shouldHideCloudCoverInfo={shouldHideCloudCoverInfo}
                    onSelect={onSelect}
                />
            );
        });
    } else {
        const monthOfStartDate = getMonthFromFormattedDateString(startDate);
        const monthOfEndDate = getMonthFromFormattedDateString(endDate);

        for (let month = monthOfStartDate; month <= 12; month++) {
            monthGrids.push(
                <MonthGrid
                    key={`${startYear}-${month}`}
                    year={startYear}
                    month={month}
                    abbrLabel={getMonthAbbrName(month)}
                    days={getNumberOfDays(startYear, month)}
                    selectedAcquisitionDate={selectedAcquisitionDate}
                    availableScenes={availableScenes}
                    // shouldHideCloudCoverInfo={shouldHideCloudCoverInfo}
                    onSelect={onSelect}
                />
            );
        }

        for (let month = 1; month <= monthOfEndDate; month++) {
            monthGrids.push(
                <MonthGrid
                    key={`${endYear}-${month}`}
                    year={endYear}
                    month={month}
                    abbrLabel={getMonthAbbrName(month)}
                    days={getNumberOfDays(endYear, month)}
                    selectedAcquisitionDate={selectedAcquisitionDate}
                    availableScenes={availableScenes}
                    // shouldHideCloudCoverInfo={shouldHideCloudCoverInfo}
                    onSelect={onSelect}
                />
            );
        }
    }

    return <div className="flex">{monthGrids}</div>;
};

export default Calendar;
