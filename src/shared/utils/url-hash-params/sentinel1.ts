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

import {
    Sentinel1PolarizationFilter,
    Sentinel1State,
    initialSentinel1State,
} from '@shared/store/Sentinel1/reducer';
import { Sentinel1OrbitDirection } from '@typing/imagery-service';
import { getHashParamValueByKey, updateHashParams } from '.';

const encodeSentinel1Data = (data: Sentinel1State): string => {
    if (!data) {
        return null;
    }

    const { orbitDirection, polarizationFilter } = data;

    return [orbitDirection, polarizationFilter].join('|');
};

const decodeSentinel1Data = (val: string): Sentinel1State => {
    if (!val) {
        return null;
    }

    const [orbitDirection, polarizationFilter] = val.split('|');

    return {
        ...initialSentinel1State,
        orbitDirection: orbitDirection as Sentinel1OrbitDirection,
        polarizationFilter: polarizationFilter as Sentinel1PolarizationFilter,
    };
};

export const saveSentinel1StateToHashParams = (state: Sentinel1State) => {
    updateHashParams('sentinel1', encodeSentinel1Data(state));
};

export const getSentinel1StateFromHashParams = (
    hashParams: URLSearchParams
) => {
    const value = getHashParamValueByKey('sentinel1', hashParams);
    return decodeSentinel1Data(value);
};
