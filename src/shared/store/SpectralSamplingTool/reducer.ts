import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import Point from '@arcgis/core/geometry/Point';

type SpectralSamplingData = {
    id: string;
    /**
     * point will be used to query the pixel values that will be used in spectral profile comparison
     */
    location: Point;
    /**
     * spectral prfile data/band values from the pixel of the query location
     */
    spectralProfileData: number[];
};

export type SpectralSamplingToolState = {
    byId: {
        [key: string]: SpectralSamplingData;
    };
    /**
     * Id of user selected sampling locations
     */
    ids: string[];
    /**
     * if true, it is in process of fetching spectral profile data
     */
    isLoading: boolean;
    /**
     * error message that was caught while fetch the spectral profile data
     */
    error: string;
};

export const initialSpectralSamplingToolState: SpectralSamplingToolState = {
    byId: {},
    ids: [],
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: 'SpectralSamplingTool',
    initialState: initialSpectralSamplingToolState,
    reducers: {
        samplingLocationAdded: (
            state,
            action: PayloadAction<SpectralSamplingData>
        ) => {
            const { id } = action.payload;
            state.byId[id] = action.payload;
            state.ids = [...state.ids, id];
        },
        samplingLocationRemoved: (state, action: PayloadAction<string>) => {
            const idOfItem2Remove = action.payload;

            const updatedById = {};

            // remove id of item to remove
            const updatedIds = state.ids.filter((id) => id !== idOfItem2Remove);

            for (const id of updatedIds) {
                updatedById[id] = state.byId[id];
            }

            state.byId = updatedById;
            state.ids = updatedIds;
        },
        errorChanged: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const { reducer } = slice;

export const { samplingLocationAdded, samplingLocationRemoved, errorChanged } =
    slice.actions;

export default reducer;
