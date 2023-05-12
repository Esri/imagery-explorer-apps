import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type UIState = {
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
    hideBottomPanel: false,
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
    },
});

const { reducer } = slice;

export const { bottomPanelToggled, shouldShowAboutThisAppToggled } =
    slice.actions;

export default reducer;
