import React, { useEffect, useMemo, useState } from 'react';
import Calendar, { FormattedImageryScene } from './Calendar';
// import { selectMapCenter } from '@shared/store/Map/selectors';
import { useSelector } from 'react-redux';
import { Dropdown } from '@shared/components/Dropdown';
// import { useMonthOptions } from './useMonthOptions';
import { useAcquisitionYearsAsDropdownMenuOptions } from '@shared/hooks/useAcquisitionYearsAsDropdownMenuOptions';
import { useDispatch } from 'react-redux';
import {
    // selectAcquisitionYear,
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';
import {
    updateAcquisitionDate,
    updateAcquisitionDateRange,
    // updateCloudCover,
} from '@shared/store/ImageryScene/thunks';
import classNames from 'classnames';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { CloudFilter } from '@shared/components/CloudFilter';
import {
    // acquisitionYearChanged,
    cloudCoverChanged,
} from '@shared/store/ImageryScene/reducer';
import { LandsatMissionFilter } from '../LandsatMissionFilter';
import { APP_NAME } from '@shared/config';
import { useFindSelectedSceneByDate } from './useFindSelectedSceneByDate';
import { useAcquisitionDateFromSelectedScene } from './useAcquisitionDateFromSelectedScene';
import { useFormattedScenes } from './useFormattedScenes';
import { useShouldDisableCalendar } from './useShouldDisableCalendar';
import { getDateRangeForYear } from '@shared/utils/date-time/getTimeRange';
import { useAcquisitionYear } from './useAcquisitionYear';
// import { useUpdateAcquisitionYear } from './useUpdateAcquisitionYear';

const CalendarContainer = () => {
    const dispatch = useDispatch();

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const isAnimationPlaying = useSelector(selectIsAnimationPlaying);

    const acquisitionDate = queryParams?.acquisitionDate;

    const cloudCoverThreshold = useSelector(selectCloudCover);

    const acquisitionYear = useAcquisitionYear();

    /**
     * This custom hook gets invoked whenever the available scenes and acquisition date changes,
     * it tries to find the selected imagery scene that was acquired from the selected acquisition date
     */
    useFindSelectedSceneByDate();

    /**
     * The acquisition date of the selected scene to highlight it on the calendar.
     *
     * This hook finds the scene from the available scenes list that has the acquisition date matching the user-selected acquisition date.
     *
     * If no scene is found in the available scenes list, the user-selected date won't be returned so it does not get highlighted in the calendar,
     * indicating that they need to select another date to choose a scene.
     * If a scene is found, its acquisition date is returned for highlighting.
     */
    const selectedAcquisitionDate: string =
        useAcquisitionDateFromSelectedScene();

    /**
     * This custom hook retrieves a list of available imagery scenes that intersect with the map center and were acquired during the input year.
     * It formats these scenes into `FormattedImageryScene[]` format suitable for populating the Calendar component.
     */
    const formattedScenes: FormattedImageryScene[] = useFormattedScenes();

    /**
     * options that will be used to populate the Dropdown Menu for year
     */
    const yearOptions =
        useAcquisitionYearsAsDropdownMenuOptions(acquisitionYear);

    /**
     * if true, Calendar should be disbaled
     */
    const shouldBeDisabled = useShouldDisableCalendar();

    // /**
    //  * This custom hook is triggered whenever the user-selected acquisition date changes.
    //  * It updates the user-selected year based on the year from the selected acquisition date.
    //  */
    // useUpdateAcquisitionYear();

    return (
        <div
            className={classNames('select-none', {
                'is-disabled': shouldBeDisabled,
            })}
        >
            <div className="text-center mb-2">
                <span className="uppercase text-sm">Scene Selection</span>
            </div>

            <div className="flex mb-2 items-center justify-between">
                <div className="flex items-center flex-grow">
                    <Dropdown
                        data={yearOptions}
                        onChange={(year) => {
                            // setAcquisitionYear(+year);
                            // dispatch(acquisitionYearChanged(+year));
                            dispatch(
                                updateAcquisitionDateRange(
                                    getDateRangeForYear(+year)
                                )
                            );
                        }}
                    />

                    <AcquisitionDateLabel
                        acquisitionDate={acquisitionDate}
                        closeBtnOnClick={() => {
                            dispatch(updateAcquisitionDate(''));
                        }}
                    />
                </div>

                {APP_NAME === 'landsat' && <LandsatMissionFilter />}

                <CloudFilter
                    cloudCoverage={cloudCoverThreshold}
                    disabled={
                        cloudCoverThreshold === undefined || isAnimationPlaying
                    }
                    onChange={(newValue) => {
                        dispatch(cloudCoverChanged(newValue));
                    }}
                />
            </div>

            <Calendar
                year={acquisitionYear}
                // selectedAcquisitionDate={acquisitionDate}
                selectedAcquisitionDate={selectedAcquisitionDate}
                availableScenes={formattedScenes}
                onSelect={(formattedAcquisitionDate) => {
                    // console.log(formattedAcquisitionDate)
                    dispatch(updateAcquisitionDate(formattedAcquisitionDate));
                }}
            />
        </div>
    );
};

export default CalendarContainer;
