import { PartialRootState } from './configureStore';

import { initialMapState, MapState } from '../store/Map/reducer';
import { getMapCenterFromHashParams } from '../utils/URLHashParams';
import { MAP_CENTER, MAP_ZOOM } from '../constants/map';

const getPreloadedMapState = (): MapState => {
    const mapCenterInfo = getMapCenterFromHashParams();

    return {
        ...initialMapState,
        center: mapCenterInfo?.center || MAP_CENTER,
        zoom: mapCenterInfo?.zoom || MAP_ZOOM,
    };
};

const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        Map: getPreloadedMapState(),
    };
};

export default getPreloadedState;
