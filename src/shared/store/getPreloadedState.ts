import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import {
    getAnimationSpeedFromHashParams,
    getChangeCompareToolDataFromHashParams,
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getMaskToolDataFromHashParams,
    getQueryParams4MainSceneFromHashParams,
    getQueryParams4ScenesInAnimationFromHashParams,
    getQueryParams4SecondarySceneFromHashParams,
    getSpectralProfileToolDataFromHashParams,
    getTemporalProfileToolDataFromHashParams,
} from '../utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '../constants/map';
// import { initialUIState, UIState } from './UI/reducer';
import {
    AnalysisTool,
    AppMode,
    DefaultQueryParams4ImageryScene,
    initialLandsatState,
    LandsatState,
    // QueryParams4ImageryScene,
} from './Landsat/reducer';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { initialUIState, UIState } from './UI/reducer';
import { getRandomInterestingPlace } from '@shared/components/InterestingPlaces/helper';
import { MaskToolState, initialMaskToolState } from './MaskTool/reducer';
import { TrendToolState, initialTrendToolState } from './TrendTool/reducer';
import {
    initialSpectralProfileToolState,
    SpectralProfileToolState,
} from './SpectralProfileTool/reducer';
import {
    ChangeCompareToolState,
    initialChangeCompareToolState,
} from './ChangeCompareTool/reducer';

const randomInterestingPlace = getRandomInterestingPlace();

const getPreloadedMapState = (): MapState => {
    let mapLocation = getMapCenterFromHashParams();

    if (!mapLocation) {
        mapLocation = randomInterestingPlace.location;
    }
    // show map labels if there is no `hideMapLabels` in hash params
    const showMapLabel = getHashParamValueByKey('hideMapLabels') === null;

    // show terrain if there is no `hideTerrain` in hash params
    const showTerrain = getHashParamValueByKey('hideTerrain') === null;

    const showBasemap = getHashParamValueByKey('hideBasemap') === null;

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
        showMapLabel,
        showTerrain,
        showBasemap,
    };
};

const getPreloadedLandsatState = (): LandsatState => {
    const modeFromHashParams = getHashParamValueByKey('mode') as AppMode;

    let mode = modeFromHashParams || 'dynamic';

    if (IS_MOBILE_DEVICE) {
        mode = 'dynamic';
    }

    // Attempt to extract query parameters from the URL hash.
    // If not found, fallback to using the default values along with the raster function from a randomly selected interesting location,
    // which will serve as the map center.
    const queryParams4MainScene = getQueryParams4MainSceneFromHashParams() || {
        ...DefaultQueryParams4ImageryScene,
        rasterFunctionName: randomInterestingPlace.renderer,
    };

    const queryParams4SecondaryScene =
        getQueryParams4SecondarySceneFromHashParams() ||
        DefaultQueryParams4ImageryScene;

    const queryParams4ScenesInAnimation =
        getQueryParams4ScenesInAnimationFromHashParams() || [];

    const queryParams4ScenesInAnimationByFrameId = {};

    const tool = getHashParamValueByKey('tool') as AnalysisTool;

    for (const queryParams of queryParams4ScenesInAnimation) {
        queryParams4ScenesInAnimationByFrameId[queryParams.animationFrameId] =
            queryParams;
    }

    return {
        ...initialLandsatState,
        mode,
        tool: tool || 'mask',
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParams4ScenesInAnimateMode: {
            byFrameId: queryParams4ScenesInAnimationByFrameId,
            frameIds: queryParams4ScenesInAnimation.map(
                (d) => d.animationFrameId
            ),
        },
        selectedAnimationFrameId: queryParams4ScenesInAnimation[0]
            ? queryParams4ScenesInAnimation[0].animationFrameId
            : null,
    };
};

const getPreloadedTrendToolState = (): TrendToolState => {
    // const maskToolData = getMaskToolDataFromHashParams();
    const trendToolData = getTemporalProfileToolDataFromHashParams();

    return {
        ...initialTrendToolState,
        ...trendToolData,
    };
};

const getPreloadedMaskToolState = (): MaskToolState => {
    const maskToolData = getMaskToolDataFromHashParams();

    return {
        ...initialMaskToolState,
        ...maskToolData,
    };
};

const getPreloadedSpectralProfileToolState = (): SpectralProfileToolState => {
    const spectralProfileToolData = getSpectralProfileToolDataFromHashParams();

    return {
        ...initialSpectralProfileToolState,
        ...spectralProfileToolData,
    };
};

const getPreloadedChangeCompareToolState = (): ChangeCompareToolState => {
    const changeCompareToolData = getChangeCompareToolDataFromHashParams();

    return {
        ...initialChangeCompareToolState,
        ...changeCompareToolData,
    };
};

const getPreloadedUIState = (): UIState => {
    const animationSpeed = getAnimationSpeedFromHashParams();

    const proloadedUIState = {
        ...initialUIState,
    };

    if (animationSpeed) {
        proloadedUIState.animationSpeed = animationSpeed;
        proloadedUIState.animationStatus = 'loading';
    }

    return proloadedUIState;
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        Landsat: getPreloadedLandsatState(),
        TrendTool: getPreloadedTrendToolState(),
        UI: getPreloadedUIState(),
        MaskTool: getPreloadedMaskToolState(),
        SpectralProfileTool: getPreloadedSpectralProfileToolState(),
        ChangeCompareTool: getPreloadedChangeCompareToolState(),
    };
};
