import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

type SpectralProfileFeatureOfInterest =
    | 'Cloud'
    | 'Snow/Ice'
    | 'Desert'
    | 'Dry Grass'
    | 'Concrete'
    | 'Lush Grass'
    | 'Urban'
    | 'Rock'
    | 'Forest'
    | 'Water'
    | '';

export type SpectralProfileToolState = {
    /**
     * user selected feature of interest that will be used in spectral profile comparison
     */
    featureOfInterest: SpectralProfileFeatureOfInterest;
};

export const initialMaskToolState: SpectralProfileToolState = {
    featureOfInterest: '',
};

const slice = createSlice({
    name: 'SpectralProfileTool',
    initialState: initialMaskToolState,
    reducers: {
        featureOfInterestChanged: (
            state,
            action: PayloadAction<SpectralProfileFeatureOfInterest>
        ) => {
            state.featureOfInterest = action.payload;
        },
    },
});

const { reducer } = slice;

export const { featureOfInterestChanged } = slice.actions;

export default reducer;
