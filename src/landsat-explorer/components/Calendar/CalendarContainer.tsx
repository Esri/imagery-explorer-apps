import React, { useEffect, useMemo, useState } from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
// import { selectMapCenter } from '../../../shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '../../../shared/components/Dropdown';
import { useMonthOptions } from './useMonthOptions';
import { useYearOptions } from './useYearOptions';
import { useDispatch } from 'react-redux';
import { selectLandsatQueryParams4SelectedMode } from '../../../shared/store/Landsat/selectors';
import useAvailableScenes from './useAvailableScenes';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';
import {
    updateAcquisitionDate,
    updateAcquisitionMonth,
    updateAcquisitionYear,
    updateObjectIdOfSelectedScene,
} from '../../../shared/store/Landsat/thunks';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const { acquisitionYear, acquisitionDate } = useSelector(
        selectLandsatQueryParams4SelectedMode
    );

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
            (d) => d.formattedAcquisitionDate === acquisitionDate
        );
        dispatch(
            updateObjectIdOfSelectedScene(selectedScene?.objectId || null)
        );
    }, [availableScenes, acquisitionDate]);

    return (
        <div className="mx-4">
            <div className="flex mb-1 items-center">
                <div className="mr-2">
                    <Dropdown
                        data={yearOptions}
                        onChange={(year) => {
                            // select year
                            dispatch(updateAcquisitionYear(+year));
                        }}
                    />
                </div>

                <div className="mr-2">
                    <Dropdown
                        data={monthOptions}
                        onChange={(month) => {
                            // select month
                            dispatch(updateAcquisitionMonth(+month));
                        }}
                    />
                </div>

                <AcquisitionDateLabel acquisitionDate={acquisitionDate} />
            </div>

            <Calendar
                year={acquisitionYear}
                selectedAcquisitionDate={acquisitionDate}
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
                    dispatch(updateAcquisitionDate(formattedAcquisitionDate));
                }}
            />
        </div>
    );
};

export default CalendarContainer;
