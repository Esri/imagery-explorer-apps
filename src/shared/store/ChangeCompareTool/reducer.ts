import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { SpectralIndex } from '@typing/imagery-service';

export type ChangeCompareToolState = {
    /**
     * use selected spectral index
     */
    spectralIndex: SpectralIndex;
};

export const initialChangeCompareToolState: ChangeCompareToolState = {
    spectralIndex: 'vegetation',
};

const slice = createSlice({
    name: 'ChangeCompareTool',
    initialState: initialChangeCompareToolState,
    reducers: {
        spectralIndexChanged: (state, action: PayloadAction<SpectralIndex>) => {
            state.spectralIndex = action.payload;
        },
    },
});

const { reducer } = slice;

export const { spectralIndexChanged } = slice.actions;

export default reducer;
