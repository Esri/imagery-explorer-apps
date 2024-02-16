/* Copyright 2024 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

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

export const selectMapExtent = createSelector(
    (state: RootState) => state.Map.extent,
    (extent) => extent
);

export const selectMapResolution = createSelector(
    (state: RootState) => state.Map.resolution,
    (resolution) => resolution
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
