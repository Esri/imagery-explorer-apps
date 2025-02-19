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
import Point from '@arcgis/core/geometry/Point';

export type SpectralProfileToolState = {
    /**
     * point of interest that will be used to query the pixel values that will be used in spectral profile comparison
     */
    queryLocation: Point;
    /**
     * spectral prfile data/band values from the pixel of the query location
     */
    spectralProfileData: number[];
    /**
     * if true, it is in process of fetching spectral profile data
     */
    isLoading: boolean;
    /**
     * error message that was caught while fetch the spectral profile data
     */
    error: string;
};

export const initialSpectralProfileToolState: SpectralProfileToolState = {
    queryLocation: null,
    spectralProfileData: [],
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: 'SpectralProfileTool',
    initialState: initialSpectralProfileToolState,
    reducers: {
        queryLocationChanged: (state, action: PayloadAction<Point>) => {
            state.queryLocation = action.payload;
        },
        isLoadingToggled: (state, action: PayloadAction<boolean>) => {
            state.isLoading = action.payload;
        },
        spectralProfileDataUpdated: (
            state,
            action: PayloadAction<number[]>
        ) => {
            state.spectralProfileData = action.payload;
            state.error = null;
        },
        errorChanged: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    queryLocationChanged,
    isLoadingToggled,
    spectralProfileDataUpdated,
    errorChanged,
} = slice.actions;

export default reducer;
