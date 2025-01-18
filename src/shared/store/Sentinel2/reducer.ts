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
import { Sentinel2Scene } from '@typing/imagery-service';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type Sentinel2State = {
    /**
     * Sentinel-2 scenes that intersect with center point of map view and were acquired during the input year.
     */
    sentinel2Scenes: {
        byObjectId: {
            [key: number]: Sentinel2Scene;
        };
        objectIds: number[];
    };
};

export const initialSentinel2State: Sentinel2State = {
    sentinel2Scenes: {
        byObjectId: {},
        objectIds: [],
    },
};

const slice = createSlice({
    name: 'Sentinel2',
    initialState: initialSentinel2State,
    reducers: {
        sentinel2ScenesUpdated: (
            state,
            action: PayloadAction<Sentinel2Scene[]>
        ) => {
            const objectIds: number[] = [];

            const byObjectId: {
                [key: number]: Sentinel2Scene;
            } = {};

            for (const scene of action.payload) {
                const { objectId } = scene;

                objectIds.push(objectId);
                byObjectId[objectId] = scene;
            }

            state.sentinel2Scenes = {
                objectIds,
                byObjectId,
            };
        },
    },
});

const { reducer } = slice;

export const { sentinel2ScenesUpdated } = slice.actions;

export default reducer;
