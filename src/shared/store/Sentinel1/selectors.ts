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

export const selectAvailableScenesByObjectId = createSelector(
    (state: RootState) => state.Sentinel1.sentinel1Scenes.byObjectId,
    (byObjectId) => byObjectId
);

export const selectSentinel1OrbitDirection = createSelector(
    (state: RootState) => state.Sentinel1.orbitDirection,
    (orbitDirection) => orbitDirection
);

export const selectPolarizationFilter = createSelector(
    (state: RootState) => state.Sentinel1.polarizationFilter,
    (polarizationFilter) => polarizationFilter
);

export const selectSentinel1State = createSelector(
    (state: RootState) => state.Sentinel1,
    (Sentinel1) => Sentinel1
);

export const selectLockedRelativeOrbit = createSelector(
    (state: RootState) => state.Sentinel1.lockedRelativeOrbitInfo,
    (lockedRelativeOrbitInfo) => lockedRelativeOrbitInfo
);
