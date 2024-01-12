export {
    saveAnimationWindowInfoToHashParams,
    getAnimationWindowInfoFromHashParams,
    saveAnimationSpeedToHashParams,
    getAnimationSpeedFromHashParams,
} from './animation';

export { saveMapCenterToHashParams, getMapCenterFromHashParams } from './map';

export {
    saveMaskToolToHashParams,
    getMaskToolDataFromHashParams,
} from './maskTool';

export {
    saveQueryParams4MainSceneToHashParams,
    saveQueryParams4SecondarySceneToHashParams,
    saveQueryParams4ScenesInAnimationToHashParams,
    getQueryParams4MainSceneFromHashParams,
    getQueryParams4SecondarySceneFromHashParams,
    getQueryParams4ScenesInAnimationFromHashParams,
} from './queryParams4ImageryScene';

export {
    saveChangeCompareToolStateToHashParams,
    getChangeCompareToolDataFromHashParams,
} from './changeCompareTool';

export {
    saveTrendToolStateToHashParams,
    getTemporalProfileToolDataFromHashParams,
} from './trendTool';

export {
    saveSpectralProfileToolStateToHashParams,
    getSpectralProfileToolDataFromHashParams,
} from './spectralTool';

type UrlHashParamKey =
    | 'mapCenter' // hash params for map center
    | 'mode' // hash params for app mode
    | 'mainScene' // hash params for query params of the main scene
    | 'secondaryScene' // hash params for query params of the secondary scene
    | 'animationScenes' // hash params for query params of scenes in the animation mode
    | 'animation' // hash params for animation mode
    | 'animationWindow' // hash params for animation window info that includes map extent and size
    | 'mask' // hash params for mask tool
    | 'profile' // key for 'trend' used to be 'profile'
    | 'trend' // hash params for trend tool
    | 'spectral' // hash params for spectral profile tool
    | 'change' // hash params for spectral profile tool
    | 'hideTerrain' // hash params for terrain layer
    | 'hideMapLabels' // hash params for map labels layer
    | 'hideBasemap' // hash params for map labels layer
    | 'tool'; // hash params for active analysis tool

const getHashParams = () => {
    return new URLSearchParams(window.location.hash.slice(1));
};

/**
 * update Hash Params in the URL using data from hashParams
 */
export const updateHashParams = (key: UrlHashParamKey, value: string) => {
    const hashParams = getHashParams();

    if (value === undefined || value === null) {
        hashParams.delete(key);
    } else {
        hashParams.set(key, value);
    }

    window.location.hash = hashParams.toString();
};

export const getHashParamValueByKey = (key: UrlHashParamKey): string => {
    const hashParams = getHashParams();

    if (!hashParams.has(key)) {
        return null;
    }

    return hashParams.get(key);
};
