import React, { useMemo } from 'react';
import { DropdownData } from '../../../shared/components/Dropdown/Dropdown';

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

export const useMonthOptions = (): DropdownData[] => {
    const monthOptions = useMemo(() => {
        const options = MONTH_ABBR.map((label, index) => {
            const month = index + 1;

            return {
                value: month.toString(),
                label,
                selected: false,
            };
        });

        return [
            {
                value: '',
                label: 'All Months',
                selected: false,
            },
            ...options,
        ];
    }, []);

    return monthOptions;
};
