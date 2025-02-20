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

import { Point } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    trendToolDataUpdated,
    queryLocation4TrendToolChanged,
    trendToolIsLoadingChanged,
    errorChanged,
} from './reducer';
import {
    selectAcquisitionMonth4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectQueryLocation4TrendTool,
    selectTrendToolOption,
} from './selectors';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '../ImageryScene/selectors';
import { TemporalProfileData } from '@typing/imagery-service';

/**
 * Type definition for a function that determines if the query location intersects with the imagery scene specified by the input object ID.
 */
export type IntersectWithImagerySceneFunc = (
    queryLocation: Point,
    objectId: number,
    abortController: AbortController
) => Promise<boolean>;

/**
 * Type definition for a function that retrieves the Temporal Profile data.
 */
export type FetchTemporalProfileDataFunc = (
    queryLocation: Point,
    acquisitionMonth: number,
    acquisitionYear: number,
    abortController: AbortController
) => Promise<TemporalProfileData[]>;

/**
 * This thunk function updates the temporal profile tool data by invoking the provided `fetchTemporalProfileDataFunc`
 * to retrieve the temporal profile data for the selected imagery service. It also calls `intersectWithImagerySceneFunc`
 * to verify if the query location is within the extent of the selected imagery scene.
 *
 * Why pass `fetchTemporalProfileDataFunc` and `intersectWithImagerySceneFunc` as parameters? This approach decouples this
 * thunk function from any specific imagery service, allowing wrapper components to determine how and where to fetch the temporal profile data.
 *
 * @param fetchTemporalProfileDataFunc - An async function that retrieves the temporal profile data.
 * @param intersectWithImagerySceneFunc - An async function that checks if the query location intersects with the specified imagery scene using the input object ID.
 * @returns void
 */
export const updateTemporalProfileToolData =
    (
        fetchTemporalProfileDataFunc: FetchTemporalProfileDataFunc,
        intersectWithImagerySceneFunc: IntersectWithImagerySceneFunc
    ) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation = selectQueryLocation4TrendTool(rootState);

        const { objectIdOfSelectedScene } =
            selectQueryParams4SceneInSelectedMode(rootState);

        const acquisitionMonth = selectAcquisitionMonth4TrendTool(rootState);

        const acquisitionYear = selectAcquisitionYear4TrendTool(rootState);

        const trendToolOption = selectTrendToolOption(rootState);

        // remove any existing error from previous request
        dispatch(errorChanged(null));

        if (!queryLocation || !objectIdOfSelectedScene) {
            return dispatch(resetTrendToolData());
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        dispatch(trendToolIsLoadingChanged(true));

        try {
            const isIntersected = await intersectWithImagerySceneFunc(
                queryLocation,
                objectIdOfSelectedScene,
                abortController
            );

            if (!isIntersected) {
                throw new Error(
                    'Temporal profiles are only available for points selected within the selected scene.'
                );
            }

            const data: TemporalProfileData[] =
                await fetchTemporalProfileDataFunc(
                    queryLocation,
                    trendToolOption === 'year-to-year'
                        ? acquisitionMonth
                        : null,
                    trendToolOption === 'month-to-month'
                        ? acquisitionYear
                        : null,
                    abortController
                );

            dispatch(trendToolDataUpdated(data));

            dispatch(trendToolIsLoadingChanged(false));
        } catch (err) {
            // no need to throw the error
            // is caused by the user aborting the pending query
            if (err.name === 'AbortError') {
                return;
            }

            // console.log('failed to fetch temporal profile data');
            dispatch(
                errorChanged(
                    err?.message ||
                        'failed to fetch data for temporal profile tool'
                )
            );

            dispatch(trendToolIsLoadingChanged(false));
            // throw err;
        }
    };

export const updateQueryLocation4TrendTool =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const mode = selectAppMode(getState());

        const tool = selectActiveAnalysisTool(getState());

        if (mode !== 'analysis' || tool !== 'trend') {
            return;
        }

        dispatch(queryLocation4TrendToolChanged(point));
    };

let abortController: AbortController = null;

export const resetTrendToolData =
    () => (dispatch: StoreDispatch, getState: StoreGetState) => {
        // cancel pending requests triggered by `updateTrendToolData` thunk function
        if (abortController) {
            abortController.abort();
        }

        dispatch(trendToolDataUpdated([]));
        dispatch(queryLocation4TrendToolChanged(null));
        dispatch(trendToolIsLoadingChanged(false));
    };
