import React, { useEffect, useMemo, useState } from 'react';
import { DropdownData } from '@shared/components/Dropdown';
import { getTimeExtent } from '@shared/services/landsat-2/getTimeExtent';
import { useSelector } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';

export const useYearOptions = (acquisitionYear: number): DropdownData[] => {
    // const { acquisitionYear } =
    //     useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [years, setYears] = useState<number[]>([]);

    const options = useMemo(() => {
        if (!years || !years.length) {
            return [];
        }

        return years.map((year) => {
            const value = year.toString();

            return {
                value,
                selected: year === acquisitionYear,
            };
        });
    }, [years, acquisitionYear]);

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
