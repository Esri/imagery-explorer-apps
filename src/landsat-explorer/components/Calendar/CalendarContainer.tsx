import React, { useEffect, useMemo, useState } from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
// import { selectMapCenter } from '../../../shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '../../../shared/components/Dropdown';
import { useMonthOptions } from './useMonthOptions';
import { useYearOptions } from './useYearOptions';
import { useDispatch } from 'react-redux';
import {
    acquisitionMonthChanged,
    acquisitionYearChanged,
} from '../../../shared/store/Landsat/reducer';
import {
    // selectAcquisitionMonth,
    selectAcquisitionYear,
} from '../../../shared/store/Landsat/selectors';
import useAvailableScenes from './useAvailableScenes';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const acquisitionYear = useSelector(selectAcquisitionYear);

    /**
     * landsat scenes that intersect with the map center
     */
    const { availableScenes } = useAvailableScenes();

    /**
     * options that will be used to populate the Dropdown Menu for month
     */
    const monthOptions = useMonthOptions();

    /**
     * options that will be used to populate the Dropdown Menu for year
     */
    const yearOptions = useYearOptions();

    return (
        <div className="mx-4">
            <div className="flex mb-1">
                <Dropdown
                    data={yearOptions}
                    onChange={(year) => {
                        // select year
                        dispatch(acquisitionYearChanged(+year));
                    }}
                />

                <Dropdown
                    data={monthOptions}
                    onChange={(month) => {
                        // select month
                        dispatch(acquisitionMonthChanged(+month));
                    }}
                />
            </div>

            <Calendar
                year={acquisitionYear}
                selectedDate=""
                acquisitionDates={availableScenes.map((scene) => {
                    const {
                        formattedAcquisitionDate,
                        acquisitionDate,
                        isCloudy,
                    } = scene;
                    return {
                        formattedAcquisitionDate,
                        acquisitionDate,
                        isCloudy,
                    };
                })}
            />
        </div>
    );
};

export default CalendarContainer;
