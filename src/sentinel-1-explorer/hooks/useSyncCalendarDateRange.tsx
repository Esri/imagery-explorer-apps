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

import { syncImageryScenesDateRangeForChangeCompareTool } from '@shared/store/ChangeCompareTool/thunks';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { syncImageryScenesDateRangeForTemporalCompositeTool } from '@shared/store/TemporalCompositeTool/thunks';
import { getDateRangeForPast12Month } from '@shared/utils/date-time/getTimeRange';
import React, { useEffect, useMemo } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

const DATE_RANGE_OF_PAST_12_MONTH = getDateRangeForPast12Month();

/**
 * Custom hook that triggers a thunk function to update the query parameters of Imagery Scenes
 * for the Temporal Composite Tool, syncing them with the default acquisition date range
 * (past 12 months) using the updated date range selected by the user.
 */
export const useSyncCalendarDateRange = () => {
    const dispatch = useAppDispatch();

    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams = useAppSelector(selectQueryParams4SceneInSelectedMode);

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

        dispatch(
            syncImageryScenesDateRangeForChangeCompareTool(
                queryParams?.acquisitionDateRange
            )
        );
    }, [queryParams?.acquisitionDateRange]);
};
