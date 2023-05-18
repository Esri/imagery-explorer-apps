import React, { useEffect, useMemo, useState } from 'react';
import Calendar from '../../../shared/components/Calendar/Calendar';
// import { selectMapCenter } from '../../../shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '../../../shared/components/Dropdown';
import { useMonthOptions } from './useMonthOptions';
import { useYearOptions } from './useYearOptions';
import { useDispatch } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '../../../shared/store/Landsat/selectors';
import useAvailableScenes from './useAvailableScenes';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';
import {
    updateAcquisitionDate,
    // updateAcquisitionMonth,
    updateAcquisitionYear,
} from '../../../shared/store/Landsat/thunks';
import { getCurrentYear } from '../../../shared/utils/snippets/getCurrentYear';
import classNames from 'classnames';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDate = queryParams?.acquisitionDate;

    const acquisitionYear = queryParams?.acquisitionYear || getCurrentYear();

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
        <div
            className={classNames('mx-4', {
                'is-disabled': !queryParams,
            })}
        >
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
                            // dispatch(updateAcquisitionMonth(+month));
                            console.log(month);
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
