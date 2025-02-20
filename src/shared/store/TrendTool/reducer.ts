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

import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import {
    getCurrentMonth,
    getCurrentYear,
} from '@shared/utils/date-time/getCurrentDateTime';
import {
    TemporalProfileData,
    SpectralIndex,
    RadarIndex,
} from '@typing/imagery-service';
import { Point } from '@arcgis/core/geometry';

/**
 * The trend tool has two options
 */
export type TrendToolOption = 'year-to-year' | 'month-to-month';

// type MaskOptionsBySpectralIndex = Partial<Record<SpectralIndex, MaskOptions>>;

export type TrendToolState = {
    /**
     * user selected option for trend tool.
     * The default value should be `year-to-year` as that is the only option that we had in the beta release.
     */
    option: TrendToolOption;
    /**
     * Query Location for Temporal trend tool
     */
    queryLocation: Point;
    /**
     * acquisition month to be used to fetch temporal trend data for a given month (Year to Year)
     */
    acquisitionMonth: number;
    /**
     * acquisition year to be used to fetch temporal trend data for a given year (Month to Month)
     */
    acquisitionYear: number;
    /**
     * user selected spectral index or radar index that will be used to fetch/create Trend Profile data that will be used in the Temporal trend tool
     */
    selectedIndex: SpectralIndex | RadarIndex;
    /**
     * imagery temporal trend data
     */
    temporalProfileData: {
        byObjectId: {
            [key: number]: TemporalProfileData;
        };
        objectIds: number[];
    };
    /**
     * if ture, it is in process of loading data to render trend tool
     */
    loading: boolean;
    /**
     * message from the error that was caught while fetch the temporal profile data
     */
    error: string;
};

export const initialTrendToolState: TrendToolState = {
    option: 'year-to-year',
    queryLocation: null,
    acquisitionMonth: getCurrentMonth(),
    acquisitionYear: getCurrentYear(),
    selectedIndex: 'moisture',
    temporalProfileData: {
        byObjectId: {},
        objectIds: [],
    },
    loading: false,
    error: null,
};

const slice = createSlice({
    name: 'TrendTool',
    initialState: initialTrendToolState,
    reducers: {
        queryLocation4TrendToolChanged: (
            state,
            action: PayloadAction<Point>
        ) => {
            state.queryLocation = action.payload;
        },
        acquisitionMonth4TrendToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.acquisitionMonth = action.payload;
        },
        acquisitionYear4TrendToolChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.acquisitionYear = action.payload;
        },
        trendToolDataUpdated: (
            state,
            action: PayloadAction<TemporalProfileData[]>
        ) => {
            const objectIds: number[] = [];
            const byObjectId: {
                [key: number]: TemporalProfileData;
            } = {};

            for (const item of action.payload) {
                const { objectId } = item;
                objectIds.push(objectId);
                byObjectId[objectId] = item;
            }

            state.temporalProfileData = {
                objectIds,
                byObjectId,
            };
        },
        selectedIndex4TrendToolChanged: (
            state,
            action: PayloadAction<SpectralIndex | RadarIndex>
        ) => {
            state.selectedIndex = action.payload;
        },
        trendToolOptionChanged: (
            state,
            action: PayloadAction<TrendToolOption>
        ) => {
            state.option = action.payload;
        },
        trendToolIsLoadingChanged: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
        errorChanged: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    queryLocation4TrendToolChanged,
    acquisitionMonth4TrendToolChanged,
    acquisitionYear4TrendToolChanged,
    trendToolDataUpdated,
    selectedIndex4TrendToolChanged,
    trendToolOptionChanged,
    trendToolIsLoadingChanged,
    errorChanged,
} = slice.actions;

export default reducer;
