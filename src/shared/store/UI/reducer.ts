import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type AnimationStatus = 'loading' | 'playing' | 'pausing';

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
};

export const initialUIState: UIState = {
    hideBottomPanel: false,
    shouldShowAboutThisApp: false,
    animationStatus: null,
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
        animationStatusChanged: (
            state,
            action: PayloadAction<AnimationStatus>
        ) => {
            state.animationStatus = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    bottomPanelToggled,
    shouldShowAboutThisAppToggled,
    animationStatusChanged,
} = slice.actions;

export default reducer;
