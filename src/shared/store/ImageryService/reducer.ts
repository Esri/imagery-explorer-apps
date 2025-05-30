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
    ImageryServiceTimeExtentData,
    RasterFunctionInfo,
} from '@typing/imagery-service';

export type ImageryServiceState = {
    /**
     * time extent of the imagery service
     */
    timeExtent: ImageryServiceTimeExtentData;
    /**
     * raster function info of the imagery service
     */
    rasterFunctionInfo: RasterFunctionInfo[];
};

export const initialImageryServiceState: ImageryServiceState = {
    timeExtent: null,
    // rasterFunctionLabelMap: new Map(),
    rasterFunctionInfo: [],
};

export const imageryServiceSlice = createSlice({
    name: 'ImageryService',
    initialState: initialImageryServiceState,
    reducers: {
        imageryServiceTimeExtentUpdated: (
            state,
            action: PayloadAction<ImageryServiceTimeExtentData>
        ) => {
            state.timeExtent = action.payload;
        },
        imageryServiceRasterFunctionInfoUpdated: (
            state,
            action: PayloadAction<RasterFunctionInfo[]>
        ) => {
            state.rasterFunctionInfo = action.payload;
            // state.rasterFunctionLabelMap = getRasterFunctionLabelMap(
            //     action.payload
            // );
        },
    },
});

export const {
    imageryServiceTimeExtentUpdated,
    imageryServiceRasterFunctionInfoUpdated,
} = imageryServiceSlice.actions;

export default imageryServiceSlice.reducer;
