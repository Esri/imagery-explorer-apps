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

import { Point } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { maskLayerPixelColorChanged, pixelValueRangeChanged } from './reducer';
import {
    // selectActiveAnalysisTool,
    selectMaskLayerPixelValueRange,
    // selectSamplingTemporalResolution,
} from './selectors';

/**
 * update selected range for the active mask method
 * @param values updated range of the mask layer
 * @returns void
 */
export const updateMaskLayerSelectedRange =
    (values: number[]) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const pixelValueRangeData = selectMaskLayerPixelValueRange(getState());

        const selectedRange = [...values];

        const updatedPixelValueRange = {
            ...pixelValueRangeData,
            selectedRange,
        };

        dispatch(pixelValueRangeChanged(updatedPixelValueRange));
    };

export const updateMaskColor =
    (color: number[]) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        dispatch(maskLayerPixelColorChanged(color));
    };
