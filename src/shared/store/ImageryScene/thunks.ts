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

import { StoreDispatch, StoreGetState } from '../configureStore';
import {
    QueryParams4ImageryScene,
    // availableScenesUpdated,
    queryParams4MainSceneChanged,
    queryParamsListChanged,
    queryParams4SelectedItemInListChanged,
    queryParams4SecondarySceneChanged,
} from './reducer';
import {
    selectAppMode,
    selectQueryParams4MainScene,
    selectSelectedItemFromListOfQueryParams,
    selectQueryParams4SceneInSelectedMode,
    selectListOfQueryParams,
    selectQueryParams4SecondaryScene,
    selectIdOfSelectedItemInListOfQueryParams,
    selectActiveAnalysisTool,
    selectIsSecondarySceneActive,
    // selectLandsatMissionsToBeExcluded,
} from './selectors';
// import { nanoid } from 'nanoid';
import { getYearFromFormattedDateString } from '@shared/utils/date-time/formatDateString';
import { DateRange } from '@typing/shared';
import { getDateRangeForYear } from '@shared/utils/date-time/getTimeRange';

/**
 * update query params that will be used to find the Imagery Scene in the selected mode
 * @param updatedQueryParams
 * @returns
 */
export const updateQueryParams4SceneInSelectedMode =
    (updatedQueryParams: QueryParams4ImageryScene) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const mode = selectAppMode(getState());
        const analysisTool = selectActiveAnalysisTool(getState());
        const isSecondarySceneActive = selectIsSecondarySceneActive(getState());

        if (mode === 'find a scene' || mode === 'dynamic') {
            dispatch(queryParams4MainSceneChanged(updatedQueryParams));
            return;
        }

        if (mode === 'analysis') {
            if (analysisTool === 'change') {
                if (isSecondarySceneActive) {
                    dispatch(
                        queryParams4SecondarySceneChanged(updatedQueryParams)
                    );
                } else {
                    dispatch(queryParams4MainSceneChanged(updatedQueryParams));
                }

                return;
            }

            if (analysisTool === 'temporal composite') {
                dispatch(
                    queryParams4SelectedItemInListChanged(updatedQueryParams)
                );
                return;
            }

            dispatch(queryParams4MainSceneChanged(updatedQueryParams));
            return;
        }

        if (mode === 'swipe') {
            if (isSecondarySceneActive) {
                dispatch(queryParams4SecondarySceneChanged(updatedQueryParams));
            } else {
                dispatch(queryParams4MainSceneChanged(updatedQueryParams));
            }

            return;
        }

        if (mode === 'animate' || mode === 'spectral sampling') {
            dispatch(queryParams4SelectedItemInListChanged(updatedQueryParams));
            return;
        }
    };

