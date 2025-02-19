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

import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';
import { TrendToolState } from '@shared/store/TrendTool/reducer';
import {
    TrendToolOption,
    initialTrendToolState,
} from '@shared/store/TrendTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { getCurrentYear } from '../date-time/getCurrentDateTime';
import { decodeQueryLocation, encodeQueryLocation } from './helpers';

const encodeTemporalProfileToolData = (data: TrendToolState): string => {
    if (!data) {
        return null;
    }

    const {
        selectedIndex,
        acquisitionMonth,
        queryLocation,
        acquisitionYear,
        option,
    } = data;

    if (!queryLocation) {
        return null;
    }

    return [
        selectedIndex,
        acquisitionMonth,
        // samplingTemporalResolution,
        encodeQueryLocation(queryLocation),
        acquisitionYear,
        option,
    ].join('|');
};

const decodeTemporalProfileToolData = (val: string): TrendToolState => {
    if (!val) {
        return null;
    }

    const [
        selectedOption,
        acquisitionMonth,
        // samplingTemporalResolution,
        queryLocation,
        acquisitionYear,
        option,
    ] = val.split('|');

    return {
        ...initialTrendToolState,
        selectedIndex: selectedOption as SpectralIndex,
        acquisitionMonth: +acquisitionMonth,
        acquisitionYear: acquisitionYear ? +acquisitionYear : getCurrentYear(),
        option: option ? (option as TrendToolOption) : 'year-to-year',
        queryLocation: decodeQueryLocation(queryLocation),
    };
};

export const saveTrendToolStateToHashParams = debounce(
    (data: TrendToolState) => {
        updateHashParams('trend', encodeTemporalProfileToolData(data));
    },
    500
);

export const getTemporalProfileToolDataFromHashParams = (
    hashParams: URLSearchParams
): TrendToolState => {
    const value =
        getHashParamValueByKey('trend', hashParams) ||
        getHashParamValueByKey('profile', hashParams);
    return decodeTemporalProfileToolData(value);
};
