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
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { RadarIndex, SpectralIndex } from '@typing/imagery-service';

export type MaskLayerPixelValueRangeData = {
    selectedRange: number[];
};

export type MaskToolPixelValueRangeBySpectralIndex = Record<
    SpectralIndex | RadarIndex,
    MaskLayerPixelValueRangeData
>;

type PixelColorBySpectralIndex = Record<SpectralIndex | RadarIndex, number[]>;

export type MaskToolState = {
    /**
     * user selected spectral/radar index to be used in the mask tool
     */
    selectedIndex: SpectralIndex | RadarIndex;
    /**
     * Mask Layer Pixel Value range by index name
     */
    pixelValueRangeBySelectedIndex: MaskToolPixelValueRangeBySpectralIndex;
    /**
     * Maksk Layer pixel color by index name
     */
    pixelColorBySelectedIndex: PixelColorBySpectralIndex;
    /**
     * opacity of the mask layer
     */
    maskLayerOpacity: number;
    /**
     * if true, mask layer should be used to clip the imagery scene
     */
    shouldClipMaskLayer: boolean;
};

export const DefaultPixelValueRangeBySelectedIndex: MaskToolPixelValueRangeBySpectralIndex =
    {
        moisture: {
            selectedRange: [0, 1],
            // color: [89, 255, 252],
        },
        vegetation: {
            selectedRange: [0, 1],
            // color: [115, 255, 132],
        },
        water: {
            selectedRange: [0, 1],
            // color: [89, 214, 255],
        },
        'temperature farhenheit': {
            // selectedRange: [30, 140],
            // the mask layer throws error when using farhenheit as input unit,
            // therefore we will just use celsius degrees in the selectedRange
            selectedRange: [0, 60],
            // color: [251, 182, 100],
        },
        'temperature celcius': {
            selectedRange: [0, 60], // default range should be between 0-60 celcius degrees
            // color: [251, 182, 100],
        },
        'water anomaly': {
            selectedRange: [-1, 0],
        },
        ship: {
            selectedRange: [0, 1],
        },
        urban: {
            selectedRange: [0, 1],
        },
    };

export const initialMaskToolState: MaskToolState = {
    selectedIndex: 'water',
    maskLayerOpacity: 1,
    shouldClipMaskLayer: false,
    pixelValueRangeBySelectedIndex: DefaultPixelValueRangeBySelectedIndex,
    pixelColorBySelectedIndex: {
        moisture: [89, 255, 252],
        vegetation: [115, 255, 132],
        water: [89, 214, 255],
        'temperature farhenheit': [251, 182, 100],
        'temperature celcius': [251, 182, 100],
        'water anomaly': [255, 214, 102],
        ship: [255, 0, 21],
        urban: [255, 0, 21],
    },
};

const slice = createSlice({
    name: 'MaskTool',
    initialState: initialMaskToolState,
    reducers: {
        selectedIndex4MaskToolChanged: (
            state,
            action: PayloadAction<SpectralIndex | RadarIndex>
        ) => {
            state.selectedIndex = action.payload;
        },
        pixelValueRangeChanged: (
            state,
            action: PayloadAction<MaskLayerPixelValueRangeData>
        ) => {
            const selectedIndex = state.selectedIndex;
            state.pixelValueRangeBySelectedIndex[selectedIndex] =
                action.payload;
        },
        maskLayerPixelColorChanged: (
            state,
            action: PayloadAction<number[]>
        ) => {
            const selectedIndex = state.selectedIndex;
            state.pixelColorBySelectedIndex[selectedIndex] = action.payload;
        },
        maskLayerOpacityChanged: (state, action: PayloadAction<number>) => {
            state.maskLayerOpacity = action.payload;
        },
        shouldClipMaskLayerToggled: (state, action: PayloadAction<boolean>) => {
            state.shouldClipMaskLayer = !state.shouldClipMaskLayer;
        },
    },
});

const { reducer } = slice;

export const {
    // activeAnalysisToolChanged,
    selectedIndex4MaskToolChanged,
    pixelValueRangeChanged,
    maskLayerOpacityChanged,
    shouldClipMaskLayerToggled,
    maskLayerPixelColorChanged,
} = slice.actions;

export default reducer;
