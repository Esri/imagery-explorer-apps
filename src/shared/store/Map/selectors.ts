import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectWebmapId = createSelector(
    (state: RootState) => state.Map.webmapId,
    (webmapId) => webmapId
);

export const selectMapCenter = createSelector(
    (state: RootState) => state.Map.center,
    (center) => center
);

export const selectMapZoom = createSelector(
    (state: RootState) => state.Map.zoom,
    (zoom) => zoom
);
