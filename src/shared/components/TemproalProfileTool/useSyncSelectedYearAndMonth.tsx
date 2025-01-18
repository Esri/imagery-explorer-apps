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

import React, { useEffect } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { batch } from 'react-redux';
import { useSelector } from 'react-redux';
import {
    // getFormatedDateString,
    getMonthFromFormattedDateString,
    getYearFromFormattedDateString,
} from '@shared/utils/date-time/formatDateString';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import {
    acquisitionMonth4TrendToolChanged,
    // samplingTemporalResolutionChanged,
    // trendToolDataUpdated,
    // selectedIndex4TrendToolChanged,
    // queryLocation4TrendToolChanged,
    // trendToolOptionChanged,
    acquisitionYear4TrendToolChanged,
} from '@shared/store/TrendTool/reducer';
import { updateQueryLocation4TrendTool } from '@shared/store/TrendTool/thunks';

/**
 * This custom hook update the `acquisitionMonth` and `acquisitionMonth` property of the Trend Tool State
 * to keep it in sync with the acquisition date of selected imagery scene
 */
export const useSyncSelectedYearAndMonth4TemporalProfileTool = () => {
    const dispatch = useAppDispatch();

    const { rasterFunctionName, acquisitionDate, objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    useEffect(() => {
        // remove query location when selected acquisition date is removed
        if (!acquisitionDate) {
            dispatch(updateQueryLocation4TrendTool(null));
            return;
        }

        const month = getMonthFromFormattedDateString(acquisitionDate);

        const year = getYearFromFormattedDateString(acquisitionDate);

        batch(() => {
            dispatch(acquisitionMonth4TrendToolChanged(month));
            dispatch(acquisitionYear4TrendToolChanged(year));
        });
    }, [acquisitionDate]);
};
