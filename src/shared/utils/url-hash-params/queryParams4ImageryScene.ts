/* Copyright 2025 Esri
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

import {
    getDateRangeForPast12Month,
    getDateRangeForYear,
} from '../date-time/getTimeRange';
import { getYearFromFormattedDateString } from '../date-time/formatDateString';
import { QueryParams4ImageryScene } from '@shared/store/ImageryScene/reducer';
import { getHashParamValueByKey, updateHashParams } from '.';
import { nanoid } from 'nanoid';

const encodeQueryParams4ImageryScene = (
    data: QueryParams4ImageryScene
): string => {
    if (!data) {
        return null;
    }

    const { acquisitionDate, rasterFunctionName, objectIdOfSelectedScene } =
        data;

    return [acquisitionDate, rasterFunctionName, objectIdOfSelectedScene].join(
        '|'
    );
};

const decodeQueryParams4ImageryScene = (
    val: string
): QueryParams4ImageryScene => {
    if (!val) {
        return null;
    }

    const [acquisitionDate, rasterFunctionName, objectId] = val.split('|');

    const acquisitionYear = getYearFromFormattedDateString(acquisitionDate);

    return {
        acquisitionDate,
        rasterFunctionName,
        objectIdOfSelectedScene: objectId ? +objectId : null,
        // cloudCover: 0.5,
        uniqueId: null,
        acquisitionDateRange: acquisitionDate
            ? getDateRangeForYear(acquisitionYear)
            : getDateRangeForPast12Month(),
    };
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

export const saveQueryParams4ScenesInAnimationToHashParams = (
    data: QueryParams4ImageryScene[]
) => {
    const encodedData =
        data && data.length
            ? data.map((d) => encodeQueryParams4ImageryScene(d)).join(',')
            : null;
    updateHashParams('animationScenes', encodedData);
};

export const saveListOfQueryParamsToHashParams = (
    data: QueryParams4ImageryScene[]
) => {
    const encodedData =
        data && data.length
            ? data.map((d) => encodeQueryParams4ImageryScene(d)).join(',')
            : null;
    updateHashParams('listOfScenes', encodedData);
};

export const getQueryParams4MainSceneFromHashParams = (
    hashParams: URLSearchParams
) => {
    const value = getHashParamValueByKey('mainScene', hashParams);
    return decodeQueryParams4ImageryScene(value);
};

export const getQueryParams4SecondarySceneFromHashParams = (
    hashParams: URLSearchParams
) => {
    const value = getHashParamValueByKey('secondaryScene', hashParams);
    return decodeQueryParams4ImageryScene(value);
};

export const getListOfQueryParamsFromHashParams = (
    hashParams: URLSearchParams
): QueryParams4ImageryScene[] => {
    const value =
        getHashParamValueByKey('animationScenes', hashParams) ||
        getHashParamValueByKey('listOfScenes', hashParams);

    if (!value) {
        return null;
    }

    return value.split(',').map((d) => {
        return {
            ...decodeQueryParams4ImageryScene(d),
            uniqueId: nanoid(3),
        } as QueryParams4ImageryScene;
    });
};
