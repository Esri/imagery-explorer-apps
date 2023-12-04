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
    bandValues: number[];
    /**
     * if true, it is in process of fetching spectral profile data
     */
    isLoading: boolean;
};

export type SpectralSamplingToolState = {
    /**
     * name of the land cover classification (e.g. 'Desert', 'Lush Vegetation') that the user intends to create spectral sampling of.
     */
    classificationName: string;
    /**
     * sampling points that the user has created for the current session
     */
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
    classificationName: '',
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
        classificationNameUpdated: (state, action: PayloadAction<string>) => {
            state.classificationName = action.payload;
        },
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
        dataOfSelectedSamplingPointChanged: (
            state,
            action: PayloadAction<{
                id: string;
                data: SpectralSamplingData;
            }>
        ) => {
            const { data, id } = action.payload;
            state.data.byId[id] = data;
        },
        errorChanged: (state, action: PayloadAction<string>) => {
            state.error = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    classificationNameUpdated,
    samplingDataUpdated,
    dataOfSelectedSamplingPointChanged,
} = slice.actions;

export default reducer;
