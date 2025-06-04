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
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';
import { Sentinel2FunctionName } from '@shared/services/sentinel-2/config';
import { getCurrentYear } from '@shared/utils/date-time/getCurrentDateTime';
// import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { LandCoverClassification } from '@typing/landcover';

export type ImageryRasterFunction4LandcoverApp =
    | Sentinel2FunctionName
    | LandsatRasterFunctionName;

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
     * If true, show satellite imagery layer (sentinel-2/landsat) instead of Land Cover Layer
     */
    shouldShowSatelliteImageryLayer: boolean;
    /**
     * The month that will be used to fetch satellite imagery layer (sentinel-2/landsat) imagery layer
     */
    satelliteImageryLayerAquisitionMonth: number;
    /**
     * The year for which the leading and trailing layers will be displayed in Swipe Widget
     */
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
    /**
     * Raster function name for satellite imagery layer (sentinel-2/landsat)
     */
    satelliteImageryLayerRasterFunction: ImageryRasterFunction4LandcoverApp;
    /**
     * If true, open info panel that shows detailed land cover info
     */
    showInfoPanel: boolean;
    /**
     * If true, show leading and trailing year in Swipe Widget Reference Info Component
     */
    showSwipeWidgetYearIndicator?: boolean;
    /**
     * The range of years that will be used for the animation
     */
    animationYearRange: {
        start: number;
        end: number;
    };
};

export const initialLandcoverExplorerAppState: LandcoverExplorerAppState = {
    mode: 'swipe',
    year: null,
    shouldShowSatelliteImageryLayer: false,
    satelliteImageryLayerAquisitionMonth: 9,
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
    satelliteImageryLayerRasterFunction: 'Natural Color for Visualization', // Default raster function for Sentinel-2 layer
    showInfoPanel: false,
    showSwipeWidgetYearIndicator: false,
    animationYearRange: {
        start: getCurrentYear(),
        end: getCurrentYear(),
    },
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
        shouldShowSatelliteImageryLayerToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.shouldShowSatelliteImageryLayer = action.payload;
        },
        activeLandCoverTypeChanged: (
            state,
            action: PayloadAction<LandCoverClassification>
        ) => {
            state.activeLandCoverType = action.payload;
        },
        satelliteImageryLayerRasterFunctionChanged: (
            state,
            action: PayloadAction<ImageryRasterFunction4LandcoverApp>
        ) => {
            state.satelliteImageryLayerRasterFunction = action.payload;
        },
        satelliteImageryLayerAquisitionMonthChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.satelliteImageryLayerAquisitionMonth = action.payload;
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
        landcoverAnimationYearRangeChanged: (
            state,
            action: PayloadAction<{ start: number; end: number }>
        ) => {
            state.animationYearRange = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    modeChanged,
    yearUpdated,
    year4LeadingLayerUpdated,
    year4TrailingLayerUpdated,
    shouldShowSatelliteImageryLayerToggled,
    activeLandCoverTypeChanged,
    satelliteImageryLayerAquisitionMonthChanged,
    satelliteImageryLayerRasterFunctionChanged,
    showInfoPanelToggled,
    showSwipeWidgetYearIndicatorToggled,
    landcoverAnimationYearRangeChanged,
} = slice.actions;

export default reducer;
