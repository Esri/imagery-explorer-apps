// import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '@shared/store/Map/reducer';
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
} from '@shared/utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';
// import { initialUIState, UIState } from './UI/reducer';
import {
    AnalysisTool,
    AppMode,
    DefaultQueryParams4ImageryScene,
    initialImagerySceneState,
    ImageryScenesState,
    QueryParams4ImageryScene,
    // QueryParams4ImageryScene,
} from '@shared/store/ImageryScene/reducer';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';
import { initialUIState, UIState } from '@shared/store/UI/reducer';
import {
    MaskToolState,
    initialMaskToolState,
} from '@shared/store/MaskTool/reducer';
import {
    TrendToolState,
    initialTrendToolState,
} from '@shared/store/TrendTool/reducer';
import {
    initialSpectralProfileToolState,
    SpectralProfileToolState,
} from '@shared/store/SpectralProfileTool/reducer';
import {
    ChangeCompareToolState,
    initialChangeCompareToolState,
} from '@shared/store/ChangeCompareTool/reducer';
import { initialLandsatState } from '@shared/store/Landsat/reducer';
import { PartialRootState } from '@shared/store/configureStore';
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';
import { getRandomElement } from '@shared/utils/snippets/getRandomElement';
import { landsatInterestingPlaces } from '@landsat-explorer/components/InterestingPlaces';

const randomInterestingPlace = getRandomElement(landsatInterestingPlaces);

const getPreloadedMapState = (): MapState => {
    let mapLocation = getMapCenterFromHashParams();

    if (!mapLocation) {
        mapLocation = randomInterestingPlace?.location;
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

const getPreloadedImageryScenesState = (): ImageryScenesState => {
    const modeFromHashParams = getHashParamValueByKey('mode') as AppMode;

    let mode = modeFromHashParams || 'dynamic';

    // user can only use the dynamic mode when using mobile device
    if (IS_MOBILE_DEVICE) {
        mode = 'dynamic';
    }

    const defaultRasterFunction: LandsatRasterFunctionName =
        'Natural Color with DRA';

    // Attempt to extract query parameters from the URL hash.
    // If not found, fallback to using the default values along with the raster function from a randomly selected interesting location,
    // which will serve as the map center.
    const queryParams4MainScene = getQueryParams4MainSceneFromHashParams() || {
        ...DefaultQueryParams4ImageryScene,
        rasterFunctionName:
            randomInterestingPlace?.renderer || defaultRasterFunction,
    };

    const queryParams4SecondaryScene =
        getQueryParams4SecondarySceneFromHashParams() || {
            ...DefaultQueryParams4ImageryScene,
            rasterFunctionName: defaultRasterFunction,
        };

    const queryParams4ScenesInAnimation =
        getQueryParams4ScenesInAnimationFromHashParams() || [];

    const queryParamsById: {
        [key: string]: QueryParams4ImageryScene;
    } = {};

    const tool = getHashParamValueByKey('tool') as AnalysisTool;

    for (const queryParams of queryParams4ScenesInAnimation) {
        queryParamsById[queryParams.uniqueId] = queryParams;
    }

    return {
        ...initialImagerySceneState,
        mode,
        tool: tool || 'mask',
        queryParams4MainScene,
        queryParams4SecondaryScene,
        queryParamsList: {
            byId: queryParamsById,
            ids: queryParams4ScenesInAnimation.map((d) => d.uniqueId),
            selectedItemID: queryParams4ScenesInAnimation[0]
                ? queryParams4ScenesInAnimation[0].uniqueId
                : null,
        },
        // idOfSelectedItemInListOfQueryParams: queryParams4ScenesInAnimation[0]
        //     ? queryParams4ScenesInAnimation[0].uniqueId
        //     : null,
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
        UI: getPreloadedUIState(),
        Landsat: {
            ...initialLandsatState,
        },
        ImageryScenes: getPreloadedImageryScenesState(),
        TrendTool: getPreloadedTrendToolState(),
        MaskTool: getPreloadedMaskToolState(),
        SpectralProfileTool: getPreloadedSpectralProfileToolState(),
        ChangeCompareTool: getPreloadedChangeCompareToolState(),
    };
};
