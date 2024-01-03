import { APP_NAME } from '@shared/config';
import { ImageryServiceTimeExtentData } from '@typing/imagery-service';
import React, { useEffect, useState } from 'react';
import { getTimeExtent as getTimeExtentOfLandsatService } from '@shared/services/landsat-level-2/getTimeExtent';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';

/**
 * This custom hook retrieves the time extent data of an Imagery Service
 * and generates an array of years (in the YYYY format) encompassing
 * all the years from the initial start date to the end date.
 * @returns {number[]} Array of years
 */
export const useAvailableAcquisitionYears = () => {
    const [years, setYears] = useState<number[]>([]);

    const getTimeExtentData =
        async (): Promise<ImageryServiceTimeExtentData> => {
            if (APP_NAME === 'landsat' || APP_NAME === 'landsat-surface-temp') {
                return await getTimeExtentOfLandsatService();
            }

            if (APP_NAME === 'spectral-sampling-tool') {
                return await getTimeExtentOfLandsatService();
            }
        };

    useEffect(() => {
        (async () => {
            try {
                const timeExtentData: ImageryServiceTimeExtentData =
                    await getTimeExtentData();

                if (!timeExtentData) {
                    console.log(
                        'no time extent is found for the imagery service'
                    );

                    return;
                }

                // Extract start and end dates (in format of unix epoch timestamp) from the time extent data
                const { start, end } = timeExtentData;

                const years: number[] = [];

                const startYear = new Date(start).getFullYear();

                const endYear = getCurrentYear(); //new Date(end).getFullYear();

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

    return years;
};
