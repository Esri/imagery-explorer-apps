import React, { useEffect, useMemo, useState } from 'react';
import { DropdownData } from '@shared/components/Dropdown';
import { useAvailableAcquisitionYears } from './useAvailableAcquisitionYears';

export const useAcquisitionYearsAsDropdownMenuOptions = (
    acquisitionYear: number
): DropdownData[] => {
    /**
     * Array of years derived from the data obtained from the chosen imagery service.
     *
     * This custom hook fetches the time extent data of an Imagery Service
     * and returns an array of years (in the format of YYYY) that covers
     * all years starting from the start date through the year of the end date.
     */
    const years = useAvailableAcquisitionYears();

    const options: DropdownData[] = useMemo(() => {
        if (!years || !years.length) {
            return [];
        }

        const options: DropdownData[] = years.map((year) => {
            const value = year.toString();

            return {
                value,
                selected: year === acquisitionYear,
            };
        });

        options.push({
            value: '',
            label: 'Past 12 Months'.toUpperCase(),
            selected: acquisitionYear === null,
        });

        return options.reverse();
    }, [years, acquisitionYear]);

    return options;
};
