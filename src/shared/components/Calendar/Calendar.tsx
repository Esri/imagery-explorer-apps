import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { MonthData, getFormatedDateString, isLeapYear } from './helpers';

/**
 *
 */
type AcquisitionDateData = {
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
};

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
     * array of acquisition dates
     */
    acquisitionDates?: AcquisitionDateData[];
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
    acquisitionDates,
}: MonthGridProps) => {
    const acquisitionDatesMap = useMemo(() => {
        const map: Map<string, AcquisitionDateData> = new Map();

        if (!acquisitionDates || !acquisitionDates.length) {
            return map;
        }

        for (const item of acquisitionDates) {
            const { formattedAcquisitionDate } = item;
            map.set(formattedAcquisitionDate, item);
        }

        return map;
    }, [acquisitionDates]);

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

            const acquisitionDate = acquisitionDatesMap.get(formatedDateStr);

            /**
             * if true, there is a available scene for this date
             */
            const hasAvailableData = acquisitionDate !== undefined;

            return (
                <div
                    className={classNames('h-2 w-2 border', {
                        'cursor-pointer':
                            formatedDateStr === selectedDate ||
                            hasAvailableData,
                        'border-custom-calendar-border':
                            formatedDateStr !== selectedDate,
                        'bg-custom-calendar-background-selected':
                            formatedDateStr === selectedDate,
                        'border-custom-calendar-border-selected':
                            formatedDateStr === selectedDate ||
                            (hasAvailableData &&
                                acquisitionDate?.isCloudy === true),
                        'bg-custom-calendar-background-available':
                            hasAvailableData &&
                            acquisitionDate?.isCloudy === false,
                        'border-custom-calendar-background-available':
                            hasAvailableData &&
                            acquisitionDate?.isCloudy === false,
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
    acquisitionDates,
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
                        acquisitionDates={acquisitionDates}
                    />
                );
            })}
        </div>
    );
};

export default Calendar;
