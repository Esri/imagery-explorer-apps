import { acquisitionYearChanged } from '@shared/store/ImageryScene/reducer';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

/**
 * This custom hook is triggered whenever the user-selected acquisition date changes.
 * It updates the user-selected year based on the year from the selected acquisition date.
 * In animation mode, the newly added frame utilizes the year inherited from the previous animation frame, if available.
 *
 * Why is this necessary? For instance, in Swipe Mode, when the user has two scenes selected—
 * one acquired in 1990 and another in 2020, switching between these scenes should update the calendar
 * to display scenes available from the year of the selected scene. Without invoking this hook,
 * the acquisition year won't update when users switch scenes. The same logic applies to animation mode.
 * In other words, the calendar should always reflect available scenes from the acquisition year based on the user-selected scenes.
 */
export const useUpdateAcquisitionYear = (): void => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    const acquisitionDate = queryParams?.acquisitionDate;

    useEffect(() => {
        let year = getCurrentYear();

        // If acquisition date exists, use the year from the date
        if (acquisitionDate) {
            // try to use the year from acquisition date first
            year = getYearFromFormattedDateString(acquisitionDate);
        } else if (
            mode === 'animate' &&
            queryParams?.inheritedAcquisitionYear
        ) {
            // In animation mode, use the inherited acquisition year from the previous frame
            year = queryParams.inheritedAcquisitionYear;
        }

        dispatch(acquisitionYearChanged(year));
    }, [acquisitionDate]);
};
