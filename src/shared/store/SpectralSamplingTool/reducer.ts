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
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import Point from '@arcgis/core/geometry/Point';

export type SpectralSamplingData = {
    uniqueId: string;
    /**
     * point geometry to query the pixel values that will be used in spectral profile comparison
     */
    location: Point;
    /**
     * spectral prfile data/band values from the pixel of the query location
     */
    bandValues: number[];
    /**
     * if true, it is in process of fetching spectral profile data
     */
    isLoading: boolean;
};

export type SpectralSamplingToolState = {
    /**
     * name of the land cover classification (e.g. 'Desert', 'Lush Vegetation') that the user intends to create spectral sampling of.
     */
    classificationName: string;
    /**
     * sampling points that the user has created for the current session
     */
    data: {
        byId: {
            [key: string]: SpectralSamplingData;
        };
        /**
         * Id of user selected sampling locations
         */
        ids: string[];
    };
    /**
     * id of sampling point to highlight in chart.
     * This can happen when user hover a item in the sampling points list.
     */
    idOfItem2Highlight: string;
};

export const initialSpectralSamplingToolState: SpectralSamplingToolState = {
    classificationName: '',
    data: {
        byId: {},
        ids: [],
    },
    idOfItem2Highlight: '',
};

const slice = createSlice({
    name: 'SpectralSamplingTool',
    initialState: initialSpectralSamplingToolState,
    reducers: {
        classificationNameUpdated: (state, action: PayloadAction<string>) => {
            state.classificationName = action.payload;
        },
        samplingDataUpdated: (
            state,
            action: PayloadAction<SpectralSamplingData[]>
        ) => {
            const data = action.payload;

            const byId: {
                [key: string]: SpectralSamplingData;
            } = {};

            const ids: string[] = [];

            for (const item of data) {
                const { uniqueId } = item;
                byId[uniqueId] = item;
                ids.push(uniqueId);
            }

            state.data = {
                byId,
                ids,
            };
        },
        dataOfSelectedSamplingPointChanged: (
            state,
            action: PayloadAction<{
                id: string;
                data: SpectralSamplingData;
            }>
        ) => {
            const { data, id } = action.payload;
            state.data.byId[id] = data;
        },
        idOfItem2HighlightChanged: (state, action: PayloadAction<string>) => {
            state.idOfItem2Highlight = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    classificationNameUpdated,
    samplingDataUpdated,
    dataOfSelectedSamplingPointChanged,
    idOfItem2HighlightChanged,
} = slice.actions;

export default reducer;
