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
import { ChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';
import { initialChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';

export const encodeChangeCompareToolData = (
    data: ChangeCompareToolState
): string => {
    if (!data) {
        return null;
    }

    const { spectralIndex, changeCompareLayerIsOn, selectedRange } = data;

    return [spectralIndex, changeCompareLayerIsOn, selectedRange].join('|');
};

export const decodeChangeCompareToolData = (
    val: string
): ChangeCompareToolState => {
    if (!val) {
        return null;
    }

    const [spectralIndex, changeCompareLayerIsOn, selectedRange] =
        val.split('|');

    return {
        ...initialChangeCompareToolState,
        spectralIndex,
        changeCompareLayerIsOn: changeCompareLayerIsOn === 'true',
        selectedRange: selectedRange.split(',').map((d) => +d),
    } as ChangeCompareToolState;
};

export const saveChangeCompareToolStateToHashParams = debounce(
    (data: ChangeCompareToolState) => {
        updateHashParams('change', encodeChangeCompareToolData(data));
    },
    500
);

export const getChangeCompareToolDataFromHashParams =
    (): ChangeCompareToolState => {
        const value = getHashParamValueByKey('change');
        return decodeChangeCompareToolData(value);
    };
