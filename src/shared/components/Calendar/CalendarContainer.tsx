/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useEffect, useMemo, useState } from 'react';
import Calendar, { FormattedImageryScene } from './Calendar';
// import { selectMapCenter } from '@shared/store/Map/selectors';
import { useAppSelector } from '@shared/store/configureStore';
import { Dropdown } from '@shared/components/Dropdown';
// import { useMonthOptions } from './useMonthOptions';
import { useAcquisitionYearsAsDropdownMenuOptions } from '@shared/hooks/useAcquisitionYearsAsDropdownMenuOptions';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    // selectAcquisitionYear,
    selectCloudCover,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { AcquisitionDateLabel } from './AcquisitionDateLabel';
import {
    updateAcquisitionDate,
    updateAcquisitionDateRange,
    updateObjectIdOfSelectedScene,
    // updateCloudCover,
} from '@shared/store/ImageryScene/thunks';
import classNames from 'classnames';
import { useAcquisitionDateFromSelectedScene } from './useAcquisitionDateFromSelectedScene';
import { useFormattedScenes } from './useFormattedScenes';
import { useShouldDisableCalendar } from './useShouldDisableCalendar';
import {
    getDateRangeForPast12Month,
    getDateRangeForYear,
} from '@shared/utils/date-time/getTimeRange';
import { useAcquisitionYear } from './useAcquisitionYear';
import { useFindSelectedSceneByDate } from '@shared/hooks/useFindSelectedSceneByDate';
import { useTranslation } from 'react-i18next';
// import { useUpdateAcquisitionYear } from './useUpdateAcquisitionYear';

type Props = {
    children?: React.ReactNode;
};

const CalendarContainer: FC<Props> = ({ children }: Props) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDate = queryParams?.acquisitionDate;

    const acquisitionDateRange = queryParams?.acquisitionDateRange;

    // const cloudCoverThreshold = useAppSelector(selectCloudCover);

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
    const yearOptions = useAcquisitionYearsAsDropdownMenuOptions(
        acquisitionYear,
        true
    );

    /**
     * if true, Calendar should be disbaled
     */
    const shouldBeDisabled = useShouldDisableCalendar();

    // /**
    //  * This custom hook is triggered whenever the user-selected acquisition date changes.
    //  * It updates the user-selected year based on the year from the selected acquisition date.
    //  */
    // useUpdateAcquisitionYear();

    // const shouldShowCloudFilter = useMemo(() => {
    //     return APP_NAME === 'landsat' || APP_NAME === 'landsat-surface-temp';
    // }, []);

    return (
        <div
            className={classNames('select-none', {
                'is-disabled': shouldBeDisabled,
            })}
            data-testid="calendar-container"
        >
            <div className="text-center mb-2">
                <span className="uppercase text-sm">
                    {t('scene_selection')}
                </span>
            </div>

            <div className="flex mb-2 items-center justify-between">
                <div className="flex items-center flex-grow">
                    <div
                        className="relative w-[130px]"
                        data-testid="year-selection-dropdown"
                    >
                        <Dropdown
                            data={yearOptions}
                            onChange={(year) => {
                                // setAcquisitionYear(+year);
                                // dispatch(acquisitionYearChanged(+year));

                                const updatedDateRange = year
                                    ? getDateRangeForYear(+year)
                                    : getDateRangeForPast12Month();

                                dispatch(
                                    updateAcquisitionDateRange(updatedDateRange)
                                );
                            }}
                        />
                    </div>

                    <AcquisitionDateLabel
                        acquisitionDate={acquisitionDate}
                        closeBtnOnClick={() => {
                            dispatch(updateAcquisitionDate(''));
                        }}
                    />
                </div>

                {/* {APP_NAME === 'landsat' && <LandsatMissionFilter />} */}
                {children}
            </div>

            <Calendar
                // year={acquisitionYear}
                // selectedAcquisitionDate={acquisitionDate}
                dateRange={acquisitionDateRange || getDateRangeForPast12Month()}
                selectedAcquisitionDate={selectedAcquisitionDate}
                availableScenes={formattedScenes}
                // shouldHideCloudCoverInfo={shouldHideCloudCoverInfo}
                onSelect={(formattedAcquisitionDate) => {
                    // console.log(formattedAcquisitionDate)

                    // unselect the selected imagery scene so that a new scene can be selected
                    dispatch(updateObjectIdOfSelectedScene(null));

                    // select a new acquisition date that will be used to find the scenes that was acquired on
                    // this date
                    dispatch(updateAcquisitionDate(formattedAcquisitionDate));
                }}
            />
        </div>
    );
};

export default CalendarContainer;
