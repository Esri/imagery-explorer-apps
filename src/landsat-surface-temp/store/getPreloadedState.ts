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
import { LandsatRasterFunctionName } from '@shared/services/landsat-level-2/config';

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

    const rasterFunction4MainScene: LandsatRasterFunctionName =
        'Surface Temperature Colorized (Fahrenheit)';

    const rasterFunction4SecondaryScene: LandsatRasterFunctionName =
        'Natural Color with DRA';

    return {
        ...initialImagerySceneState,
        mode,
        queryParams4MainScene: {
            ...queryParams4MainScene,
            rasterFunctionName: rasterFunction4MainScene,
        },
        queryParams4SecondaryScene: {
            ...queryParams4MainScene,
            rasterFunctionName: rasterFunction4SecondaryScene,
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
