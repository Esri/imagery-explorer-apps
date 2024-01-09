import React, { useEffect, useMemo, useState } from 'react';
import { DropdownData } from '@shared/components/Dropdown';
import { useAvailableAcquisitionYears } from './useAvailableAcquisitionYears';

/**
 * This custom hook fetches the time extent of the active imagery service and finds the years that come with available data.
 * It returns these years as an array of DropdownData, suitable for use in dropdown menu options.
 *
 * @param acquisitionYear {number} The selected acquisition year.
 * @param shouldIncludePast12MonthsAsOption {boolean} If true, adds 'Past 12 Months' to the options list.
 * @returns {DropdownData[]} An array of DropdownData options representing available years.
 */
export const useAcquisitionYearsAsDropdownMenuOptions = (
    acquisitionYear: number,
    shouldIncludePast12MonthsAsOption?: boolean
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

        if (shouldIncludePast12MonthsAsOption) {
            options.push({
                value: '',
                label: 'Past 12 Months'.toUpperCase(),
                selected: acquisitionYear === null,
            });
        }

        return options.reverse();
    }, [years, acquisitionYear, shouldIncludePast12MonthsAsOption]);

    return options;
};
