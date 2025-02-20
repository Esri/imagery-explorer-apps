/* Copyright 2025 Esri
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

export const selectMapCenter = (state: RootState) => state.Map.center;

// export const selectMapCenter = createSelector(
//     (state: RootState) => state.Map.center,
//     (center) => center
// );

export const selectMapZoom = (state: RootState) => state.Map.zoom;

export const selectMapExtent = (state: RootState) => state.Map.extent;

export const selectMapResolution = (state: RootState) => state.Map.resolution;

export const selectMapScale = (state: RootState) => state.Map.scale;

export const selectShowMapLabel = (state: RootState) => state.Map.showMapLabel;

export const selectShowTerrain = (state: RootState) => state.Map.showTerrain;

export const selectShowBasemap = (state: RootState) => state.Map.showBasemap;

export const selectSwipeWidgetHandlerPosition = (state: RootState) =>
    state.Map.swipeWidgetHanlderPosition;

export const selectMapPopupAnchorLocation = (state: RootState) =>
    state.Map.popupAnchorLocation;

export const selectIsMapUpdating = (state: RootState) => state.Map.isUpadting;

export const selectTotalVisibleArea = (state: RootState) =>
    state.Map.totalVisibleAreaInSqKm;

export const selectCountOfVisiblePixels = (state: RootState) =>
    state.Map.countOfVisiblePixels;

export const selectAutoSwipeStatus = (state: RootState) =>
    state.Map.autoSwipeStatus;

export const selectAutoSwipeSpeed = (state: RootState) =>
    state.Map.autoSwipeSpeed;
