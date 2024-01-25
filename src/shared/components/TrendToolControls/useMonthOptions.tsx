import React, { useMemo } from 'react';
import { DropdownData } from '@shared/components/Dropdown';

const MONTH_ABBR = [
    'JAN',
    'FEB',
    'MAR',
    'APR',
    'MAY',
    'JUN',
    'JUL',
    'AUG',
    'SEP',
    'OCT',
    'NOV',
    'DEC',
];

export const useMonthOptions = (selectedMonth: number): DropdownData[] => {
    const monthOptions = useMemo(() => {
        const options = MONTH_ABBR.map((label, index) => {
            const month = index + 1;

            return {
                value: month.toString(),
                label,
                selected: selectedMonth === month,
            };
        });

        return options;
    }, [selectedMonth]);

    return monthOptions;
};
