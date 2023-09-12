import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';
import {
    decodeMapCenter,
    decodeMaskToolData,
    decodeQueryParams4ImageryScene,
    decodeTemporalProfileToolData,
    encodeMaskToolData,
    encodeQueryParams4ImageryScene,
    encodeTemporalProfileToolData,
} from './helpers';
import {
    // MaskToolData,
    TemporalProfileToolData,
} from '@shared/store/Analysis/reducer';
import { debounce } from '../snippets/debounce';
import { nanoid } from 'nanoid';
import { MaskToolState } from '@shared/store/MaskTool/reducer';
// import { AnimationStatus } from '@shared/store/UI/reducer';

type UrlHashParamKey =
    | 'mapCenter'
    | 'mode'
    | 'mainScene'
    | 'secondaryScene'
    | 'animationScenes'
    | 'animation'
    | 'mask'
    | 'profile'
    | 'hideTerrain'
    | 'hideMapLabels';

const hashParams = new URLSearchParams(window.location.hash.slice(1));

/**
 * update Hash Params in the URL using data from hashParams
 */
export const updateHashParams = (key: UrlHashParamKey, value: string) => {
    if (value === undefined || value === null) {
        hashParams.delete(key);
    } else {
        hashParams.set(key, value);
    }

    window.location.hash = hashParams.toString();
};

export const getHashParamValueByKey = (key: UrlHashParamKey): string => {
    if (!hashParams.has(key)) {
        return null;
    }

    return hashParams.get(key);
};

/**
 * Save the map center coordinates and zoom level to the hash parameters of a URL.
 * @param center An array of numbers representing the map center coordinates - longitude and the latitude. (e.g. [-122.789, 35])
 * @param zoom A number representing the zoom level of the map (e.g. 10)
 */
export const saveMapCenterToHashParams = (center: number[], zoom: number) => {
    const [longitude, latitude] = center;
    const value = `${longitude.toFixed(3)},${latitude.toFixed(
        3
    )},${zoom.toFixed(3)}`;
    updateHashParams('mapCenter', value);
};

export const getMapCenterFromHashParams = () => {
    const value = getHashParamValueByKey('mapCenter');

    return decodeMapCenter(value);
};

export const saveQueryParams4MainSceneToHashParams = (
    data?: QueryParams4ImageryScene
) => {
    updateHashParams('mainScene', encodeQueryParams4ImageryScene(data));
};

export const saveQueryParams4SecondarySceneToHashParams = (
    data: QueryParams4ImageryScene
) => {
    updateHashParams('secondaryScene', encodeQueryParams4ImageryScene(data));
};

export const getQueryParams4MainSceneFromHashParams = () => {
    const value = getHashParamValueByKey('mainScene');
    return decodeQueryParams4ImageryScene(value);
};

export const getQueryParams4SecondarySceneFromHashParams = () => {
    const value = getHashParamValueByKey('secondaryScene');
    return decodeQueryParams4ImageryScene(value);
};

export const saveMaskToolToHashParams = debounce((data: MaskToolState) => {
    updateHashParams('mask', encodeMaskToolData(data));
}, 500);

export const saveTemporalProfileToolToHashParams = debounce(
    (data: TemporalProfileToolData) => {
        updateHashParams('profile', encodeTemporalProfileToolData(data));
    },
    500
);

export const getMaskToolDataFromHashParams = (): MaskToolState => {
    const value = getHashParamValueByKey('mask');
    return decodeMaskToolData(value);
};

export const getTemporalProfileToolDataFromHashParams =
    (): TemporalProfileToolData => {
        const value = getHashParamValueByKey('profile');
        return decodeTemporalProfileToolData(value);
    };

export const saveQueryParams4ScenesInAnimationToHashParams = (
    data: QueryParams4ImageryScene[]
) => {
    const encodedData =
        data && data.length
            ? data.map((d) => encodeQueryParams4ImageryScene(d)).join(',')
            : null;
    updateHashParams('animationScenes', encodedData);
};

export const getQueryParams4ScenesInAnimationFromHashParams =
    (): QueryParams4ImageryScene[] => {
        const value = getHashParamValueByKey('animationScenes');

        if (!value) {
            return null;
        }

        return value.split(',').map((d) => {
            return {
                ...decodeQueryParams4ImageryScene(d),
                animationFrameId: nanoid(3),
            } as QueryParams4ImageryScene;
        });
    };

/**
 * Save animation speed to hash params whenever the animation is being played.
 * The app would restore the animation if it sees the animation speed in the hash params
 * @param animationSpeed
 */
export const saveAnimationSpeedToHashParams = (animationSpeed?: number) => {
    updateHashParams(
        'animation',
        animationSpeed ? animationSpeed.toFixed(0).toString() : null
    );
};

export const getAnimationSpeedFromHashParams = (animationSpeed?: number) => {
    const val = getHashParamValueByKey('animation');
    return val ? +val : null;
};
