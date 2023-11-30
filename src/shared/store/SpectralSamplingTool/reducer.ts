import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import Point from '@arcgis/core/geometry/Point';

export type SpectralSamplingData = {
    uniqueId: string;
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
    data: {
        byId: {
            [key: string]: SpectralSamplingData;
        };
        /**
         * Id of user selected sampling locations
         */
        ids: string[];
    };
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
    data: {
        byId: {},
        ids: [],
    },
    isLoading: false,
    error: null,
};

const slice = createSlice({
    name: 'SpectralSamplingTool',
    initialState: initialSpectralSamplingToolState,
    reducers: {
        samplingDataUpdated: (
            state,
            action: PayloadAction<SpectralSamplingData[]>
        ) => {
            const data = action.payload;

            const byId = {};
            const ids = [];

            for (const item of data) {
                const { uniqueId } = item;
                byId[uniqueId] = item;
                ids.push(uniqueId);
            }

            state.data = {
                byId,
                ids,
            };
        },
        errorChanged: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const { reducer } = slice;

export const { samplingDataUpdated, errorChanged } = slice.actions;

export default reducer;
