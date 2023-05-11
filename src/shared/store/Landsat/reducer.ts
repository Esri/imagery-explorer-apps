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
    /**
     * object id of selected Landsat scene
     */
    objectIdOfSelectedScene?: number;
};

export const initialLandsatState: LandsatState = {
    rasterFunctionName: 'Natural Color with DRA', // Topographic
    objectIdOfSelectedScene: null,
};

const slice = createSlice({
    name: 'Landsat',
    initialState: initialLandsatState,
    reducers: {
        rasterFunctionNameChanged: (state, action: PayloadAction<string>) => {
            state.rasterFunctionName = action.payload;
        },
        objectIdOfSelectedSceneChanged: (
            state,
            action: PayloadAction<number>
        ) => {
            state.objectIdOfSelectedScene = action.payload;
        },
    },
});

const { reducer } = slice;

export const { rasterFunctionNameChanged, objectIdOfSelectedSceneChanged } =
    slice.actions;

export default reducer;
