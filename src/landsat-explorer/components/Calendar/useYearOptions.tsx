import React, { useEffect, useMemo, useState } from 'react';
import { DropdownData } from '../../../shared/components/Dropdown/Dropdown';
import { getTimeExtent } from '../../services/landsat-2/getTimeExtent';

export const useYearOptions = (): DropdownData[] => {
    const [years, setYears] = useState<number[]>([]);

    const options = useMemo(() => {
        if (!years || !years.length) {
            return [];
        }

        return years.map((year) => {
            const value = year.toString();

            return {
                value,
                selected: false,
            };
        });
    }, [years]);

    useEffect(() => {
        (async () => {
            try {
                const { start, end } = await getTimeExtent();

                const years: number[] = [];

                const startYear = new Date(start).getFullYear();

                const endYear = new Date(end).getFullYear();

                let currYear = startYear;

                while (currYear <= endYear) {
                    years.push(currYear);
                    currYear++;
                }

                setYears(years);
            } catch (error) {
                console.error(error);
            }
        })();
    }, []);

    return options;
};
