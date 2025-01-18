/* Copyright 2024 Esri
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

import { DateRange } from '@typing/shared';
import { StoreDispatch, StoreGetState } from '../configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
} from '../ImageryScene/selectors';
import { getDateRangeForPast12Month } from '@shared/utils/date-time/getTimeRange';
import {
    queryParams4MainSceneChanged,
    queryParams4SecondarySceneChanged,
} from '../ImageryScene/reducer';
import { batch } from 'react-redux';

// import Point from '@arcgis/core/geometry/Point';
// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

// let abortController: AbortController = null;

const DATE_RANGE_OF_PAST_12_MONTH = getDateRangeForPast12Month();

/**
 * This thunk function updates the query parameters of Imagery Scenes for the Change Compare Tool
 * to sync with the default acquisition date range (past 12 months) using the updated date range
 * provided by the user.
 *
 * This is done to prevent the calendar from jumping between the "past 12 months" and a selected year,
 * which might cause confusion for users. In other words, we want imagery scenes used by Change Compare Tool that don't have a
 * user-selected acquisition date range to inherit the date range that the user selected for other imagery scenes.
 *
 * @param updatedDateRange - The new date range to apply to imagery scenes with the default date range.
 */
export const syncImageryScenesDateRangeForChangeCompareTool =
    (updatedDateRange: DateRange) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const storeState = getState();

        const queryParams4MainScene = selectQueryParams4MainScene(storeState);
        const queryParams4SecondaryScene =
            selectQueryParams4SecondaryScene(storeState);

        const updatedQueryParams4MainScene = { ...queryParams4MainScene };
        const updatedQueryParams4SecondaryScene = {
            ...queryParams4SecondaryScene,
        };

        // If the acquisition date range matches the default "past 12 months" date range,
        // update it to the new date range provided by the user
        if (
            updatedQueryParams4MainScene.acquisitionDateRange.startDate ===
                DATE_RANGE_OF_PAST_12_MONTH.startDate &&
            updatedQueryParams4MainScene.acquisitionDateRange.endDate ===
                DATE_RANGE_OF_PAST_12_MONTH.endDate
        ) {
            updatedQueryParams4MainScene.acquisitionDateRange =
                updatedDateRange;
        }

        if (
            updatedQueryParams4SecondaryScene.acquisitionDateRange.startDate ===
                DATE_RANGE_OF_PAST_12_MONTH.startDate &&
            updatedQueryParams4SecondaryScene.acquisitionDateRange.endDate ===
                DATE_RANGE_OF_PAST_12_MONTH.endDate
        ) {
            updatedQueryParams4SecondaryScene.acquisitionDateRange =
                updatedDateRange;
        }

        batch(() => {
            dispatch(
                queryParams4MainSceneChanged(updatedQueryParams4MainScene)
            );

            dispatch(
                queryParams4SecondarySceneChanged(
                    updatedQueryParams4SecondaryScene
                )
            );
        });
    };
