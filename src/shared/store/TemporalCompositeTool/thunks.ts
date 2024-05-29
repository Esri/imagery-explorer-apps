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

// import Point from '@arcgis/core/geometry/Point';
import { nanoid } from 'nanoid';
import {
    DefaultQueryParams4ImageryScene,
    QueryParams4ImageryScene,
    queryParamsListChanged,
} from '../ImageryScene/reducer';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    selectQueryParams4SecondaryScene,
    selectSelectedItemFromListOfQueryParams,
} from '../ImageryScene/selectors';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
// import { Sentinel1FunctionName } from '@shared/services/sentinel-1/config';
import { DateRange } from '@typing/shared';
import { getDateRangeForPast12Month } from '@shared/utils/date-time/getTimeRange';

const DATE_RANGE_OF_PAST_12_MONTH = getDateRangeForPast12Month();

// let abortController: AbortController = null;

/**
 * Initializes a new list of query parameters for use with the Temporal Composite Tool.
 * @param shouldInheritScenesFromCurrentList If true, attempts to inherit query parameters from the existing list. If false, creates new query parameters using `DefaultQueryParams4ImageryScene`.
 */
export const initiateImageryScenes4TemporalCompositeTool =
    (shouldInheritScenesFromCurrentList: boolean) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const storeState = getState();

        // const queryParams4MainScene = selectQueryParams4MainScene(storeState);
        // const queryParams4SecondaryScene = selectQueryParams4SecondaryScene(storeState);

        // Get the current list of query parameters from the store
        const listOfQueryParams = selectListOfQueryParams(storeState);

        const queryParams4RedBand: QueryParams4ImageryScene =
            shouldInheritScenesFromCurrentList && listOfQueryParams[0]
                ? listOfQueryParams[0]
                : {
                      ...DefaultQueryParams4ImageryScene,
                      rasterFunctionName: '',
                      uniqueId: nanoid(5),
                  };

        const queryParams4GreenBand: QueryParams4ImageryScene =
            shouldInheritScenesFromCurrentList && listOfQueryParams[1]
                ? listOfQueryParams[1]
                : {
                      ...DefaultQueryParams4ImageryScene,
                      rasterFunctionName: '',
                      uniqueId: nanoid(5),
                  };

        const queryParams4BlueBand: QueryParams4ImageryScene =
            shouldInheritScenesFromCurrentList && listOfQueryParams[2]
                ? listOfQueryParams[2]
                : {
                      ...DefaultQueryParams4ImageryScene,
                      rasterFunctionName: '',
                      uniqueId: nanoid(5),
                  };

        const updatedListOfQueryParams: QueryParams4ImageryScene[] = [
            queryParams4RedBand,
            queryParams4GreenBand,
            queryParams4BlueBand,
        ];

        dispatch(
            queryParamsListChanged({
                queryParams: updatedListOfQueryParams,
                selectedItemID: queryParams4RedBand.uniqueId,
            })
        );
    };

export const swapImageryScenesInTemporalCompositeTool =
    (indexOfSceneA: number, indexOfSceneB: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const storeState = getState();

        const queryParams = selectListOfQueryParams(storeState);
        const queryParams4SecondaryScene =
            selectSelectedItemFromListOfQueryParams(storeState);

        const sceneA = queryParams[indexOfSceneA];
        const sceneB = queryParams[indexOfSceneB];

        if (!sceneA || !sceneB) {
            return;
        }

        queryParams[indexOfSceneA] = sceneB;
        queryParams[indexOfSceneB] = sceneA;

        dispatch(
            queryParamsListChanged({
                queryParams,
                selectedItemID: queryParams4SecondaryScene.uniqueId,
            })
        );
    };

/**
 * This thunk function updates the query parameters of Imagery Scenes for the Temporal Composite Tool
 * to sync with the default acquisition date range (past 12 months) using the updated date range
 * provided by the user.
 *
 * This is done to prevent the calendar from jumping between the "past 12 months" and a selected year,
 * which might cause confusion for users. In other words, we want imagery scenes used by Temporal Composite Tool that don't have a
 * user-selected acquisition date range to inherit the date range that the user selected for other imagery scenes.
 *
 * @param updatedDateRange - The new date range to apply to imagery scenes with the default date range.
 */
export const syncImageryScenesDateRangeForTemporalCompositeTool =
    (updatedDateRange: DateRange) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const storeState = getState();

        // Get the current list of query parameters from the store
        const listOfQueryParams = selectListOfQueryParams(storeState);

        const selectedItemID =
            selectIdOfSelectedItemInListOfQueryParams(storeState);

        // Initialize an array to hold the updated list of query parameters
        const updatedListOfQueryParams: QueryParams4ImageryScene[] = [];

        for (const queryParams of listOfQueryParams) {
            // Create a copy of the current query parameters
            const updatedQueryParams = { ...queryParams };

            const { acquisitionDateRange } = updatedQueryParams;

            // If the acquisition date range matches the default "past 12 months" date range,
            // update it to the new date range provided by the user
            if (
                acquisitionDateRange.startDate ===
                    DATE_RANGE_OF_PAST_12_MONTH.startDate &&
                acquisitionDateRange.endDate ===
                    DATE_RANGE_OF_PAST_12_MONTH.endDate
            ) {
                updatedQueryParams.acquisitionDateRange = updatedDateRange;
            }

            updatedListOfQueryParams.push(updatedQueryParams);
        }

        dispatch(
            queryParamsListChanged({
                queryParams: updatedListOfQueryParams,
                selectedItemID,
            })
        );
    };
