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
    /**
     * speed of Animation in milliseconds
     */
    animationSpeed?: number;
};

export const initialUIState: UIState = {
    hideBottomPanel: false,
    shouldShowAboutThisApp: false,
    animationStatus: null,
    animationSpeed: 1000,
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
        animationSpeedChanged: (state, action: PayloadAction<number>) => {
            state.animationSpeed = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    bottomPanelToggled,
    shouldShowAboutThisAppToggled,
    animationStatusChanged,
    animationSpeedChanged,
} = slice.actions;

export default reducer;