export const updateRasterFunctionName =
    (rasterFunctionName: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            // it is possible that there won't be any scene in Animation mode
            // before user adds a frame. Therefore we should just abort
            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                rasterFunctionName,
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateObjectIdOfSelectedScene =
    (objectIdOfSelectedScene: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                objectIdOfSelectedScene,
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

/**
 * Updates the user-selected acquisition date for an imagery scene. If `shouldSyncAcquisitionDateRange` is set to true,
 * the `acquisitionDateRange` will also be updated, using the date range for the year of the user-selected acquisition date.
 *
 * We need to synchronize the `acquisitionDateRange` with the year from `acquisitionDate` when it needs to
 * triggers custom hooks like `useQueryAvailableLandsatScenes` that query imagery scenes acquired within the new date range.
 * This ensures that the imagery scene acquired on the new acquisition date can be selected and displayed when the user picks
 * a new acquisition date from components outside of the main Calendar component, such as the Trend Chart.
 *
 * Without syncing the `acquisitionDateRange`, although the new acquisition date is selected, the calendar will continue
 * displaying imagery scenes acquired from the previously selected date range.
 *
 * @param acquisitionDate The new acquisition date in string format.
 * @param shouldSyncAcquisitionDateRange If true, updates the `acquisitionDateRange` using the date range for the year of the
 * new acquisition date.
 * @returns void
 */
export const updateAcquisitionDate =
    (acquisitionDate: string, shouldSyncAcquisitionDateRange?: boolean) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            if (!queryParams) {
                return;
            }

            let acquisitionDateRange = queryParams?.acquisitionDateRange;

            if (shouldSyncAcquisitionDateRange) {
                acquisitionDateRange = getDateRangeForYear(
                    getYearFromFormattedDateString(acquisitionDate)
                );
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                acquisitionDate,
                acquisitionDateRange,
                // inheritedAcquisitionYear: null, // reset this value whenever user makes an update to the acquisition date
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateAcquisitionDateRange =
    (acquisitionDateRange: DateRange) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectQueryParams4SceneInSelectedMode(
                getState()
            );

            if (!queryParams) {
                return;
            }

            const updatedQueryParams: QueryParams4ImageryScene = {
                ...queryParams,
                acquisitionDateRange,
                // inheritedAcquisitionYear: null, // reset this value whenever user makes an update to the acquisition date
            };

            dispatch(updateQueryParams4SceneInSelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

/**
 * Adds a new item to the query parameters list of imagery scenes.
 * @param uniqueId The ID of the new item to be added.
 * @param shouldOnlyInheritAcquisitionYear If true, should only inherit the acquisition year from the previously selected query parameters.
 * @returns void
 */
export const addNewItemToQueryParamsList =
    (uniqueId: string, shouldOnlyInheirtAcquisitionYear = false) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        // Retrieve the query parameters for existing scene
        const queryParams4ExistingScenes = selectListOfQueryParams(getState());

        // Try to inherit data from previously selected item from the list of query params first.
        // When there is no previously selected query params, use the data from the main scene instead

        // Try to inherit data from the previously selected item from the list of query parameters first.
        // When there is no previously selected imagery scene from the list, use the data from the main scene instead.
        const queryParamsToInheritDataFrom =
            selectSelectedItemFromListOfQueryParams(getState()) ||
            selectQueryParams4MainScene(getState());

        // Why the user might want to only inherit the acquisition year instead of the full acquisition date?
        // This scenario typically occurs when the user adds a new query parameter for an imagery scene used as a new animation frame.
        // For animation frames, it's unlikely that the user will have two imagery scenes acquired on the exact same date,
        // but they may be seeking an imagery scene acquired within the same year.
        // Thus, saving the inherited acquisition year can help the user stay within the same year in the Calendar component without selecting a specific date.
        const queryParamsOfNewFrame: QueryParams4ImageryScene =
            shouldOnlyInheirtAcquisitionYear
                ? {
                      ...queryParamsToInheritDataFrom,
                      uniqueId,
                      // acquisition date should not be cloned over if user want to inherit acquisition year from previously selected secne
                      acquisitionDate: '',
                      //   // use acquistion year from the previously selected scene
                      //   inheritedAcquisitionYear:
                      //       queryParamsToInheritDataFrom?.acquisitionDate
                      //           ? getYearFromFormattedDateString(
                      //                 queryParamsToInheritDataFrom.acquisitionDate
                      //             )
                      //           : null,
                  }
                : {
                      ...queryParamsToInheritDataFrom,
                      uniqueId,
                  };

        dispatch(
            queryParamsListChanged({
                queryParams: [
                    ...queryParams4ExistingScenes,
                    queryParamsOfNewFrame,
                ],
                selectedItemID: queryParamsOfNewFrame.uniqueId,
            })
        );
    };

export const removeItemFromQueryParamsList =
    (idOfItem2Removed: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const queryParams4ExistingScenes = selectListOfQueryParams(getState());

        // remove the scene associated with the frame that user wants to remove
        const updatedListOfQueryParams = queryParams4ExistingScenes.filter(
            (d) => d.uniqueId !== idOfItem2Removed
        );

        const idOfSelectedItem = selectIdOfSelectedItemInListOfQueryParams(
            getState()
        );

        let updatedIdOfSelectedItem = idOfSelectedItem;

        // selected frame got removed, therefore we should select a new frame
        if (idOfSelectedItem === idOfItem2Removed) {
            updatedIdOfSelectedItem =
                updatedListOfQueryParams[0]?.uniqueId || null;
        }

        dispatch(
            queryParamsListChanged({
                queryParams: updatedListOfQueryParams,
                selectedItemID: updatedIdOfSelectedItem,
            })
        );
    };

export const swapMainAndSecondaryScenes =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams4MainScene = selectQueryParams4MainScene(
                getState()
            );

            const queryParams4SecondaryScene = selectQueryParams4SecondaryScene(
                getState()
            );

            dispatch(
                queryParams4MainSceneChanged({
                    ...queryParams4SecondaryScene,
                })
            );

            dispatch(
                queryParams4SecondarySceneChanged({
                    ...queryParams4MainScene,
                })
            );
        } catch (err) {
            console.error(err);
        }
    };
