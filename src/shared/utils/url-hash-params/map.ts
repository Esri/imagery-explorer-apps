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

export const encodeMapCenter = (center: number[], zoom: number) => {
    const [longitude, latitude] = center;

    const value = `${longitude.toFixed(5)},${latitude.toFixed(
        5
    )},${zoom.toFixed(3)}`;

    return value;
};

/**
 * Save the map center coordinates and zoom level to the hash parameters of a URL.
 * @param center An array of numbers representing the map center coordinates - longitude and the latitude. (e.g. [-122.789, 35])
 * @param zoom A number representing the zoom level of the map (e.g. 10)
 */
export const saveMapCenterToHashParams = (center: number[], zoom: number) => {
    // const [longitude, latitude] = center;
    // const value = `${longitude.toFixed(3)},${latitude.toFixed(
    //     3
    // )},${zoom.toFixed(3)}`;

    updateHashParams('mapCenter', encodeMapCenter(center, zoom));
};

export const getMapCenterFromHashParams = () => {
    const value = getHashParamValueByKey('mapCenter');

    return decodeMapCenter(value);
};
