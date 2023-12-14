import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';

import { getMapCenterFromHashParams } from '@shared/utils/url-hash-params';

// import { initialUIState, UIState } from './UI/reducer';
import {
    initialImagerySceneState,
    ImageryScenesState,
    DefaultQueryParams4ImageryScene,
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
    return {
        ...initialImagerySceneState,
        queryParams4MainScene: {
            ...DefaultQueryParams4ImageryScene,
            rasterFunctionName: 'Surface Temperature Colorized (Fahrenheit)',
        },
        queryParams4SecondaryScene: {
            ...DefaultQueryParams4ImageryScene,
            rasterFunctionName: 'Natural Color with DRA',
        },
    };
};

const getPreloadedMaskToolState = (): MaskToolState => {
    return {
        ...initialMaskToolState,
        spectralIndex: 'temperature farhenheit',
        shouldClipMaskLayer: true,
    } as MaskToolState;
};

const getPreloadedTrendToolState = (): TrendToolState => {
    return {
        ...initialTrendToolState,
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
