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
    MaskToolState,
    initialMaskToolState,
    MaskToolPixelValueRangeBySpectralIndex,
    DefaultPixelValueRangeBySelectedIndex,
} from '@shared/store/MaskTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';

export const encodeMaskToolData = (data: MaskToolState): string => {
    if (!data) {
        return null;
    }

    const {
        selectedIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        pixelValueRangeBySelectedIndex,
        pixelColorBySelectedIndex,
    } = data;

    const pixelValueRange = pixelValueRangeBySelectedIndex[selectedIndex];

    const pixelColor = pixelColorBySelectedIndex[selectedIndex];

    return [
        selectedIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        pixelColor,
        pixelValueRange?.selectedRange,
    ].join('|');
};

/**
 * Decode mask tool data from URL hash parameters
 * @param val - A string from URL hash parameters
 * @param pixelValueRangeData - Optional custom pixel value range data to override the default values
 * @returns MaskToolState to be used by the Redux store, or null if the input value is empty
 */
export const decodeMaskToolData = (
    val: string,
    pixelValueRangeData?: MaskToolPixelValueRangeBySpectralIndex
): MaskToolState => {
    if (!val) {
        return null;
    }

    const [
        selectedIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        color,
        selectedRange,
    ] = val.split('|');

    const pixelValueRangeBySelectedIndex = pixelValueRangeData
        ? { ...pixelValueRangeData }
        : { ...DefaultPixelValueRangeBySelectedIndex };

    if (selectedRange) {
        pixelValueRangeBySelectedIndex[selectedIndex as SpectralIndex] = {
            selectedRange: selectedRange.split(',').map((d) => +d),
        };
    }

    const pixelColorBySelectedIndex = {
        ...initialMaskToolState.pixelColorBySelectedIndex,
    };

    if (color) {
        pixelColorBySelectedIndex[selectedIndex as SpectralIndex] = color
            .split(',')
            .map((d) => +d);
    }

    return {
        selectedIndex: selectedIndex as SpectralIndex,
        shouldClipMaskLayer: shouldClipMaskLayer === 'true',
        maskLayerOpacity: +maskLayerOpacity,
        pixelValueRangeBySelectedIndex,
        pixelColorBySelectedIndex,
        totalAreaInSqKm: 0,
        percentOfPixelsInSelectedRange: 0,
    };
};

export const saveMaskToolToHashParams = debounce((data: MaskToolState) => {
    updateHashParams('mask', encodeMaskToolData(data));
}, 500);

/**
 *
 * @param pixelValueRangeData custom pixel value range data to override the default values
 * @returns
 */
export const getMaskToolDataFromHashParams = (
    pixelValueRangeData?: MaskToolPixelValueRangeBySpectralIndex
): MaskToolState => {
    const value = getHashParamValueByKey('mask');
    return decodeMaskToolData(value, pixelValueRangeData);
};
