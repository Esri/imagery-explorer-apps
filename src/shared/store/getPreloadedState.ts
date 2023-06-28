import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
    getMaskToolDataFromHashParams,
    getQueryParams4MainSceneFromHashParams,
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
} from './Landsat/reducer';
import {
    AnalysisState,
    AnalysisTool,
    initialAnalysisState,
} from './Analysis/reducer';
import { IS_MOBILE_DEVICE } from '@shared/constants/UI';

const getPreloadedMapState = (): MapState => {
    const mapCenterInfo = getMapCenterFromHashParams();

    return {
        ...initialMapState,
        center: mapCenterInfo?.center || MAP_CENTER,
        zoom: mapCenterInfo?.zoom || MAP_ZOOM,
    };
};

const getPreloadedLandsatState = (): LandsatState => {
    const modeFromHashParams = getHashParamValueByKey('mode') as AppMode;
    const queryParams4MainScene =
        getQueryParams4MainSceneFromHashParams() ||
        DefaultQueryParams4ImageryScene;
    const queryParams4SecondaryScene =
        getQueryParams4SecondarySceneFromHashParams() ||
        DefaultQueryParams4ImageryScene;

    let mode = modeFromHashParams || 'dynamic';

    if (IS_MOBILE_DEVICE) {
        mode = 'dynamic';
    }

    return {
        ...initialLandsatState,
        mode,
        queryParams4MainScene,
        queryParams4SecondaryScene,
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

const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        Landsat: getPreloadedLandsatState(),
        Analysis: getPreloadedAnalysisState(),
    };
};

export default getPreloadedState;
