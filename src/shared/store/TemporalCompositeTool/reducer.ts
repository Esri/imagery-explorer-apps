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

export type TemporalCompositeToolState = {
    /**
     * if true, the temporal composite layer is visible in the map
     */
    isTemporalCompositeLayerOn: boolean;
    /**
     * name of the raster function to be used for the temporal composite tool
     */
    rasterFunction: string;
};

export const initialState4TemporalCompositeTool: TemporalCompositeToolState = {
    isTemporalCompositeLayerOn: false,
    rasterFunction: '',
};

const slice = createSlice({
    name: 'TemporalCompositeTool',
    initialState: initialState4TemporalCompositeTool,
    reducers: {
        isTemporalCompositeLayerOnUpdated: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.isTemporalCompositeLayerOn = action.payload;
        },
        rasterFunction4TemporalCompositeToolChanged: (
            state,
            action: PayloadAction<string>
        ) => {
            state.rasterFunction = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    isTemporalCompositeLayerOnUpdated,
    rasterFunction4TemporalCompositeToolChanged,
} = slice.actions;

export default reducer;
