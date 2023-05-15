import React, { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { selectAcquisitionYear } from '../../../shared/store/Landsat/selectors';
import { selectMapCenter } from '../../../shared/store/Map/selectors';
import {
    LandsatScene,
    getLandsatScenes,
} from '../../services/landsat-2/getLandsatScenes';

/**
 * This custom hook queries the landsat service and find dates that came with
 * landsat scenes that intersect with the center of the map screen
 * @returns
 */
const useAvailableDates = () => {
    const acquisitionYear = useSelector(selectAcquisitionYear);

    /**
     * current map center
     */
    const center = useSelector(selectMapCenter);

    /**
     * available landsat scenes that intersect with input map geometry and were acquired during the input year.
     */
    const [availableScenes, setAvailableScenes] = useState<LandsatScene[]>([]);

    const [availableDates, cloudyDates] = useMemo(() => {
        /**
         * array of formatted AcquisitionDate that comes with landsat scenes without cloud coverage
         *
         * @example
         * [`2023-01-03`, `2023-01-10`, `2023-01-17`, `2023-01-14`, ...]
         */
        const availableDates: string[] = [];

        /**
         * array of formatted AcquisitionDate that comes with landsat scenes with cloud coverage
         *
         * @example
         * [`2023-01-03`, `2023-01-10`, `2023-01-17`, `2023-01-14`, ...]
         */
        const cloudyDates: string[] = [];

        for (const scene of availableScenes) {
            const { formattedAcquisitionDate, isCloudy } = scene;

            // make sure to not push duplicated values to the output
            if (
                isCloudy === false &&
                availableDates[availableDates.length - 1] !==
                    formattedAcquisitionDate
            ) {
                availableDates.push(formattedAcquisitionDate);
            }

            if (
                isCloudy &&
                cloudyDates[cloudyDates.length - 1] !== formattedAcquisitionDate
            ) {
                cloudyDates.push(formattedAcquisitionDate);
            }
        }

        return [availableDates, cloudyDates];
    }, [availableScenes]);

    useEffect(() => {
        (async () => {
            const scenes = await getLandsatScenes({
                year: acquisitionYear,
                mapPoint: center,
                cloudCover: 1,
            });

            setAvailableScenes(scenes);
        })();
    }, [center, acquisitionYear]);

    return {
        availableDates,
        cloudyDates,
    };
};

export default useAvailableDates;
