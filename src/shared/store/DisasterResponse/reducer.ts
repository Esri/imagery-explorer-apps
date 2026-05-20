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
import { DisasterResponseScene, LandsatScene } from '@typing/imagery-service';

export type DisasterResponseEvent = {
    /**
     * Unique identifier for the disaster response event, e.g. 'Cyclone-Ditwah-Sri-Lanka-Nov-2025', etc.
     */
    event: string;
    /**
     * Title of the disaster response event, e.g. 'Cyclone Ditwah in Sri Lanka - November 2025', etc.
     */
    title: string;
    /**
     * Description of the disaster response event, e.g. "Cyclone Ditwah caused severe flooding in Sri Lanka, affecting nearly 1 million residents. Hundreds are reported missing or dead. The rainfall also triggered multiple fatal landslides."
     */
    description: string;
    /**
     * Start date of the disaster response event in unix timestamp, e.g. 1700000000, etc.
     */
    startDate: number;
};

/**
 * State for Disaster Response Explorer.
 */
export type DRXState = {
    /**
     * Imagery scenes from the Disaster Response imagery service for the selected disaster response event.
     */
    disasterResponseScenes: {
        byObjectId: {
            [key: number]: DisasterResponseScene;
        };
        objectIds: number[];
    };
    /**
     * list of object ids of the scenes that are currently within the map extent. This is used to determine which footprints to display on the map to optimize performance
     */
    objectIdsOfScenesInCurrentMapExtent: number[];
    /**
     * object id of the scene to show footprint on the map.
     * This happens when user hovers over the scene box in the EventSceneSelector component, which provides a visual hint on the map about the location of the scene.
     * The footprint will be hidden when user stops hovering over the scene box, which sets this value back to null.
     */
    objectIdOfHoveredScene: number;
    /**
     * list of all disaster response events to be displayed in the dropdown for selection
     */
    events: {
        byEventId: {
            [key: string]: DisasterResponseEvent;
        };
        eventIds: string[];
    };
    /**
     * Unique identifier for the selected disaster response event, e.g. 'Cyclone-Ditwah-Sri-Lanka-Nov-2025', etc.
     */
    selectedEvent: string;
    /**
     * If true, it is in the process of fetching disaster response scenes for a selected event
     */
    isLoadingScenes: boolean;
};

export const initialDRXState: DRXState = {
    disasterResponseScenes: {
        byObjectId: {},
        objectIds: [],
    },
    objectIdsOfScenesInCurrentMapExtent: null,
    objectIdOfHoveredScene: null,
    events: {
        byEventId: {},
        eventIds: [],
    },
    selectedEvent: '',
    isLoadingScenes: false,
};

const slice = createSlice({
    name: 'DRX',
    initialState: initialDRXState,
    reducers: {
        disasterResponseSecenesUpdated: (
            state,
            action: PayloadAction<DisasterResponseScene[]>
        ) => {
            const objectIds: number[] = [];

            const byObjectId: {
                [key: number]: DisasterResponseScene;
            } = {};

            for (const scene of action.payload) {
                const { objectId } = scene;

                objectIds.push(objectId);
                byObjectId[objectId] = scene;
            }

            state.disasterResponseScenes = {
                objectIds,
                byObjectId,
            };
        },
        selectedEventUpdated: (state, action: PayloadAction<string>) => {
            state.selectedEvent = action.payload;
        },
        objectIdsOfScenesInCurrentMapExtentUpdated: (
            state,
            action: PayloadAction<number[]>
        ) => {
            state.objectIdsOfScenesInCurrentMapExtent = action.payload;
        },
        objectIdOfHoveredSceneUpdated: (
            state,
            action: PayloadAction<number>
        ) => {
            state.objectIdOfHoveredScene = action.payload;
        },
        isLoadingScenesUpdated: (state, action: PayloadAction<boolean>) => {
            state.isLoadingScenes = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    disasterResponseSecenesUpdated,
    selectedEventUpdated,
    objectIdsOfScenesInCurrentMapExtentUpdated,
    objectIdOfHoveredSceneUpdated,
    isLoadingScenesUpdated,
} = slice.actions;

export default reducer;
