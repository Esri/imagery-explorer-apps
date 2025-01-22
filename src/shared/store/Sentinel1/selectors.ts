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

export const selectAvailableScenesByObjectId = (state: RootState) =>
    state.Sentinel1.sentinel1Scenes.byObjectId;

export const selectSentinel1OrbitDirection = (state: RootState) =>
    state.Sentinel1.orbitDirection;

export const selectPolarizationFilter = (state: RootState) =>
    state.Sentinel1.polarizationFilter;

export const selectSentinel1State = (state: RootState) => state.Sentinel1;

export const selectLockedRelativeOrbit = (state: RootState) =>
    state.Sentinel1.lockedRelativeOrbitInfo;
