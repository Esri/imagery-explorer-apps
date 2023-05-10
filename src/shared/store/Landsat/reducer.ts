import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type LandsatState = {
    /**
     * name of selected raster function
     */
    rasterFunctionName?: string;
};

export const initialLandsatState: LandsatState = {
    rasterFunctionName: 'Natural Color with DRA', // Topographic
};

const slice = createSlice({
    name: 'Landsat',
    initialState: initialLandsatState,
    reducers: {
        rasterFunctionNameChanged: (state, action: PayloadAction<string>) => {
            state.rasterFunctionName = action.payload;
        },
    },
});

const { reducer } = slice;

export const { rasterFunctionNameChanged } = slice.actions;

export default reducer;
