import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSpectralSamplingPointsData = createSelector(
    (state: RootState) => state.SpectralSamplingTool.data.byId,
    (state: RootState) => state.SpectralSamplingTool.data.ids,
    (byId, ids) => {
        return ids.map((id) => byId[id]);
    }
);
