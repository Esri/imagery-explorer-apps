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

import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';
import { SpectralProfileToolState } from '@shared/store/SpectralProfileTool/reducer';
import { decodeQueryLocation, encodeQueryLocation } from './helpers';
import { initialSpectralProfileToolState } from '@shared/store/SpectralProfileTool/reducer';

const encodeSpectralProfileToolData = (
    data: SpectralProfileToolState
): string => {
    if (!data) {
        return null;
    }

    const { queryLocation } = data;

    if (!queryLocation) {
        return null;
    }

    return [encodeQueryLocation(queryLocation)].join('|');
};

const decodeSpectralProfileToolData = (
    val: string
): SpectralProfileToolState => {
    if (!val) {
        return null;
    }

    const [queryLocation] = val.split('|');

    return {
        ...initialSpectralProfileToolState,
        queryLocation: decodeQueryLocation(queryLocation),
    };
};

export const saveSpectralProfileToolStateToHashParams = debounce(
    (data: SpectralProfileToolState) => {
        updateHashParams('spectral', encodeSpectralProfileToolData(data));
    },
    500
);

export const getSpectralProfileToolDataFromHashParams = (
    hashParams: URLSearchParams
): SpectralProfileToolState => {
    const value = getHashParamValueByKey('spectral', hashParams);
    return decodeSpectralProfileToolData(value);
};
