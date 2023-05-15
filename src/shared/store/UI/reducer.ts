import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type AppMode = 'explore' | 'find a scene' | 'swipe' | 'animate';

export type AnimationMode = 'loading' | 'playing' | 'pausing';

export type UIState = {
    appMode?: AppMode;
    /**
     * if true, hide bottom panel
     */
    hideBottomPanel?: boolean;
    /**
     * If true, show About This App Modal
     */
    shouldShowAboutThisApp?: boolean;
};

export const initialUIState: UIState = {
    appMode: 'find a scene',
    hideBottomPanel: false,
    shouldShowAboutThisApp: false,
};

const slice = createSlice({
    name: 'UI',
    initialState: initialUIState,
    reducers: {
        appModeChanged: (state, action: PayloadAction<AppMode>) => {
            state.appMode = action.payload;
        },
        bottomPanelToggled: (state, action: PayloadAction<boolean>) => {
            state.hideBottomPanel = action.payload;
        },
        shouldShowAboutThisAppToggled: (state) => {
            state.shouldShowAboutThisApp = !state.shouldShowAboutThisApp;
        },
    },
});

const { reducer } = slice;

export const {
    bottomPanelToggled,
    shouldShowAboutThisAppToggled,
    appModeChanged,
} = slice.actions;

export default reducer;
