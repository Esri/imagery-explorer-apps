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
 * Type for the disaster response scenes grouped by acquisition date, which is used to display the scenes in the EventSceneSelector component.
 * The scenes are grouped by acquisition date so it can be displayed in a chronological order with acquisition date as the header
 */
export type DisasterResponseScenesGroupedByAcquisitionDate = {
    /**
     * Acquisition date in the format of 'yyyy-MM-dd', e.g. '2025-11-01', etc.
     */
    formattedAcquisitionDate: string;
    /**
     * If true, the year label (which is the first 4 digits of the acquisition date) will be displayed as a header for the group of scenes with the same acquisition date.
     * The year label will only be displayed when the year is different from the previous scene, or it's the first scene in the list
     */
    shouldShowYearLabel: boolean;
    /**
     * Type of the disaster response scenes in the group. If any scene in the group is a post-event image, the image type of the group will be 'post-event', otherwise it will be 'pre-event'.
     * This is used for adding indicators in the UI to differentiate pre-event and post-event images, which can help users quickly identify the scenes they are interested in.
     */
    imageType: 'pre-event' | 'post-event' | 'unknown';
    /**
     * Indicates whether this is the first group that contains post-event images in the list of scenes for the selected event.
     */
    firstGroupWithPostEventImage: boolean;
    /**
     * List of object ids of the scenes with the same acquisition date. This is used to retrieve the scene information from the byObjectId map to display the scenes in the EventSceneSelector component
     */
    objectIds: number[];
};

/**
 * State for Disaster Imagery Explorer.
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
     * Paginated DisasterResponseScenesGroupedByAcquisitionDate for the selected event.
     * The pagination ensures the scene selection component only renders a limited number of scene groups at a time to avoid overwhelming the UI.
     */
    scenePaginationPages: DisasterResponseScenesGroupedByAcquisitionDate[][];
    /**
     * Index of the current page in the pagination of scenes for the selected event.
     */
    scenePaginationCurrentPageIndex: number;
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
    scenePaginationPages: [],
    scenePaginationCurrentPageIndex: 0,
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
        disasterResponseSecenesReset: (state) => {
            state.disasterResponseScenes = {
                byObjectId: {},
                objectIds: [],
            };

            state.scenePaginationPages = [];
            state.scenePaginationCurrentPageIndex = 0;

            state.objectIdsOfScenesInCurrentMapExtent = null;
            state.objectIdOfHoveredScene = null;
            state.selectedEvent = '';
        },
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
        paginatedScenesLoaded: (
            state,
            action: PayloadAction<
                DisasterResponseScenesGroupedByAcquisitionDate[][]
            >
        ) => {
            const scenePaginationPages = action.payload || [];
            state.scenePaginationPages = scenePaginationPages;
        },
        pageIndexUpdated: (state, action: PayloadAction<number>) => {
            state.scenePaginationCurrentPageIndex = action.payload;
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
        selectedEventUpdated: (state, action: PayloadAction<string>) => {
            state.selectedEvent = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    disasterResponseSecenesUpdated,
    paginatedScenesLoaded,
    selectedEventUpdated,
    objectIdsOfScenesInCurrentMapExtentUpdated,
    objectIdOfHoveredSceneUpdated,
    isLoadingScenesUpdated,
    disasterResponseSecenesReset,
    pageIndexUpdated,
} = slice.actions;

export default reducer;
