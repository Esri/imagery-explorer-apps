import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { syncImageryScenesDateRangeForTemporalCompositeTool } from '@shared/store/TemporalCompositeTool/thunks';
import { getDateRangeForPast12Month } from '@shared/utils/date-time/getTimeRange';
import React, { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

const DATE_RANGE_OF_PAST_12_MONTH = getDateRangeForPast12Month();

/**
 * Custom hook that triggers a thunk function to update the query parameters of Imagery Scenes
 * for the Temporal Composite Tool, syncing them with the default acquisition date range
 * (past 12 months) using the updated date range selected by the user.
 */
export const useSyncCalendarDateRange = () => {
    const dispatch = useDispatch();

    const mode = useSelector(selectAppMode);

    const analyzeTool = useSelector(selectActiveAnalysisTool);

    const queryParams = useSelector(selectQueryParams4SceneInSelectedMode);

    useEffect(() => {
        if (!queryParams?.acquisitionDateRange) {
            return;
        }

        // Only sync the calendar date range if in 'analysis' mode
        // and using the 'temporal composite' or 'change' tool
        if (
            mode !== 'analysis' ||
            (analyzeTool !== 'temporal composite' && analyzeTool !== 'change')
        ) {
            return;
        }

        const { startDate, endDate } = queryParams?.acquisitionDateRange || {};

        // Skip syncing if the currently selected date range equals the date range of the past 12 months
        if (
            startDate === DATE_RANGE_OF_PAST_12_MONTH.startDate &&
            endDate === DATE_RANGE_OF_PAST_12_MONTH.endDate
        ) {
            return;
        }

        dispatch(
            syncImageryScenesDateRangeForTemporalCompositeTool(
                queryParams?.acquisitionDateRange
            )
        );
    }, [queryParams?.acquisitionDateRange]);
};
