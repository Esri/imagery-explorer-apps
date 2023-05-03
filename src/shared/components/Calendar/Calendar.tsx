import classNames from 'classnames';
import React, { FC } from 'react';
import { getFormatedDateString, isLeapYear } from './helpers';

const MonthData = [
    {
        abbrLabel: 'J',
        days: 31,
        label: 'January',
    },
    {
        abbrLabel: 'F',
        days: 28,
        label: 'February',
    },
    {
        abbrLabel: 'M',
        days: 31,
        label: 'March',
    },
    {
        abbrLabel: 'A',
        days: 30,
        label: 'April',
    },
    {
        abbrLabel: 'M',
        days: 31,
        label: 'May',
    },
    {
        abbrLabel: 'J',
        days: 30,
        label: 'June',
    },
    {
        abbrLabel: 'J',
        days: 31,
        label: 'July',
    },
    {
        abbrLabel: 'J',
        days: 31,
        label: 'August',
    },
    {
        abbrLabel: 'S',
        days: 30,
        label: 'September',
    },
    {
        abbrLabel: 'O',
        days: 31,
        label: 'October',
    },
    {
        abbrLabel: 'N',
        days: 30,
        label: 'November',
    },
    {
        abbrLabel: 'D',
        days: 31,
        label: 'December',
    },
];

type MonthGridProps = {
    /**
     * selected year (e.g. `2023`)
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
}: MonthGridProps) => {
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
                    className={classNames(
                        'h-2 w-2 border border-custom-calendar-border'
                    )}
                    key={index}
                    data-test-id={formatedDateStr}
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

type CalendarProps = {
    /**
     * the selected year of the calendar app
     */
    year: number;
};

/**
 * This calendar component enables filtering of the imagery layer and visualization of
 * additional information, such as dates with available data and those with cloudy conditions.
 * @returns
 */
const Calendar: FC<CalendarProps> = ({ year }: CalendarProps) => {
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
                    />
                );
            })}
        </div>
    );
};

export default Calendar;
