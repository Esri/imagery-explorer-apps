import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import {
    getAnimationSpeedFromHashParams,
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getMaskToolDataFromHashParams,
    getQueryParams4MainSceneFromHashParams,
    getQueryParams4ScenesInAnimationFromHashParams,
    getQueryParams4SecondarySceneFromHashParams,
    getTemporalProfileToolDataFromHashParams,
} from '../utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '../constants/map';
// import { initialUIState, UIState } from './UI/reducer';
import {
    AppMode,
    DefaultQueryParams4ImageryScene,
    initialLandsatState,
    LandsatState,
    QueryParams4ImageryScene,
} from './Landsat/reducer';
import {
    AnalysisState,
    AnalysisTool,
    initialAnalysisState,
} from './Analysis/reducer';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { initialUIState, UIState } from './UI/reducer';
import { getRandomInterestingPlace } from '@shared/components/InterestingPlaces/helper';

const randomInterestingPlace = getRandomInterestingPlace();

const getPreloadedMapState = (): MapState => {
    let mapLocation = getMapCenterFromHashParams();

    if (!mapLocation) {
        mapLocation = randomInterestingPlace.location;
    }

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
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

    for (const queryParams of queryParams4ScenesInAnimation) {
        queryParams4ScenesInAnimationByFrameId[queryParams.animationFrameId] =
            queryParams;
    }

    return {
        ...initialLandsatState,
        mode,
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

const getPreloadedAnalysisState = (): AnalysisState => {
    const maskToolData = getMaskToolDataFromHashParams();
    const profileToolData = getTemporalProfileToolDataFromHashParams();

    return {
        ...initialAnalysisState,
        tool: profileToolData !== null ? 'profile' : 'mask',
        maskTool: maskToolData || initialAnalysisState.maskTool,
        profileTool: profileToolData || initialAnalysisState.profileTool,
    };
};

const getPreloadedUIState = (): UIState => {
    const animationSpeed = getAnimationSpeedFromHashParams();

    return {
        ...initialUIState,
        animationSpeed: animationSpeed || 1000,
        animationStatus: animationSpeed ? 'loading' : null,
    };
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        Landsat: getPreloadedLandsatState(),
        Analysis: getPreloadedAnalysisState(),
        UI: getPreloadedUIState(),
    };
};
