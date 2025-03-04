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

export const selectQueryLocation4SpectralProfileTool = (state: RootState) =>
    state.SpectralProfileTool.queryLocation;

export const selectIsLoadingData4SpectralProfileTool = (state: RootState) =>
    state.SpectralProfileTool.isLoading;

export const selectData4SpectralProfileTool = (state: RootState) =>
    state.SpectralProfileTool.spectralProfileData;

export const selectError4SpectralProfileTool = (state: RootState) =>
    state.SpectralProfileTool.error;

export const selectSpectralProfileToolState = (state: RootState) =>
    state.SpectralProfileTool;
