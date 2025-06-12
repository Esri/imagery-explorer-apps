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
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type AnimationStatus =
    | 'loading'
    | 'playing'
    | 'pausing'
    | 'failed-loading';

export type TooltipData = {
    /**
     * title of the tooltip
     */
    title?: string;
    /**
     * text content of the tooltip
     */
    content?: string;
    /**
     * tooltip of the Renderer (Raster Function) Component might include legend image
     */
    legendImage?: string;
};

export type UIState = {
    /**
     * if true, hide bottom panel
     */
    hideBottomPanel: boolean;
    /**
     * If true, show About This App Modal
     */
    shouldShowAboutThisApp: boolean;
    /**
     * status of the Animation mode
     */
    animationStatus: AnimationStatus;
    /**
     * speed of Animation in milliseconds
     */
    animationSpeed: number;
    /**
     * if true, show animation download panel so user can save the current animation into a .mp4 file
     */
    showDownloadAnimationPanel: boolean;
    /**
     * if true, the link of the current animiation has been copied to the clipboard
     */
    animationLinkIsCopied: boolean;
    /**
     * The X Position (relative to page) of Tooltip for the Bottom Panel
     */
    tooltipXPosition: number;
    /**
     * The data that will be used to populate the Tooltip component.
     */
    tooltipData?: TooltipData;
    /**
     * key of selected interesting place
     */
    keyOfSelectedInterestingPlace: string;
    /**
     * If true, open download panel
     */
    showDownloadPanel: boolean;
    /**
     * if true, show Save Webmap Panel
     */
    showSaveWebMapPanel: boolean;
    /**
     * if true, show Documentation Panel
     */
    showDocPanel: boolean;
    /**
     * if true, show Save Panel
     */
    showSavePanel: boolean;
    /**
     * if true, hide notification
     */
    hideNotification: boolean;
};

export const initialUIState: UIState = {
    hideBottomPanel: false,
    shouldShowAboutThisApp: false,
    animationStatus: null,
    animationSpeed: 400,
    showDownloadAnimationPanel: false,
    animationLinkIsCopied: false,
    tooltipXPosition: 0,
    tooltipData: null,
    keyOfSelectedInterestingPlace: '',
    showDownloadPanel: false,
    showSaveWebMapPanel: false,
    showDocPanel: false,
    showSavePanel: false,
    hideNotification: false,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        bottomPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.hideBottomPanel = action.payload;
        },
        shouldShowAboutThisAppToggled: (state) => {
            state.shouldShowAboutThisApp = !state.shouldShowAboutThisApp;
        },
        showDownloadAnimationPanelChanged: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.showDownloadAnimationPanel = action.payload;
        },
        animationLinkIsCopiedChanged: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.animationLinkIsCopied = action.payload;
        },
        showDownloadAnimationPanelToggled: (state) => {
            state.showDownloadAnimationPanel =
                !state.showDownloadAnimationPanel;
        },
        animationStatusChanged: (
            state,
            action: PayloadAction<AnimationStatus>
        ) => {
            state.animationStatus = action.payload;
        },
        animationSpeedChanged: (state, action: PayloadAction<number>) => {
            state.animationSpeed = action.payload;
        },
        tooltipXPositionChanged: (state, action: PayloadAction<number>) => {
            state.tooltipXPosition = action.payload;
        },
        tooltipDataChanged: (state, action: PayloadAction<TooltipData>) => {
            state.tooltipData = action.payload;
        },
        keyOfSelectedInterestingPlaceChanged: (
            state,
            action: PayloadAction<string>
        ) => {
            state.keyOfSelectedInterestingPlace = action.payload;
        },
        showDownloadPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.showDownloadPanel = action.payload;
        },
        showSaveWebMapPanelToggled: (state) => {
            state.showSaveWebMapPanel = !state.showSaveWebMapPanel;
        },
        showDocPanelToggled: (state) => {
            state.showDocPanel = !state.showDocPanel;
        },
        showSavePanelToggled: (state) => {
            state.showSavePanel = !state.showSavePanel;
        },
        hideNotificationToggled: (state) => {
            state.hideNotification = !state.hideNotification;
        },
    },
});

const { reducer } = slice;

export const {
    bottomPanelToggled,
    shouldShowAboutThisAppToggled,
    showDownloadAnimationPanelChanged,
    showDownloadAnimationPanelToggled,
    animationLinkIsCopiedChanged,
    animationStatusChanged,
    animationSpeedChanged,
    tooltipDataChanged,
    tooltipXPositionChanged,
    keyOfSelectedInterestingPlaceChanged,
    showDownloadPanelToggled,
    showSaveWebMapPanelToggled,
    showDocPanelToggled,
    showSavePanelToggled,
    hideNotificationToggled,
} = slice.actions;

export default reducer;
