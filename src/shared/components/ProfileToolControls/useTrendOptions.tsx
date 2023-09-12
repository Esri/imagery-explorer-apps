import React, { useMemo } from 'react';
import { DropdownData } from '@shared/components/Dropdown';
import { TrendToolOption } from '@shared/store/TrendTool/reducer';

const TrendOptions: {
    value: TrendToolOption;
    label: string;
}[] = [
    {
        value: 'year-to-year',
        label: 'Yearly'.toUpperCase(),
    },
    {
        value: 'month-to-month',
        label: 'Monthly'.toUpperCase(),
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
