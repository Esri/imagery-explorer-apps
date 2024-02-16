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

export type TooltipData = {
    title?: string;
    content?: string;
};

export type AnimationMode = 'loading' | 'playing' | 'pausing';

export type UIState = {
    /**
     * If true, open info panel that shows detailed land cover info
     */
    showInfoPanel?: boolean;
    /**
     * If true, open download panel
     */
    showDownloadPanel?: boolean;
    /**
     * The X Position (relative to page) of Tooltip for Control Panel
     */
    tooltipXPosition?: number;
    /**
     * The data that will be shown in the Tooltip
     */
    tooltipData?: TooltipData;
    /**
     * If true, show leading and trailing year in Swipe Widget Reference Info Component
     */
    showSwipeWidgetYearIndicator?: boolean;
    // /**
    //  * If true, hide control panel at bottom
    //  */
    // hideControlPanel?: boolean;
    /**
     * if true, animation mode is on and should animating land cover or sentinel-2 layers
     */
    animationMode?: AnimationMode;
    /**
     * If true, show About This App Modal
     */
    showAboutThisApp?: boolean;
    /**
     * if true, show Save Webmap Panel
     */
    showSaveWebMap?: boolean;
};

export const initialUIState: UIState = {
    showInfoPanel: false,
    showDownloadPanel: false,
    tooltipXPosition: 0,
    tooltipData: null,
    showSwipeWidgetYearIndicator: false,
    // hideControlPanel: false,
    animationMode: null,
    showAboutThisApp: false,
    showSaveWebMap: false,
};

const slice = createSlice({
    name: 'LandcoverUI',
    initialState: initialUIState,
    reducers: {
        showInfoPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showInfoPanel = action.payload;
        },
        tooltipXPositionChanged: (state, action: PayloadAction<number>) => {
            state.tooltipXPosition = action.payload;
        },
        tooltipDataChanged: (state, action: PayloadAction<TooltipData>) => {
            state.tooltipData = action.payload;
        },
        showSwipeWidgetYearIndicatorToggled: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.showSwipeWidgetYearIndicator = action.payload;
        },
        // hideControlPanelToggled: (state, action: PayloadAction<boolean>) => {
        //     state.hideControlPanel = !state.hideControlPanel;
        // },
        showDownloadPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showDownloadPanel = action.payload;
        },
        animationModeUpdated: (state, action: PayloadAction<AnimationMode>) => {
            state.animationMode = action.payload;
        },
        showAboutThisAppToggled: (state) => {
            state.showAboutThisApp = !state.showAboutThisApp;
        },
        showSaveWebMapToggled: (state) => {
            state.showSaveWebMap = !state.showSaveWebMap;
        },
    },
});

const { reducer } = slice;

export const {
    showInfoPanelToggled,
    tooltipXPositionChanged,
    tooltipDataChanged,
    showSwipeWidgetYearIndicatorToggled,
    // hideControlPanelToggled,
    showDownloadPanelToggled,
    animationModeUpdated,
    showAboutThisAppToggled,
    showSaveWebMapToggled,
} = slice.actions;

export default reducer;
