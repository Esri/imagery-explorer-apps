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
    /**
     * the year that will be used to query available landsat scenes
     */
    acquisitionYear?: number;
    /**
     * the month that will be used to query available landsat scenes
     */
    acquisitionMonth?: number;
    /**
     * user selected acquisition date in format of `YYYY-MM-DD`
     */
    acquisitionDate?: string;
};

export const initialLandsatState: LandsatState = {
    rasterFunctionName: 'Natural Color with DRA', // Topographic
    objectIdOfSelectedScene: null,
    acquisitionYear: 2023,
    acquisitionMonth: null,
    acquisitionDate: '',
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
        acquisitionYearChanged: (state, action: PayloadAction<number>) => {
            state.acquisitionYear = action.payload;
        },
        acquisitionMonthChanged: (state, action: PayloadAction<number>) => {
            state.acquisitionMonth = action.payload;
        },
        acquisitionDateChanged: (state, action: PayloadAction<string>) => {
            state.acquisitionDate = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    rasterFunctionNameChanged,
    objectIdOfSelectedSceneChanged,
    acquisitionYearChanged,
    acquisitionMonthChanged,
    acquisitionDateChanged,
} = slice.actions;

export default reducer;
