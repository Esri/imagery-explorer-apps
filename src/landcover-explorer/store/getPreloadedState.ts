import { PartialRootState } from './configureStore';

import { initialMapState, MapMode, MapState } from '../store/Map/reducer';
import { initialUIState, UIState } from './UI/reducer';
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
import { LandCoverClassification } from '@landcover-explorer/services/sentinel-2-10m-landcover/rasterAttributeTable';
import { getAvailableYears } from '@landcover-explorer/services/sentinel-2-10m-landcover/timeInfo';
import { Sentinel2RasterFunction } from '@landcover-explorer/components/ControlPanel/Sentinel2LayerRasterFunctionsList/Sentinel2LayerRasterFunctionsListContainer';
import { isMobileDevice } from 'helper-toolkit-ts';

const isMobileView = isMobileDevice();

/**
 * Get a map center from list of default map centers randomly
 */
const getMapCenterFromDefaultLocations = () => {
    const randomIdx = Math.floor(Math.random() * DEFAULT_MAP_CENTERS.length);
    const [lon, lat] = DEFAULT_MAP_CENTERS[randomIdx];
    return {
        lon,
        lat,
    };
};

const getPreloadedMapState = (): MapState => {
    const availableYears = getAvailableYears();

    const mapCenterInfo = getMapCenterFromHashParams();
    const timeExtent = getTimeExtentFromHashParams();
    const activelandCoverType = getActiveLandCoverTypeFromHashParams();
    const shouldShowSentinel2Layer = getShowImageryLayerFromHashParams();

    const mode = (getMapModeFromHashParams() as MapMode) || 'step';

    const year = getActiveYearFromHashParams();
    const sentinel2AquisitionMonth = getActiveMonthFromHashParams();

    const sentinel2RasterFunction =
        (getSentinel2RasterFunctionFromHashParams() as Sentinel2RasterFunction) ||
        'Natural Color with DRA';

    const startYear = timeExtent?.startYear || availableYears[0];
    const endYear =
        timeExtent?.endYear || availableYears[availableYears.length - 1];

    return {
        ...initialMapState,
        // swipe mode can only be enabled in desktop view with wide screen
        mode: isMobileView ? 'step' : mode,
        // use year from hash params or the most recent year by default
        year: year ? +year : availableYears[availableYears.length - 1],
        sentinel2AquisitionMonth: sentinel2AquisitionMonth
            ? +sentinel2AquisitionMonth
            : 9,
        zoom: mapCenterInfo?.zoom || DEFAULT_MAP_ZOOM,
        center: mapCenterInfo?.center || getMapCenterFromDefaultLocations(),
        activeLandCoverType: activelandCoverType as LandCoverClassification,
        // sentinel-2 layer can only be displayed in desktop view with wide screen
        shouldShowSentinel2Layer: isMobileView
            ? false
            : shouldShowSentinel2Layer,
        swipeWidget: {
            year4LeadingLayer: startYear,
            year4TrailingLayer: endYear,
            position: 50,
        },
        sentinel2RasterFunction,
    };
};

const getPreloadedUIState = (): UIState => {
    const showDownloadPanel = getDonwloadModeFromHashParams();
    const isAnimationModeOn = getAnimationModeFromHashParams();
    const region = getRegionFromHashParams();
    const showSaveWebMapPanel = getShowSaveWebMapPanelFromHashParams();

    const animationMode = isAnimationModeOn ? 'loading' : null;

    return {
        ...initialUIState,
        showDownloadPanel,
        /**
         * Info Panel should be opened if Administrative region (country name and sub region) is found from Hash Params,
         * so it can show the land cover chart using data from land cover stats table
         */
        showInfoPanel: region !== '',
        /**
         * set animation mode to loading so the animation panel can start loading frames data once Median Layer is ready.
         * animation mode can only be enabled in desktop view with wide screen
         */
        animationMode: isMobileView ? null : animationMode,
        showSaveWebMap: showSaveWebMapPanel,
    };
};

const getPreloadedState = (): PartialRootState => {
    return {
        Map: getPreloadedMapState(),
        UI: getPreloadedUIState(),
    };
};

export default getPreloadedState;
