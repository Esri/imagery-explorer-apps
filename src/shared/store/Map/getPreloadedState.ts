import { InterestingPlaceData } from '@typing/shared';
import { MapState, initialMapState } from './reducer';
import {
    getHashParamValueByKey,
    getMapCenterFromHashParams,
} from '@shared/utils/url-hash-params';
import { MAP_CENTER, MAP_ZOOM } from '@shared/constants/map';

export const getPreloadedState4Map = (
    hashParams: URLSearchParams,
    randomInterestingPlace: InterestingPlaceData
): MapState => {
    let mapLocation = getMapCenterFromHashParams(hashParams);

    if (!mapLocation) {
        mapLocation = randomInterestingPlace?.location;
    }

    // show map labels if there is no `hideMapLabels` in hash params
    const showMapLabel =
        getHashParamValueByKey('hideMapLabels', hashParams) === null;

    // show terrain if there is no `hideTerrain` in hash params
    const showTerrain =
        getHashParamValueByKey('hideTerrain', hashParams) === null;

    const showBasemap =
        getHashParamValueByKey('hideBasemap', hashParams) === null;

    return {
        ...initialMapState,
        center: mapLocation?.center || MAP_CENTER,
        zoom: mapLocation?.zoom || MAP_ZOOM,
        showMapLabel,
        showTerrain,
        showBasemap,
    };
};
