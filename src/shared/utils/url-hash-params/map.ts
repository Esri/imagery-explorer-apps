import { getHashParamValueByKey, updateHashParams } from '.';

const decodeMapCenter = (value: string) => {
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
