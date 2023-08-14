import React, { useMemo } from 'react';
import { DropdownData } from '@shared/components/Dropdown';

export const useAnnualResolutionOptions = (
    annualResolution: number
): DropdownData[] => {
    const options = useMemo(() => {
        const options = [1, 3, 5].map((value, index) => {
            return {
                value: value.toString(),
                label: `${value} YEAR`,
                selected: annualResolution === value,
            };
        });

        return options;
    }, [annualResolution]);

    return options;
};
