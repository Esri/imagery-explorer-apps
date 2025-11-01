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

import Point from '@arcgis/core/geometry/Point';

// type MaskOptionsBySpectralIndex = Partial<Record<SpectralIndex, MaskOptions>>;

type UrbanAreaFeature = {
    OBJECTID: number;
    /**
     * Unique identifier for the urban area
     */
    URBAN_CENTER_ID: number;
    /**
     * Name of the urban area
     */
    NAME: string;
    /**
     * All names associated with the urban area
     */
    ALL_NAMES: string;
    /**
     * Country where the urban area is located
     */
    COUNTRY: string;
};

export type UrbanHeatIslandToolState = {
    /**
     * Query Location for Urban Heat Island Tool
     */
    queryLocation: Point;
    /**
     * The selected urban area feature based on the query location
     */
    selectedUrbanAreaFeature: UrbanAreaFeature;
    /**
     * if ture, it is in process of loading data to render trend tool
     */
    loading: boolean;
    /**
     * message from the error that was caught while fetch the temporal profile data
     */
    error: string;
};

export const initialUrbanHeatIslandToolState: UrbanHeatIslandToolState = {
    queryLocation: null,
    loading: false,
    error: null,
    selectedUrbanAreaFeature: null,
};

const slice = createSlice({
    name: 'UrbanHeatIslandTool',
    initialState: initialUrbanHeatIslandToolState,
    reducers: {
        queryLocation4UrbanHeatIslandToolChanged: (
            state,
            action: PayloadAction<Point>
        ) => {
            state.queryLocation = action.payload;
        },
        urbanHeatIslandToolIsLoadingChanged: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.loading = action.payload;
        },
        errorChanged: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
        selectedUrbanAreaFeatureChanged: (
            state,
            action: PayloadAction<UrbanAreaFeature>
        ) => {
            state.selectedUrbanAreaFeature = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    queryLocation4UrbanHeatIslandToolChanged,
    urbanHeatIslandToolIsLoadingChanged,
    errorChanged,
    selectedUrbanAreaFeatureChanged,
} = slice.actions;

export default reducer;
