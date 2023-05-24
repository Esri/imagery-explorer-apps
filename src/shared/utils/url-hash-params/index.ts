type UrlHashParamKey =
    | 'mapCenter'
    | 'mode'
    | 'mainScene'
    | 'secondaryScene'
    | 'animationScenes';

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
    const value = `${longitude.toFixed(3)},${latitude.toFixed(3)},${zoom}`;
    updateHashParams('mapCenter', value);
};

export const getMapCenterFromHashParams = () => {
    const value = getHashParamValueByKey('mapCenter');

    if (!value) {
        return null;
    }

    const [longitude, latitude, zoom] = value.split(',');

    if (!longitude || !latitude || !zoom) {
        return null;
    }

    return {
        center: [+longitude, +latitude],
        zoom: +zoom,
    };
};

// export const saveQueryParams4MainSceneToHashParams = ()=>{

// }

// export const getQueryParams4MainSceneFromHashParams = ()=>{

// }

// export const saveQueryParams4SecondarySceneToHashParams = ()=>{

// }

// export const getQueryParams4SecondarySceneFromHashParams = ()=>{

// }
