import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type MapState = {
    // ArcGIS Online Webmap Item Id
    webmapId?: string;
};

export const initialMapState: MapState = {
    webmapId: '67372ff42cd145319639a99152b15bc3', // Topographic
};

const slice = createSlice({
    name: 'Map',
    initialState: initialMapState,
    reducers: {
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
        },
    },
});

const { reducer } = slice;

export const { webmapIdChanged } = slice.actions;

export default reducer;
