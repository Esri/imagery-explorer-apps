/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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
    getListOfQueryParamsFromHashParams,
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

export {
    saveTemporalCompositeToolStateToHashParams,
    getTemporalCompositeToolDataFromHashParams,
} from './temporalCompositeTool';

export type UrlHashParamKey =
    | 'mapCenter' // hash params for map center
    | 'mode' // hash params for app mode
    | 'mainScene' // hash params for query params of the main scene
    | 'secondaryScene' // hash params for query params of the secondary scene
    | 'listOfScenes' // hash params for query params in list of imagery scene
    | 'animationScenes' // hash params for query params of scenes in the animation mode
    | 'animation' // hash params for animation mode
    | 'animationWindow' // hash params for animation window info that includes map extent and size
    | 'mask' // hash params for mask tool
    | 'profile' // key for 'trend' used to be 'profile'
    | 'trend' // hash params for trend tool
    | 'spectral' // hash params for spectral profile tool
    | 'change' // hash params for spectral profile tool
    | 'composite' // hash params for temporal composite tool
    | 'hideTerrain' // hash params for terrain layer
    | 'hideMapLabels' // hash params for map labels layer
    | 'hideBasemap' // hash params for map labels layer
    | 'tool' // hash params for active analysis tool
    | 'sentinel1'; // hash params for Sentinel-1 scenes

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

    // window.location.hash = hashParams.toString();

    // Get the current URL without the hash
    const baseUrl = window.location.href.split('#')[0];

    const newHash = hashParams.toString();

    const newUrl = `${baseUrl}#${newHash}`;

    // Update the URL using replaceState
    window.history.replaceState(null, '', newUrl);
};

export const getHashParamValueByKey = (key: UrlHashParamKey): string => {
    const hashParams = getHashParams();

    if (!hashParams.has(key)) {
        return null;
    }

    return hashParams.get(key);
};
