import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

// export const selectWebmapId = createSelector(
//     (state: RootState) => state.Map.webmapId,
//     (webmapId) => webmapId
// );

export const selectMapCenter = createSelector(
    (state: RootState) => state.Map.center,
    (center) => center
);

export const selectMapZoom = createSelector(
    (state: RootState) => state.Map.zoom,
    (zoom) => zoom
);

export const selectShowMapLabel = createSelector(
    (state: RootState) => state.Map.showMapLabel,
    (showMapLabel) => showMapLabel
);

export const selectShowTerrain = createSelector(
    (state: RootState) => state.Map.showTerrain,
    (showTerrain) => showTerrain
);

export const selectShowBasemap = createSelector(
    (state: RootState) => state.Map.showBasemap,
    (showBasemap) => showBasemap
);

export const selectSwipeWidgetHandlerPosition = createSelector(
    (state: RootState) => state.Map.swipeWidgetHanlderPosition,
    (swipeWidgetHanlderPosition) => swipeWidgetHanlderPosition
);

export const selectMapPopupAnchorLocation = createSelector(
    (state: RootState) => state.Map.popupAnchorLocation,
    (popupAnchorLocation) => popupAnchorLocation
);
