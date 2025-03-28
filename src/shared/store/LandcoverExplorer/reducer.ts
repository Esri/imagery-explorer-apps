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
import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { LandCoverClassification } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { Extent } from '@arcgis/core/geometry';

export type MapMode = 'swipe' | 'step';

// export type MapCenter = {
//     lon?: number;
//     lat?: number;
// };

export type LandcoverExplorerAppState = {
    /**
     * In Swipe Mode, user is allowed to pick up two years from the Time Slider and compare the map layers from those two years using the Swipe Mode
     * In Step Mode, user can only select one year at a time and the Swipe Widget will be disabled
     */
    mode: MapMode;
    /**
     * the selected year in Step Mode, that will be used to display layers and fetch data for land cover graph
     */
    year: number;
    /**
     * If true, show Sentinel 2 Layer instead of Land Cover Layer
     */
    shouldShowSentinel2Layer: boolean;
    /**
     * The month that will be used to fetch sentinel-2 imagery layer
     */
    sentinel2AquisitionMonth: number;
    // /**
    //  * Represents the level of detail (LOD) at the center of the view.
    //  */
    // zoom?: number;
    // /**
    //  * Represents the view's center point
    //  */
    // center?: MapCenter;
    // /**
    //  * Represents the size of one pixel in map units.
    //  * The value of resolution can be found by dividing the extent width by the view's width.
    //  */
    // resolution?: number;
    // /**
    //  * The extent represents the visible portion of a map within the view as an instance of Extent.
    //  */
    // extent?: Extent;
    swipeWidget: {
        year4LeadingLayer: number;
        year4TrailingLayer: number;
        // position?: number;
    };
    /**
     * The active Land Cover type selected by the user that will be used to
     * get the raster functions to filter the Land Cover layer
     */
    activeLandCoverType: LandCoverClassification;
    // /**
    //  * If true, Map Reference Labels layer will be on
    //  */
    // showMapLabel?: boolean;
    // /**
    //  * If true, Terrain Layer will be on
    //  */
    // showTerrain?: boolean;
    /**
     * Sentinel 2 Raster function that will be used to render the layer
     */
    sentinel2RasterFunction: Sentinel2RasterFunction;
    /**
     * If true, open info panel that shows detailed land cover info
     */
    showInfoPanel: boolean;
    /**
     * If true, show leading and trailing year in Swipe Widget Reference Info Component
     */
    showSwipeWidgetYearIndicator?: boolean;
};

export const initialLandcoverExplorerAppState: LandcoverExplorerAppState = {
    mode: 'swipe',
    year: null,
    shouldShowSentinel2Layer: false,
    sentinel2AquisitionMonth: 9,
    // zoom: 11,
    // center: null,
    // resolution: null,
    // extent: null,
    swipeWidget: {
        year4LeadingLayer: null,
        year4TrailingLayer: null,
        // position: 50,
    },
    activeLandCoverType: null,
    // showMapLabel: true,
    // showTerrain: true,
    sentinel2RasterFunction: 'Natural Color for Visualization', // Default raster function for Sentinel-2 layer
    showInfoPanel: false,
    showSwipeWidgetYearIndicator: false,
};

const slice = createSlice({
    name: 'LandcoverExplorer',
    initialState: initialLandcoverExplorerAppState,
    reducers: {
        modeChanged: (state, action: PayloadAction<MapMode>) => {
            state.mode = action.payload;
        },
        yearUpdated: (state, action: PayloadAction<number>) => {
            state.year = action.payload;
        },
        year4LeadingLayerUpdated: (state, action: PayloadAction<number>) => {
            state.swipeWidget.year4LeadingLayer = action.payload;
        },
        year4TrailingLayerUpdated: (state, action: PayloadAction<number>) => {
            state.swipeWidget.year4TrailingLayer = action.payload;
        },
        // resolutionUpdated: (state, action: PayloadAction<number>) => {
        //     state.resolution = action.payload;
        // },
        // extentUpdated: (state, action: PayloadAction<Extent>) => {
        //     state.extent = action.payload;
        // },
        shouldShowSentinel2LayerToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.shouldShowSentinel2Layer = action.payload;
        },
        activeLandCoverTypeChanged: (
            state,
            action: PayloadAction<LandCoverClassification>
        ) => {
            state.activeLandCoverType = action.payload;
        },
        // swipePositionChanged: (state, action: PayloadAction<number>) => {
        //     state.swipeWidget.position = action.payload;
        // },
        // showMapLabelToggled: (state) => {
        //     state.showMapLabel = !state.showMapLabel;
        // },
        // showTerrainToggled: (state) => {
        //     state.showTerrain = !state.showTerrain;
        // },
        // mapCenterUpdated: (state, action: PayloadAction<MapCenter>) => {
        //     state.center = action.payload;
        // },
        // zoomUpdated: (state, action: PayloadAction<number>) => {
        //     state.zoom = action.payload;
        // },
        sentinel2RasterFunctionChanged: (
            state,
            action: PayloadAction<Sentinel2RasterFunction>
        ) => {
            state.sentinel2RasterFunction = action.payload;
        },
        sentinel2AquisitionMonthChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.sentinel2AquisitionMonth = action.payload;
        },
        showInfoPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showInfoPanel = action.payload;
        },
        showSwipeWidgetYearIndicatorToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.showSwipeWidgetYearIndicator = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    modeChanged,
    yearUpdated,
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    // resolutionUpdated,
    // extentUpdated,
    shouldShowSentinel2LayerToggled,
    activeLandCoverTypeChanged,
    // swipePositionChanged,
    // showMapLabelToggled,
    // showTerrainToggled,
    // mapCenterUpdated,
    // zoomUpdated,
    sentinel2RasterFunctionChanged,
    sentinel2AquisitionMonthChanged,
    showInfoPanelToggled,
    showSwipeWidgetYearIndicatorToggled,
} = slice.actions;

export default reducer;
