import React, { useMemo } from 'react';
import { DropdownData } from '../../../shared/components/Dropdown/Dropdown';
import { useSelector } from 'react-redux';
import { selectAcquisitionMonth } from '../../../shared/store/Landsat/selectors';

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
    const acquisitionMonth = useSelector(selectAcquisitionMonth);

    const monthOptions = useMemo(() => {
        const options = MONTH_ABBR.map((label, index) => {
            const month = index + 1;

            return {
                value: month.toString(),
                label,
                selected: acquisitionMonth === month,
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