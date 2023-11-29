import React, { useEffect, useMemo, useState } from 'react';
import { DropdownData } from '@shared/components/Dropdown';
import { getTimeExtent as getTimeExtentOfLandsatService } from '@shared/services/landsat-level-2/getTimeExtent';
import { ImageryServiceTimeExtentData } from '@typing/imagery-service';

export const useAcquisitionYearsAsDropdownMenuOptions = (
    acquisitionYear: number
): DropdownData[] => {
    // const { acquisitionYear } =
    //     useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [years, setYears] = useState<number[]>([]);

    const options = useMemo(() => {
        if (!years || !years.length) {
            return [];
        }

        return years
            .map((year) => {
                const value = year.toString();

                return {
                    value,
                    selected: year === acquisitionYear,
                };
            })
            .reverse();
    }, [years, acquisitionYear]);

    useEffect(() => {
        (async () => {
            try {
                let timeExtentData: ImageryServiceTimeExtentData = null;

                if (APP_NAME === 'landsat') {
                    timeExtentData = await getTimeExtentOfLandsatService();
                }

                if (!timeExtentData) {
                    throw new Error(
                        'no time extent is found for the imagery service'
                    );
                }

                const { start, end } = timeExtentData;

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
