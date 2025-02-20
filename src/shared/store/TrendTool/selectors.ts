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

export const selectTrendToolData = createSelector(
    (state: RootState) => state.TrendTool.temporalProfileData.objectIds,
    (state: RootState) => state.TrendTool.temporalProfileData.byObjectId,
    (objectIds, byObjectId) => {
        return objectIds.map((id) => byObjectId[id]);
    }
);
export const selectSelectedIndex4TrendTool = (state: RootState) =>
    state.TrendTool.selectedIndex;

export const selectTrendToolOption = (state: RootState) =>
    state.TrendTool.option;

export const selectTrendToolState = (state: RootState) => state.TrendTool;

export const selectIsLoadingData4TrendingTool = (state: RootState) =>
    state.TrendTool.loading;

export const selectError4TemporalProfileTool = (state: RootState) =>
    state.TrendTool.error;

export const selectQueryLocation4TrendTool = (state: RootState) =>
    state.TrendTool.queryLocation;

export const selectAcquisitionMonth4TrendTool = (state: RootState) =>
    state.TrendTool.acquisitionMonth;

export const selectAcquisitionYear4TrendTool = (state: RootState) =>
    state.TrendTool.acquisitionYear;
