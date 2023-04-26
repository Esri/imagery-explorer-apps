import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';

export type Sentinel2State = {
    // ArcGIS Online Webmap Item Id
    webmapId?: string;
};

export const initialSentinel2State: Sentinel2State = {
    webmapId: '67372ff42cd145319639a99152b15bc3', // Topographic
};

const slice = createSlice({
    name: 'Sentinel2',
    initialState: initialSentinel2State,
    reducers: {
        webmapIdChanged: (state, action: PayloadAction<string>) => {
            state.webmapId = action.payload;
        },
    },
});

const { reducer } = slice;

export const { webmapIdChanged } = slice.actions;

export default reducer;
