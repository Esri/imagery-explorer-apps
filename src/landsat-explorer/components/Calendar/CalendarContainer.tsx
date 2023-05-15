import React, { useEffect, useMemo, useState } from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
import { selectMapCenter } from '../../../shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import {
    getLandsatScenes,
    LandsatScene,
} from '../../services/landsat-2/getLandsatScenes';
import { usePrevious } from '../../../shared/hooks/usePrevious';
import { Dropdown } from '../../../shared/components/Dropdown';

const CalendarContainer = () => {
    const center = useSelector(selectMapCenter);

    /**
     * track the previous value of map center, which will be used to prevent triggering duplicated network request
     */
    const prevCenter = usePrevious(center);

    /**
     * available landsat scenes that intersect with input map geometry and were acquired during the input year and month.
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
            // abort if the new value of map center is the same as the previous value
            if (JSON.stringify(center) === JSON.stringify(prevCenter)) {
                return;
            }

            const scenes = await getLandsatScenes({
                year: 2023,
                mapPoint: center,
                cloudCover: 1,
            });

            setAvailableScenes(scenes);
        })();
    }, [center]);

    return (
        <div className="mx-4">
            <div className="flex mb-1">
                <Dropdown
                    data={[
                        {
                            value: '2019',
                            label: '2019',
                            selected: true,
                        },
                        {
                            value: '2020',
                            label: '2020',
                            selected: false,
                        },
                    ]}
                    onChange={(year) => {
                        // select year
                    }}
                />

                <Dropdown
                    data={[
                        {
                            value: '',
                            label: 'All Months',
                            selected: true,
                        },
                        {
                            value: '1',
                            label: '1',
                            selected: false,
                        },
                        {
                            value: '2',
                            label: '2',
                            selected: false,
                        },
                    ]}
                    onChange={(month) => {
                        // select month
                    }}
                />
            </div>

            <Calendar
                year={2023}
                selectedDate=""
                availableDates={availableDates}
                cloudyDates={cloudyDates}
            />
        </div>
    );
};

export default CalendarContainer;
