import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getQueryParams4MainSceneFromHashParams,
    getQueryParams4SecondarySceneFromHashParams,
} from '../utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '../constants/map';
// import { initialUIState, UIState } from './UI/reducer';
import {
    AppMode,
    DefaultQueryParams4ImageryScene,
    initialLandsatState,
    LandsatState,
} from './Landsat/reducer';
import {
    AnalysisState,
    AnalysisTool,
    initialAnalysisState,
} from './Analysis/reducer';

const getPreloadedMapState = (): MapState => {
    const mapCenterInfo = getMapCenterFromHashParams();

    return {
        ...initialMapState,
        center: mapCenterInfo?.center || MAP_CENTER,
        zoom: mapCenterInfo?.zoom || MAP_ZOOM,
    };
};

const getPreloadedLandsatState = (): LandsatState => {
    const mode = getHashParamValueByKey('mode') as AppMode;
    const queryParams4MainScene =
        getQueryParams4MainSceneFromHashParams() ||
        DefaultQueryParams4ImageryScene;
    const queryParams4SecondaryScene =
        getQueryParams4SecondarySceneFromHashParams() ||
        DefaultQueryParams4ImageryScene;

    return {
        ...initialLandsatState,
        mode: mode || 'find a scene',
        queryParams4MainScene,
        queryParams4SecondaryScene,
    };
};

const getPreloadedAnalysisState = (): AnalysisState => {
    const tool = getHashParamValueByKey('tool') as AnalysisTool | 'mask';

    return {
        ...initialAnalysisState,
        tool,
    };
};

const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        Landsat: getPreloadedLandsatState(),
        Analysis: getPreloadedAnalysisState(),
    };
};

export default getPreloadedState;
