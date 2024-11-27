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
import { EmitScene } from '@typing/imagery-service';

export type EmitState = {
    /**
     * Landsat scenes that intersect with center point of map view and were acquired during the input year.
     */
    EmitScenes?: {
        byObjectId?: {
            [key: number]: EmitScene;
        };
        objectIds?: number[];
    };
    /**
     * list of Landat missions to be excluded
     */
    missionsToBeExcluded: number[];
};

export const initialEmitState: EmitState = {
    EmitScenes: {
        byObjectId: {},
        objectIds: [],
    },
    missionsToBeExcluded: [],
};

const slice = createSlice({
    name: 'Emit',
    initialState: initialEmitState,
    reducers: {
        EmitScenesUpdated: (
            state,
            action: PayloadAction<EmitScene[]>
        ) => {
            const objectIds: number[] = [];

            const byObjectId: {
                [key: number]: EmitScene;
            } = {};

            for (const scene of action.payload) {
                const { objectId } = scene;

                objectIds.push(objectId);
                byObjectId[objectId] = scene;
            }

            state.EmitScenes = {
                objectIds,
                byObjectId,
            };
        },
        missionsToBeExcludedUpdated: (
            state,
            action: PayloadAction<number[]>
        ) => {
            state.missionsToBeExcluded = action.payload;
        },
    },
});

const { reducer } = slice;

export const { EmitScenesUpdated, missionsToBeExcludedUpdated } =
    slice.actions;

export default reducer;
