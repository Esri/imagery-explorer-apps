import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import {
    decodeChangeCompareToolData,
    decodeMapCenter,
    decodeMaskToolData,
    decodeQueryParams4ImageryScene,
    decodeSpectralProfileToolData,
    decodeTemporalProfileToolData,
    encodeChangeCompareToolData,
    encodeMaskToolData,
    encodeQueryParams4ImageryScene,
    encodeSpectralProfileToolData,
    encodeTemporalProfileToolData,
} from './helpers';
// import {
//     // MaskToolData,
//     TemporalProfileToolData,
// } from '@shared/store/Analysis/reducer';
import { debounce } from '../snippets/debounce';
import { nanoid } from 'nanoid';
import { MaskToolState } from '@shared/store/MaskTool/reducer';
import { TrendToolState } from '@shared/store/TrendTool/reducer';
import { SpectralProfileToolState } from '@shared/store/SpectralProfileTool/reducer';
import { ChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';
import { Extent } from '@arcgis/core/geometry';
// import { AnimationStatus } from '@shared/store/UI/reducer';

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

export const saveTrendToolStateToHashParams = debounce(
    (data: TrendToolState) => {
        updateHashParams('trend', encodeTemporalProfileToolData(data));
    },
    500
);

export const saveSpectralProfileToolStateToHashParams = debounce(
    (data: SpectralProfileToolState) => {
        updateHashParams('spectral', encodeSpectralProfileToolData(data));
    },
    500
);

export const saveChangeCompareToolStateToHashParams = debounce(
    (data: ChangeCompareToolState) => {
        updateHashParams('change', encodeChangeCompareToolData(data));
    },
    500
);

export const getMaskToolDataFromHashParams = (): MaskToolState => {
    const value = getHashParamValueByKey('mask');
    return decodeMaskToolData(value);
};

export const getTemporalProfileToolDataFromHashParams = (): TrendToolState => {
    const value =
        getHashParamValueByKey('trend') || getHashParamValueByKey('profile');
    return decodeTemporalProfileToolData(value);
};

export const getSpectralProfileToolDataFromHashParams =
    (): SpectralProfileToolState => {
        const value = getHashParamValueByKey('spectral');
        return decodeSpectralProfileToolData(value);
    };

export const getChangeCompareToolDataFromHashParams =
    (): ChangeCompareToolState => {
        const value = getHashParamValueByKey('change');
        return decodeChangeCompareToolData(value);
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

export const getAnimationSpeedFromHashParams = () => {
    const val = getHashParamValueByKey('animation');
    return val ? +val : null;
};

/**
 * Save animation window info to hash params whenever the animation is being played.
 */
export const saveAnimationWindowInfoToHashParams = (
    extent?: Extent,
    width?: number,
    height?: number
) => {
    if (!extent || !width || !height) {
        updateHashParams('animationWindow', null);

        return;
    }

    const { xmin, ymin, xmax, ymax } = extent;

    updateHashParams(
        'animationWindow',
        [xmin, ymin, xmax, ymax, width, height].join(',')
    );
};

export const getAnimationWindowInfoFromHashParams = () => {
    const val = getHashParamValueByKey('animationWindow');

    if (!val) {
        return null;
    }

    const [xmin, ymin, xmax, ymax, width, height] = val
        .split(',')
        .map((v) => +v);

    return {
        extent: {
            xmin,
            ymin,
            xmax,
            ymax,
        },
        width,
        height,
    };
};
