import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';

import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getMaskToolDataFromHashParams,
    getQueryParams4MainSceneFromHashParams,
    getTemporalProfileToolDataFromHashParams,
} from '@shared/utils/url-hash-params';

// import { initialUIState, UIState } from './UI/reducer';
import {
    initialImagerySceneState,
    ImageryScenesState,
    DefaultQueryParams4ImageryScene,
    AppMode,
    // QueryParams4ImageryScene,
} from '@shared/store/ImageryScene/reducer';
import { PartialRootState } from '@shared/store/configureStore';
import {
    initialMaskToolState,
    MaskToolState,
} from '@shared/store/MaskTool/reducer';

import {
    initialTrendToolState,
    TrendToolState,
} from '@shared/store/TrendTool/reducer';

const getPreloadedMapState = (): MapState => {
    const mapLocation = getMapCenterFromHashParams();

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
    };
};

const getPreloadedImageryScenesState = (): ImageryScenesState => {
    const mode: AppMode =
        (getHashParamValueByKey('mode') as AppMode) || 'dynamic';

    const queryParams4MainScene = getQueryParams4MainSceneFromHashParams() || {
        ...DefaultQueryParams4ImageryScene,
    };

    return {
        ...initialImagerySceneState,
        mode,
        queryParams4MainScene: {
            ...queryParams4MainScene,
            rasterFunctionName: 'Surface Temperature Colorized (Fahrenheit)',
        },
        queryParams4SecondaryScene: {
            ...queryParams4MainScene,
            rasterFunctionName: 'Natural Color with DRA',
        },
    };
};

const getPreloadedMaskToolState = (): MaskToolState => {
    const maskToolData = getMaskToolDataFromHashParams();

    return {
        ...initialMaskToolState,
        ...maskToolData,
        spectralIndex: 'temperature farhenheit',
        shouldClipMaskLayer: true,
    } as MaskToolState;
};

const getPreloadedTrendToolState = (): TrendToolState => {
    const trendToolData = getTemporalProfileToolDataFromHashParams();

    return {
        ...initialTrendToolState,
        ...trendToolData,
        spectralIndex: 'temperature farhenheit',
    } as TrendToolState;
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        ImageryScenes: getPreloadedImageryScenesState(),
        MaskTool: getPreloadedMaskToolState(),
        TrendTool: getPreloadedTrendToolState(),
    };
};
