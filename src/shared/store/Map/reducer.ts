import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapState = {
    /**
     * item id of the web map
     */
    webmapId?: string;
    /**
     * center of map [longitude, latitude]
     */
    center?: number[];
    /**
     * zoom level
     */
    zoom?: number;
};

export const initialMapState: MapState = {
    webmapId: '67372ff42cd145319639a99152b15bc3', // Topographic
    center: [-105, 40],
    zoom: 9,
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
        },
        centerChanged: (state, action: PayloadAction<number[]>) => {
            state.center = action.payload;
        },
        zoomChanged: (state, action: PayloadAction<number>) => {
            state.zoom = action.payload;
        },
    },
});

const { reducer } = slice;

export const { webmapIdChanged, centerChanged, zoomChanged } = slice.actions;

export default reducer;
