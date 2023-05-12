import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { MonthData, getFormatedDateString, isLeapYear } from './helpers';

type CalendarProps = {
    /**
     * the selected year of the calendar app
     */
    year: number;
    /**
     * Selected imagery acquisition date as a string in format of (YYYY-MM-DD)
     * @example `2023-05-03`
     */
    selectedDate: string;
    /**
     * array of dates in format of (YYYY-MM-DD) that contains updates of selected imagery service
     * @example [`2023-01-03`, `2023-01-10`, `2023-01-17`, `2023-01-14`, ...]
     */
    availableDates: string[];
    /**
     * array of dates in format of (YYYY-MM-DD) that contains updates of selected imagery service with could covers
     * @example [`2023-02-05`, `2023-05-10`, `2023-07-17`, ...]
     */
    cloudyDates: string[];
};

type MonthGridProps = CalendarProps & {
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
    selectedDate,
    availableDates,
    cloudyDates,
}: MonthGridProps) => {
    const setOfAvailableDates = useMemo(() => {
        return new Set(availableDates);
    }, [availableDates]);

    const setOfCloudyDates = useMemo(() => {
        return new Set(cloudyDates);
    }, [cloudyDates]);

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

            return (
                <div
                    className={classNames('h-2 w-2 border', {
                        'cursor-pointer':
                            formatedDateStr === selectedDate ||
                            setOfCloudyDates.has(formatedDateStr) ||
                            setOfAvailableDates.has(formatedDateStr),
                        'border-custom-calendar-border':
                            formatedDateStr !== selectedDate,
                        'bg-custom-calendar-background-selected':
                            formatedDateStr === selectedDate,
                        'border-custom-calendar-border-selected':
                            formatedDateStr === selectedDate ||
                            setOfCloudyDates.has(formatedDateStr),
                        'bg-custom-calendar-background-available':
                            setOfAvailableDates.has(formatedDateStr),
                        'border-custom-calendar-background-available':
                            setOfAvailableDates.has(formatedDateStr),
                    })}
                    key={index}
                    data-testid={formatedDateStr}
                    title={formatedDateStr}
                ></div>
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
    year,
    selectedDate,
    availableDates,
    cloudyDates,
}: CalendarProps) => {
    return (
        <div className="flex">
            {MonthData.map((d, index) => {
                // adjust number of days in February if it is a leap year
                const days =
                    d.label === 'February' && isLeapYear(year) ? 29 : d.days;

                return (
                    <MonthGrid
                        year={year}
                        month={index + 1}
                        key={d.label}
                        abbrLabel={d.abbrLabel}
                        days={days}
                        selectedDate={selectedDate}
                        availableDates={availableDates}
                        cloudyDates={cloudyDates}
                    />
                );
            })}
        </div>
    );
};

export default Calendar;
