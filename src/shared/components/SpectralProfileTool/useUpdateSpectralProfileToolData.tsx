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
    selectActiveAnalysisTool,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectQueryLocation4SpectralProfileTool } from '@shared/store/SpectralProfileTool/selectors';
import {
    FetchPixelValuesFunc,
    updateSpectralProfileData,
} from '@shared/store/SpectralProfileTool/thunks';
import { debounce } from '@shared/utils/snippets/debounce';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

/**
 * This custom hook triggers `updateSpectralProfileData` thunk function to get spectral profile data for the user-selected location
 * when query location or selected scene are changed.
 * @param {FetchPixelValuesFunc} fetchPixelBandValuesFunc - async function that retrieves the band values from the pixel that intersects with the user-selected location. This function will be invoked by the `updateSpectralProfileData` thunk function.
 */
export const useFetchSpectralProfileToolData = (
    fetchPixelBandValuesFunc: FetchPixelValuesFunc
) => {
    const dispatch = useAppDispatch();

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const queryLocation = useAppSelector(
        selectQueryLocation4SpectralProfileTool
    );

    const tool = useAppSelector(selectActiveAnalysisTool);

    const updateSpectralProfileDataDebounced = useCallback(
        debounce(async () => {
            dispatch(updateSpectralProfileData(fetchPixelBandValuesFunc));
        }, 200),
        [fetchPixelBandValuesFunc]
    );

    // triggers when user selects a new query location
    useEffect(() => {
        (async () => {
            if (tool !== 'spectral') {
                return;
            }

            // When the user selects a new acquisition date from the calendar,
            // the currently selected imagery scene is deselected first,
            // followed by the selection of a new scene. These two actions occur sequentially,
            // potentially causing `updateSpectralProfileData` to be called twice in rapid succession,
            // resulting in unnecessary network requests being triggered. To mitigate this issue,
            // we need to debounce the `updateSpectralProfileData` function with a 200 ms delay.
            updateSpectralProfileDataDebounced();
        })();
    }, [queryLocation, objectIdOfSelectedScene]);
};
