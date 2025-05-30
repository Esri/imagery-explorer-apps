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
} from '@landcover-explorer/utils/URLHashParams';
import { DEFAULT_MAP_CENTERS, DEFAULT_MAP_ZOOM } from '../constants/map';
import { LandCoverClassification } from '@shared/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '@shared/services/sentinel-2-10m-landcover/timeInfo';
import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { isMobileDevice } from 'helper-toolkit-ts';
import { PartialRootState } from '@shared/store/configureStore';
import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';

const isMobileView = isMobileDevice();

const getPreloadedStateForLandcoverExplorerApp =
    (): LandcoverExplorerAppState => {
        const availableYears = getAvailableYears();

        const timeExtent = getTimeExtentFromHashParams();
        const activelandCoverType = getActiveLandCoverTypeFromHashParams();
        const shouldShowSatelliteImageryLayer =
            getShowImageryLayerFromHashParams();

        const mode = (getMapModeFromHashParams() as MapMode) || 'step';

        const year = getActiveYearFromHashParams();
        const satelliteImageryLayerAquisitionMonth =
            getActiveMonthFromHashParams();

        const satelliteImageryLayerRasterFunction =
            (getSentinel2RasterFunctionFromHashParams() as Sentinel2RasterFunction) ||
            'Natural Color for Visualization';

        const startYear = timeExtent?.startYear || availableYears[0];
        const endYear =
            timeExtent?.endYear || availableYears[availableYears.length - 1];

        const region = getRegionFromHashParams();

        return {
            ...initialLandcoverExplorerAppState,
            // swipe mode can only be enabled in desktop view with wide screen
            mode: isMobileView ? 'step' : mode,
            // use year from hash params or the most recent year by default
            year: year ? +year : availableYears[availableYears.length - 1],
            satelliteImageryLayerAquisitionMonth:
                satelliteImageryLayerAquisitionMonth
                    ? +satelliteImageryLayerAquisitionMonth
                    : 9,
            // zoom: mapCenterInfo?.zoom || DEFAULT_MAP_ZOOM,
            // center: mapCenterInfo?.center || getMapCenterFromDefaultLocations(),
            activeLandCoverType: activelandCoverType as LandCoverClassification,
            // sentinel-2 layer can only be displayed in desktop view with wide screen
            shouldShowSatelliteImageryLayer: isMobileView
                ? false
                : shouldShowSatelliteImageryLayer,
            swipeWidget: {
                year4LeadingLayer: startYear,
                year4TrailingLayer: endYear,
                // position: 50,
            },
            satelliteImageryLayerRasterFunction,
            /**
             * Info Panel should be opened if Administrative region (country name and sub region) is found from Hash Params,
             * so it can show the land cover chart using data from land cover stats table
             */
            showInfoPanel: region !== '',
        };
    };

const getPreloadedUIState = (): UIState => {
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
        UI: getPreloadedUIState(),
        Map: getPreloadedMapState(),
    };
};
