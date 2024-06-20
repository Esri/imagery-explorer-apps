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
import { MAP_CENTER, MAP_ZOOM } from '../../constants/map';
import Point from '@arcgis/core/geometry/Point';
import { Extent } from '@arcgis/core/geometry';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapState = {
    // /**
    //  * item id of the web map
    //  */
    // webmapId: string;
    /**
     * center of map [longitude, latitude]
     */
    center: number[];
    /**
     * zoom level
     */
    zoom: number;
    /**
     * Represents the size of one pixel in map units.
     * The value of resolution can be found by dividing the extent width by the view's width.
     */
    resolution?: number;
    /**
     * The extent represents the visible portion of a map within the view as an instance of Extent.
     */
    extent?: Extent;
    /**
     * If true, Map Reference Labels layer will be on
     */
    showMapLabel: boolean;
    /**
     * If true, Terrain Layer will be on
     */
    showTerrain: boolean;
    /**
     * If true, Basemap Layers will be on
     */
    showBasemap: boolean;
    /**
     * handler position of swipe widget ranged from 0 - 100
     */
    swipeWidgetHanlderPosition: number;
    /**
     * anchor location of the map popup windown
     */
    popupAnchorLocation: Point;
    /**
     *	Indicates whether the map is being updated by additional data requests to the network, or by processing received data.
     */
    isUpadting: boolean;
};

export const initialMapState: MapState = {
    // webmapId: WEB_MAP_ID, // Topographic
    center: MAP_CENTER,
    zoom: MAP_ZOOM,
    resolution: null,
    extent: null,
    showMapLabel: true,
    showTerrain: true,
    showBasemap: true,
    swipeWidgetHanlderPosition: 50,
    popupAnchorLocation: null,
    isUpadting: false,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        // webmapIdChanged: (state, action: PayloadAction<string>) => {
        //     state.webmapId = action.payload;
        // },
        centerChanged: (state, action: PayloadAction<number[]>) => {
            state.center = action.payload;
        },
        zoomChanged: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
        resolutionUpdated: (state, action: PayloadAction<number>) => {
            state.resolution = action.payload;
        },
        extentUpdated: (state, action: PayloadAction<Extent>) => {
            state.extent = action.payload;
        },
        showMapLabelToggled: (state) => {
            state.showMapLabel = !state.showMapLabel;
        },
        showTerrainToggled: (state) => {
            state.showTerrain = !state.showTerrain;
        },
        showBasemapToggled: (state) => {
            state.showBasemap = !state.showBasemap;
        },
        swipeWidgetHanlderPositionChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.swipeWidgetHanlderPosition = action.payload;
        },
        popupAnchorLocationChanged: (state, action: PayloadAction<Point>) => {
            state.popupAnchorLocation = action.payload;
        },
        isUpdatingChanged: (state, action: PayloadAction<boolean>) => {
            state.isUpadting = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    // webmapIdChanged,
    centerChanged,
    zoomChanged,
    resolutionUpdated,
    extentUpdated,
    showMapLabelToggled,
    showTerrainToggled,
    showBasemapToggled,
    swipeWidgetHanlderPositionChanged,
    popupAnchorLocationChanged,
    isUpdatingChanged,
} = slice.actions;

export default reducer;
