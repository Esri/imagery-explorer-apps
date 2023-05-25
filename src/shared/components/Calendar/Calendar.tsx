import classNames from 'classnames';
import React, { FC, useMemo } from 'react';
import { MonthData, isLeapYear } from './helpers';
import { getFormatedDateString } from '@shared/utils/snippets/formatDateString';

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
    selectedAcquisitionDate: string;
    /**
     * Array of dates with available imagery data, these dates will be rendered using different style on the Calendar
     * so that the user can know there are available data on these days
     */
    acquisitionDates?: AcquisitionDateData[];
    /**
     * Fires when user select a new acquisition date
     * @param date date string in format of (YYYY-MM-DD)
     * @returns
     */
    onSelect: (formattedAcquisitionDate?: string) => void;
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
    selectedAcquisitionDate,
    acquisitionDates,
    onSelect,
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

            const isSelected = formatedDateStr === selectedAcquisitionDate;

            return (
                <div
                    className={classNames('h-2 w-2 border', {
                        'cursor-pointer': isSelected || hasAvailableData,
                        'border-custom-calendar-border':
                            formatedDateStr !== selectedAcquisitionDate,
                        'bg-custom-calendar-background-selected': isSelected,
                        'border-custom-calendar-border-selected':
                            isSelected ||
                            (hasAvailableData &&
                                acquisitionDate?.isCloudy === true),
                        'bg-custom-calendar-background-available':
                            isSelected === false &&
                            hasAvailableData &&
                            acquisitionDate?.isCloudy === false,
                        'border-custom-calendar-background-available':
                            isSelected === false &&
                            hasAvailableData &&
                            acquisitionDate?.isCloudy === false,
                    })}
                    key={index}
                    data-testid={formatedDateStr}
                    title={formatedDateStr}
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
    selectedAcquisitionDate,
    acquisitionDates,
    onSelect,
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
                        selectedAcquisitionDate={selectedAcquisitionDate}
                        acquisitionDates={acquisitionDates}
                        onSelect={onSelect}
                    />
                );
            })}
        </div>
    );
};

export default Calendar;
