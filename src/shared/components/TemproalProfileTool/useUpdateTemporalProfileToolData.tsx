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
import {
    selectAcquisitionMonth4TrendTool,
    selectQueryLocation4TrendTool,
    // selectSelectedIndex4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectTrendToolOption,
} from '@shared/store/TrendTool/selectors';
import {
    IntersectWithImagerySceneFunc,
    FetchTemporalProfileDataFunc,
    updateTemporalProfileToolData,
} from '@shared/store/TrendTool/thunks';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectActiveAnalysisTool,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
// import { SpectralIndex } from '@typing/imagery-service';
import { selectLandsatMissionsToBeExcluded } from '@shared/store/Landsat/selectors';
import { debounce } from '@shared/utils/snippets/debounce';
import { useAppDispatch } from '@shared/store/configureStore';

/**
 * This custom hook triggers `updateTemporalProfileToolData` thunk function to get temporal profile data
 * when query location, acquisition date or other options are changed.
 * @param fetchTemporalProfileDataFunc - async function that retrieves the Temporal Profile data. This function will be invoked by the `updateTemporalProfileToolData` thunk function.
 * @param intersectWithImagerySceneFunc - async function that determines if the query location intersects with the imagery scene specified by the input object ID.  This function will be invoked by the `updateTemporalProfileToolData` thunk function.
 */
export const useUpdateTemporalProfileToolData = (
    fetchTemporalProfileDataFunc: FetchTemporalProfileDataFunc,
    intersectWithImagerySceneFunc: IntersectWithImagerySceneFunc
) => {
    const dispatch = useAppDispatch();

    const tool = useAppSelector(selectActiveAnalysisTool);

    const queryLocation = useAppSelector(selectQueryLocation4TrendTool);

    const acquisitionMonth = useAppSelector(selectAcquisitionMonth4TrendTool);

    const acquisitionYear = useAppSelector(selectAcquisitionYear4TrendTool);

    const selectedTrendToolOption = useAppSelector(selectTrendToolOption);

    const missionsToBeExcluded = useAppSelector(
        selectLandsatMissionsToBeExcluded
    );

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const updateTrendToolDataDebounced = useCallback(
        debounce(() => {
            dispatch(
                updateTemporalProfileToolData(
                    fetchTemporalProfileDataFunc,
                    intersectWithImagerySceneFunc
                )
            );
        }, 50),
        [fetchTemporalProfileDataFunc, intersectWithImagerySceneFunc]
    );

    // triggered when user selects a new acquisition month that will be used to draw the "year-to-year" trend data
    useEffect(() => {
        (async () => {
            if (tool !== 'trend') {
                return;
            }

            if (selectedTrendToolOption !== 'year-to-year') {
                return;
            }

            updateTrendToolDataDebounced();
        })();
    }, [
        acquisitionMonth,
        queryLocation,
        tool,
        selectedTrendToolOption,
        missionsToBeExcluded,
        // objectIdOfSelectedScene,
    ]);

    // triggered when user selects a new acquisition year that will be used to draw the "month-to-month" trend data
    useEffect(() => {
        (async () => {
            if (tool !== 'trend') {
                return;
            }

            if (selectedTrendToolOption !== 'month-to-month') {
                return;
            }

            updateTrendToolDataDebounced();
        })();
    }, [
        acquisitionYear,
        queryLocation,
        tool,
        selectedTrendToolOption,
        missionsToBeExcluded,
        // objectIdOfSelectedScene,
    ]);
};
