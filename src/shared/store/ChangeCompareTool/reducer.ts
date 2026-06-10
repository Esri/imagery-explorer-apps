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
import { RadarIndex, SpectralIndex } from '@typing/imagery-service';

export type ChangeCompareToolState = {
    /**
     * user selected option that will be used to create raster function to compare change between two imagery scenes
     */
    selectedOption: SpectralIndex | RadarIndex | string;
    /**
     * if true, the change compare layer is visible in the map
     */
    changeCompareLayerIsOn: boolean;
    /**
     * user selected pixel value range, the full range of pixel values of change compare layer should be between -2 and 2
     */
    selectedRange: number[];
    /**
     * the full range of pixel values
     */
    fullPixelValuesRange: number[];
    /**
     * The second selected range for change compare layer, when provided, this will be used with the first selected range to do a dual range selection that allows users to select two separate ranges of pixel values to be visualized on the map, instead of just one continuous range. This is useful when there are two distinct groups of pixel values that users want to focus on.
     */
    selectedRange2?: number[];
};

export const initialChangeCompareToolState: ChangeCompareToolState = {
    selectedOption: 'vegetation',
    changeCompareLayerIsOn: false,
    selectedRange: [-2, 2],
    fullPixelValuesRange: [-2, 2],
    selectedRange2: null,
};

const slice = createSlice({
    name: 'ChangeCompareTool',
    initialState: initialChangeCompareToolState,
    reducers: {
        selectedOption4ChangeCompareToolChanged: (
            state,
            action: PayloadAction<SpectralIndex | RadarIndex>
        ) => {
            state.selectedOption = action.payload;
        },
        changeCompareLayerIsOnUpdated: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.changeCompareLayerIsOn = action.payload;
        },
        selectedRangeUpdated: (state, action: PayloadAction<number[]>) => {
            state.selectedRange = action.payload;
        },
        fullPixelValuesRangeUpdated: (
            state,
            action: PayloadAction<number[]>
        ) => {
            state.fullPixelValuesRange = action.payload;
        },
        selectedRange2Updated: (state, action: PayloadAction<number[]>) => {
            state.selectedRange2 = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    selectedOption4ChangeCompareToolChanged,
    changeCompareLayerIsOnUpdated,
    selectedRangeUpdated,
    fullPixelValuesRangeUpdated,
    selectedRange2Updated,
} = slice.actions;

export default reducer;
