import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectFeatureOfInterest4SpectralProfileTool = createSelector(
    (state: RootState) => state.SpectralProfileTool.featureOfInterest,
    (featureOfInterest) => featureOfInterest
);
