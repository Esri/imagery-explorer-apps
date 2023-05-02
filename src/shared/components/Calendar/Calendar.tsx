import React, { FC } from 'react';

const MonthData = [
    {
        abbrLabel: 'J',
        days: 31,
    },
    {
        abbrLabel: 'F',
        days: 28,
    },
    {
        abbrLabel: 'M',
        days: 31,
    },
    {
        abbrLabel: 'A',
        days: 30,
    },
    {
        abbrLabel: 'M',
        days: 31,
    },
    {
        abbrLabel: 'J',
        days: 30,
    },
    {
        abbrLabel: 'J',
        days: 31,
    },
    {
        abbrLabel: 'J',
        days: 31,
    },
    {
        abbrLabel: 'S',
        days: 30,
    },
    {
        abbrLabel: 'O',
        days: 31,
    },
    {
        abbrLabel: 'N',
        days: 30,
    },
    {
        abbrLabel: 'D',
        days: 31,
    },
];

type MonthGridProps = {
    /**
     * abbreviation label of this month (e.g. 'O' for 'October')
     */
    abbrLabel: string;
    /**
     * number of days in this month
     */
    days: number;
};

const MonthGrid: FC<MonthGridProps> = ({ abbrLabel, days }: MonthGridProps) => {
    const getGridCells = () => {
        return [...new Array(days)].map((_, index) => {
            return (
                <div
                    className="h-2 w-2 border border-opacity-50"
                    key={index}
                ></div>
            );
        });
    };

    return (
        <div className="text-center border mx-1">
            <h4>{abbrLabel}</h4>
            <div className="grid grid-cols-4 gap-[1px]">{getGridCells()}</div>
        </div>
    );
};

/**
 * Calendar component to display a grid for all 12 months of the input year
 * @returns
 */
const Calendar = () => {
    return (
        <div className="flex">
            {MonthData.map((d, index) => {
                return (
                    <MonthGrid
                        key={index}
                        abbrLabel={d.abbrLabel}
                        days={d.days}
                    />
                );
            })}
        </div>
    );
};

export default Calendar;
