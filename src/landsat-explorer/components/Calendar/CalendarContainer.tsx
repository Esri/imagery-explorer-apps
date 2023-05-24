import React, { useEffect, useMemo, useState } from 'react';
import Calendar from '@shared/components/Calendar/Calendar';
// import { selectMapCenter } from '@shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '@shared/components/Dropdown';
// import { useMonthOptions } from './useMonthOptions';
import { useYearOptions } from './useYearOptions';
import { useDispatch } from 'react-redux';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/Landsat/selectors';
import useAvailableScenes from './useAvailableScenes';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';
import {
    updateAcquisitionDate,
    // updateAcquisitionMonth,
    updateAcquisitionYear,
    updateCloudCover,
} from '@shared/store/Landsat/thunks';
import { getCurrentYear } from '@shared/utils/snippets/getCurrentYear';
import classNames from 'classnames';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { CloudFilter } from '@shared/components/CloudFilter';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const acquisitionDate = queryParams?.acquisitionDate;

    const acquisitionYear = queryParams?.acquisitionYear || getCurrentYear();

    const cloudCover = queryParams?.cloudCover;

    /**
     * landsat scenes that intersect with the map center
     */
    const { availableScenes } = useAvailableScenes();

    /**
     * options that will be used to populate the Dropdown Menu for year
     */
    const yearOptions = useYearOptions();

    return (
        <div
            className={classNames('mx-2', {
                'is-disabled': !queryParams || isAnimationPlaying,
            })}
        >
            <div className="text-center mb-2">
                <span className="uppercase text-sm">Scene Selection</span>
            </div>

            <div className="flex mb-2 items-center">
                <div className="mr-2 flex items-center flex-grow">
                    <Dropdown
                        data={yearOptions}
                        onChange={(year) => {
                            // select year
                            dispatch(updateAcquisitionYear(+year));
                        }}
                    />

                    <AcquisitionDateLabel acquisitionDate={acquisitionDate} />
                </div>

                <CloudFilter
                    cloudCoverage={cloudCover}
                    disabled={cloudCover === undefined || isAnimationPlaying}
                    onChange={(newValue) => {
                        dispatch(updateCloudCover(newValue));
                    }}
                />
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
