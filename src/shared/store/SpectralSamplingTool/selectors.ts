import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSpectralSamplingToolData = createSelector(
    (state: RootState) => state.SpectralSamplingTool.byId,
    (state: RootState) => state.SpectralSamplingTool.ids,
    (byId, ids) => {
        return ids.map((id) => byId[id]);
    }
);
