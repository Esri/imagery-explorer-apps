import { PartialRootState } from './configureStore';
import { initialMapState, MapState } from '@shared/store/Map/reducer';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';

import { getMapCenterFromHashParams } from '@shared/utils/url-hash-params';

// import { initialUIState, UIState } from './UI/reducer';
import {
    initialImagerySceneState,
    ImageryScenesState,
    // QueryParams4ImageryScene,
} from '@shared/store/ImageryScene/reducer';
import { initialUIState } from '@shared/store/UI/reducer';
import { initialLandsatState } from '@shared/store/Landsat/reducer';
import { initialSpectralSamplingToolState } from '@shared/store/SpectralSamplingTool/reducer';

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
        mode: 'spectral sampling',
    };
};

export const getPreloadedState = async (): Promise<PartialRootState> => {
    return {
        ImageryScenes: getPreloadedImageryScenesState(),
        Map: getPreloadedMapState(),
        UI: {
            ...initialUIState,
        },
        Landsat: {
            ...initialLandsatState,
        },
        SpectralSamplingTool: {
            ...initialSpectralSamplingToolState,
        },
    };
};
