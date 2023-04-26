import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectWebmapId = createSelector(
    (state: RootState) => state.Map.webmapId,
    (webmapId) => webmapId
);
