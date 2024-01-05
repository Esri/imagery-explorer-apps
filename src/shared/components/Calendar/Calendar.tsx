import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { MonthData, isLeapYear } from './helpers';
import {
    getFormatedDateString,
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
     * if true, this date should be rendered using the style of cloudy day
     */
    isCloudy: boolean;
    /**
     * percent of cloud coverage of the selected Imagery Scene acquired on this day
     */
    cloudCover: number;
    /**
     * name of the satellite (e.g., `Landsat-7`)
     */
    satellite: string;
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
                            dataOfImageryScene?.isCloudy === true,
                        'bg-custom-calendar-background-available':
                            isSelected === false &&
                            hasAvailableData &&
                            dataOfImageryScene?.isCloudy === false,
                        'border-custom-calendar-background-available':
                            isSelected === false &&
                            hasAvailableData &&
                            dataOfImageryScene?.isCloudy === false,
                    })}
                    style={{
                        // why do not use drop-shadow? It seems the drop shadow get applied to child elements,
                        // which is not what we want, but box shadow doesn't.
                        boxShadow: isSelected
                            ? `0 0 4px var(--custom-light-blue)`
                            : '',
                    }}
                    key={index}
                    data-testid={formatedDateStr}
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
                            <span>{dataOfImageryScene.cloudCover}% Cloudy</span>
                        </div>
                    )}
                </div>
            );
        });
    };

    return (
        <div className="text-center mx-1">
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
    onSelect,
}: CalendarProps) => {
    const { startDate, endDate } = dateRange;

    const startYear = getYearFromFormattedDateString(startDate);

    const endYear = getYearFromFormattedDateString(endDate);

    // Start date and End date fall into the same year,
    // just render the normal calendar start from Jan thru Dec for the year in the input date range
    if (startYear === endYear) {
        const year = startYear;

        return (
            <div className="flex">
                {MonthData.map((d, index) => {
                    // adjust number of days in February if it is a leap year
                    const days =
                        d.label === 'February' && isLeapYear(year)
                            ? 29
                            : d.days;

                    return (
                        <MonthGrid
                            year={year}
                            month={index + 1}
                            key={d.label}
                            abbrLabel={d.abbrLabel}
                            days={days}
                            selectedAcquisitionDate={selectedAcquisitionDate}
                            availableScenes={availableScenes}
                            onSelect={onSelect}
                        />
                    );
                })}
            </div>
        );
    }
};

export default Calendar;
