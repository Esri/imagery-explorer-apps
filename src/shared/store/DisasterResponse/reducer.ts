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
     * list of all disaster response events to be displayed in the dropdown for selection
     */
    events: {
        byEvent: {
            [key: string]: DisasterResponseEvent;
        };
        eventIds: string[];
    };
    /**
     * Unique identifier for the selected disaster response event, e.g. 'Cyclone-Ditwah-Sri-Lanka-Nov-2025', etc.
     */
    selectedEvent: string;
};

export const initialDRXState: DRXState = {
    disasterResponseScenes: {
        byObjectId: {},
        objectIds: [],
    },
    events: {
        byEvent: {},
        eventIds: [],
    },
    selectedEvent: '',
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
        eventsUpdated: (
            state,
            action: PayloadAction<DisasterResponseEvent[]>
        ) => {
            const eventIds: string[] = [];

            const byEvent: {
                [key: string]: DisasterResponseEvent;
            } = {};

            for (const event of action.payload) {
                const { event: eventId } = event;

                eventIds.push(eventId);
                byEvent[eventId] = event;
            }

            state.events = {
                eventIds,
                byEvent,
            };
        },
        selectedEventUpdated: (state, action: PayloadAction<string>) => {
            state.selectedEvent = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    disasterResponseSecenesUpdated,
    eventsUpdated,
    selectedEventUpdated,
} = slice.actions;

export default reducer;
