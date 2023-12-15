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
    /**
     * if true, the change compare layer is visible in the map
     */
    changeCompareLayerIsOn: boolean;
    /**
     * user selected pixel value range, the full range of pixel values of change compare layer should be between -2 and 2
     */
    selectedRange: number[];
};

export const initialChangeCompareToolState: ChangeCompareToolState = {
    spectralIndex: 'vegetation',
    changeCompareLayerIsOn: false,
    selectedRange: [-2, 2],
};

const slice = createSlice({
    name: 'ChangeCompareTool',
    initialState: initialChangeCompareToolState,
    reducers: {
        spectralIndex4ChangeCompareToolChanged: (
            state,
            action: PayloadAction<SpectralIndex>
        ) => {
            state.spectralIndex = action.payload;
        },
        changeCompareLayerIsOnUpdated: (
            state,
            action: PayloadAction<boolean>
        ) => {
            state.changeCompareLayerIsOn = action.payload;
        },
        selectedRangeUpdated: (state, action: PayloadAction<number[]>) => {
            state.selectedRange = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    spectralIndex4ChangeCompareToolChanged,
    changeCompareLayerIsOnUpdated,
    selectedRangeUpdated,
} = slice.actions;

export default reducer;
