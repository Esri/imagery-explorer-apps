import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type AnimationStatus = 'loading' | 'playing' | 'pausing';

export type TooltipData = {
    title?: string;
    content?: string;
};

export type UIState = {
    /**
     * if true, hide bottom panel
     */
    hideBottomPanel?: boolean;
    /**
     * If true, show About This App Modal
     */
    shouldShowAboutThisApp?: boolean;
    /**
     * status of the Animation mode
     */
    animationStatus?: AnimationStatus;
    /**
     * speed of Animation in milliseconds
     */
    animationSpeed?: number;
    /**
     * if true, show animation download panel so user can save the current animation into a .mp4 file
     */
    showDownloadAnimationPanel: boolean;
    /**
     * The X Position (relative to page) of Tooltip for Control Panel
     */
    tooltipXPosition?: number;
    /**
     * The data that will be shown in the Tooltip
     */
    tooltipData?: TooltipData;
};

export const initialUIState: UIState = {
    hideBottomPanel: false,
    shouldShowAboutThisApp: false,
    animationStatus: null,
    animationSpeed: 400,
    showDownloadAnimationPanel: false,
    tooltipXPosition: 0,
    tooltipData: null,
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
    },
});

const { reducer } = slice;

export const {
    bottomPanelToggled,
    shouldShowAboutThisAppToggled,
    showDownloadAnimationPanelChanged,
    animationStatusChanged,
    animationSpeedChanged,
    tooltipDataChanged,
    tooltipXPositionChanged,
} = slice.actions;

export default reducer;
