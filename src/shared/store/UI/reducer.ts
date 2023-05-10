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
    },
});

const { reducer } = slice;

export const { bottomPanelToggled } = slice.actions;

export default reducer;
