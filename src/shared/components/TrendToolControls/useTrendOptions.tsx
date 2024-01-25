import React, { useMemo } from 'react';
import { DropdownData } from '@shared/components/Dropdown';
import { TrendToolOption } from '@shared/store/TrendTool/reducer';

const TrendOptions: {
    value: TrendToolOption;
    label: string;
}[] = [
    {
        value: 'year-to-year',
        label: 'Year to Year',
    },
    {
        value: 'month-to-month',
        label: 'Month to Month',
    },
];

export const useTrendOptions = (
    selectedTrendOption: TrendToolOption
): DropdownData[] => {
    const options = useMemo(() => {
        return TrendOptions.map((d) => {
            return {
                ...d,
                selected: selectedTrendOption === d.value,
            } as DropdownData;
        });
    }, [selectedTrendOption]);

    return options;
};
