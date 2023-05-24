import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
} from '../utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '../constants/map';
import { initialUIState, UIState } from './UI/reducer';
import { AppMode, initialLandsatState, LandsatState } from './Landsat/reducer';

const getPreloadedMapState = (): MapState => {
    const mapCenterInfo = getMapCenterFromHashParams();

    return {
        ...initialMapState,
        center: mapCenterInfo?.center || MAP_CENTER,
        zoom: mapCenterInfo?.zoom || MAP_ZOOM,
    };
};

const getPreloadedLandsatState = (): LandsatState => {
    const mode = getHashParamValueByKey('mode') as AppMode | '';

    return {
        ...initialLandsatState,
        mode: mode || 'find a scene',
    };
};

const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
        Landsat: getPreloadedLandsatState(),
    };
};

export default getPreloadedState;
