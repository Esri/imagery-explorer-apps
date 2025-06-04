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
    ImageryRasterFunction4LandcoverApp,
    initialLandcoverExplorerAppState,
    LandcoverExplorerAppState,
    MapMode,
} from '@shared/store/LandcoverExplorer/reducer';
import { initialUIState, UIState } from '@shared/store/UI/reducer';
import {
    getActiveYearFromHashParams,
    getDonwloadModeFromHashParams,
    getMapCenterFromHashParams,
    getMapModeFromHashParams,
    getActiveLandCoverTypeFromHashParams,
    getShowImageryLayerFromHashParams,
    getTimeExtentFromHashParams,
    getSentinel2RasterFunctionFromHashParams,
    getActiveMonthFromHashParams,
    getAnimationModeFromHashParams,
    getRegionFromHashParams,
    getShowSaveWebMapPanelFromHashParams,
    getAnimationDataFromHashParams,
} from '@landcover-explorer/utils/URLHashParams';
import { DEFAULT_MAP_CENTERS, DEFAULT_MAP_ZOOM } from '../constants/map';
import { LandCoverClassification } from '@typing/landcover';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
// import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { isMobileDevice } from 'helper-toolkit-ts';
import { PartialRootState } from '@shared/store/configureStore';
import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';

const isMobileView = isMobileDevice();

/**
 * Returns the preloaded state for the Landcover Explorer app, using values from URL hash parameters if available.
 * Falls back to defaults for any missing parameters.
 * Handles mobile/desktop-specific logic for map mode and satellite imagery layer visibility.
 * Also determines if the Info Panel should be shown based on the presence of a region in the hash params.
 */
export const getPreloadedStateForLandcoverExplorerApp =
    (): LandcoverExplorerAppState => {
        // Get the list of available years for land cover data
        const availableYears = getAvailableYears();

        // Parse time extent (start/end year) from URL hash params
        const timeExtent = getTimeExtentFromHashParams();

        // Get active land cover type from URL hash params
        const activelandCoverType = getActiveLandCoverTypeFromHashParams();

        // Determine if the satellite imagery layer should be shown (from hash params)
        const shouldShowSatelliteImageryLayer =
            getShowImageryLayerFromHashParams();

        // Get map mode (step/swipe), default to 'step'
        const mode = (getMapModeFromHashParams() as MapMode) || 'step';

        // Get the active year from hash params
        const year = getActiveYearFromHashParams();

        // Get the selected month for satellite imagery acquisition
        const satelliteImageryLayerAquisitionMonth =
            getActiveMonthFromHashParams();

        // Get the selected raster function for Sentinel-2 imagery
        const satelliteImageryLayerRasterFunction =
            (getSentinel2RasterFunctionFromHashParams() as ImageryRasterFunction4LandcoverApp) ||
            'Natural Color for Visualization';

        // Determine start and end years for swipe widget
        const startYear = timeExtent?.startYear || availableYears[0];
        const endYear =
            timeExtent?.endYear || availableYears[availableYears.length - 1];

        // Get region info from hash params
        const region = getRegionFromHashParams();

        const { animationYearRange } = getAnimationDataFromHashParams();

        return {
            ...initialLandcoverExplorerAppState,
            // Swipe mode can only be enabled in desktop view with wide screen
            mode: isMobileView ? 'step' : mode,
            // Use year from hash params or the most recent year by default
            year: year ? +year : availableYears[availableYears.length - 1],
            // Use month from hash params or default to September (9)
            satelliteImageryLayerAquisitionMonth:
                satelliteImageryLayerAquisitionMonth
                    ? +satelliteImageryLayerAquisitionMonth
                    : 9,
            // Set active land cover type from hash params
            activeLandCoverType: activelandCoverType as LandCoverClassification,
            // Sentinel-2 layer can only be displayed in desktop view with wide screen
            shouldShowSatelliteImageryLayer: isMobileView
                ? false
                : shouldShowSatelliteImageryLayer,
            // Configure swipe widget years
            swipeWidget: {
                year4LeadingLayer: startYear,
                year4TrailingLayer: endYear,
                // position: 50,
            },
            // Set raster function for satellite imagery layer
            satelliteImageryLayerRasterFunction,
            /**
             * Info Panel should be opened if Administrative region (country name and sub region) is found from Hash Params,
             * so it can show the land cover chart using data from land cover stats table
             */
            showInfoPanel: region !== '',
            /**
             * use the animation year range from hash params if available,
             * otherwise default to the last 5 years in the available years list
             */
            animationYearRange: {
                start:
                    animationYearRange?.start ||
                    Math.max(
                        availableYears[0],
                        availableYears[availableYears.length - 1] - 5
                    ),
                end:
                    animationYearRange?.end ||
                    availableYears[availableYears.length - 1],
            },
        };
    };

export const getPreloadedUIState4LandcoverExplorerApp = (): UIState => {
    const showDownloadPanel = getDonwloadModeFromHashParams();
    const isAnimationModeOn = getAnimationModeFromHashParams();

    const showSaveWebMapPanel = getShowSaveWebMapPanelFromHashParams();

    const animationStatus = isAnimationModeOn ? 'loading' : null;

    return {
        ...initialUIState,
        showDownloadPanel,
        /**
         * set animation mode to loading so the animation panel can start loading frames data once Median Layer is ready.
         * animation mode can only be enabled in desktop view with wide screen
         */
        animationStatus: isMobileView ? null : animationStatus,
        showSaveWebMapPanel,
    };
};

const getPreloadedMapState = (): MapState => {
    const { zoom, center } = getMapCenterFromHashParams() || {};

    return {
        ...initialMapState,
        zoom: zoom || DEFAULT_MAP_ZOOM,
        center: center || getRandomElement(DEFAULT_MAP_CENTERS),
    };
};

export const getPreloadedState = (): PartialRootState => {
    return {
        LandcoverExplorer: getPreloadedStateForLandcoverExplorerApp(),
        UI: getPreloadedUIState4LandcoverExplorerApp(),
        Map: getPreloadedMapState(),
    };
};
