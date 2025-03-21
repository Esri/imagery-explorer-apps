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
    Sentinel1OrbitDirection,
    Sentinel1Scene,
} from '@typing/imagery-service';

export type Sentinel1PolarizationFilter = 'VV' | 'VH';

export type LockedRelativeOrbitInfo = {
    lockedRelativeOrbit: string;
    objectIdOfSceneWithLockedRelativeOrbit: number;
};

export type Sentinel1State = {
    /**
     * Sentinel-1 scenes that intersect with center point of map view and were acquired during the input year.
     */
    sentinel1Scenes: {
        byObjectId: {
            [key: number]: Sentinel1Scene;
        };
        objectIds: number[];
    };
    orbitDirection: Sentinel1OrbitDirection;
    /**
     * The polarization filter that allows user to switch between VV and VH
     */
    polarizationFilter: Sentinel1PolarizationFilter;
    /**
     * the relative orbit that will be used to lock the scene selection to make sure the Analyze tools like Change Compare or Temporal Composite always use scenes have the same relative orbit
     */
    lockedRelativeOrbitInfo: LockedRelativeOrbitInfo;
};

export const initialSentinel1State: Sentinel1State = {
    sentinel1Scenes: {
        byObjectId: {},
        objectIds: [],
    },
    orbitDirection: 'Ascending',
    polarizationFilter: 'VV',
    lockedRelativeOrbitInfo: null,
};

const slice = createSlice({
    name: 'Sentinel1',
    initialState: initialSentinel1State,
    reducers: {
        sentinel1ScenesUpdated: (
            state,
            action: PayloadAction<Sentinel1Scene[]>
        ) => {
            const objectIds: number[] = [];

            const byObjectId: {
                [key: number]: Sentinel1Scene;
            } = {};

            for (const scene of action.payload) {
                const { objectId } = scene;

                objectIds.push(objectId);
                byObjectId[objectId] = scene;
            }

            state.sentinel1Scenes = {
                objectIds,
                byObjectId,
            };
        },
        orbitDirectionChanged: (
            state,
            action: PayloadAction<Sentinel1OrbitDirection>
        ) => {
            state.orbitDirection = action.payload;
        },
        polarizationFilterChanged: (
            state,
            action: PayloadAction<Sentinel1PolarizationFilter>
        ) => {
            state.polarizationFilter = action.payload;
        },
        lockedRelativeOrbitInfoChanged: (
            state,
            action: PayloadAction<LockedRelativeOrbitInfo>
        ) => {
            state.lockedRelativeOrbitInfo = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    sentinel1ScenesUpdated,
    orbitDirectionChanged,
    polarizationFilterChanged,
    lockedRelativeOrbitInfoChanged,
} = slice.actions;

export default reducer;
