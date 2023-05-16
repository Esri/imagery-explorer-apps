import React, { useEffect, useMemo, useState } from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
// import { selectMapCenter } from '../../../shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '../../../shared/components/Dropdown';
import { useMonthOptions } from './useMonthOptions';
import { useYearOptions } from './useYearOptions';
import { useDispatch } from 'react-redux';
import {
    acquisitionDateChanged,
    acquisitionMonthChanged,
    acquisitionYearChanged,
    objectIdOfSelectedSceneChanged,
} from '../../../shared/store/Landsat/reducer';
import {
    selectAcquisitionDate,
    // selectAcquisitionMonth,
    selectAcquisitionYear,
} from '../../../shared/store/Landsat/selectors';
import useAvailableScenes from './useAvailableScenes';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const acquisitionYear = useSelector(selectAcquisitionYear);

    const selectedAcquisitionDate = useSelector(selectAcquisitionDate);

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

    useEffect(() => {
        const selectedScene = availableScenes.find(
            (d) => d.formattedAcquisitionDate === selectedAcquisitionDate
        );
        dispatch(
            objectIdOfSelectedSceneChanged(selectedScene?.objectId || null)
        );
    }, [availableScenes, selectedAcquisitionDate]);

    return (
        <div className="mx-4">
            <div className="flex mb-1 items-center">
                <div className="mr-2">
                    <Dropdown
                        data={yearOptions}
                        onChange={(year) => {
                            // select year
                            dispatch(acquisitionYearChanged(+year));
                        }}
                    />
                </div>

                <div className="mr-2">
                    <Dropdown
                        data={monthOptions}
                        onChange={(month) => {
                            // select month
                            dispatch(acquisitionMonthChanged(+month));
                        }}
                    />
                </div>

                <AcquisitionDateLabel
                    acquisitionDate={selectedAcquisitionDate}
                />
            </div>

            <Calendar
                year={acquisitionYear}
                selectedAcquisitionDate={selectedAcquisitionDate}
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
                onSelect={(formattedAcquisitionDate) => {
                    // console.log(formattedAcquisitionDate)
                    dispatch(acquisitionDateChanged(formattedAcquisitionDate));
                }}
            />
        </div>
    );
};

export default CalendarContainer;
