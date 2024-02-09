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

export const selectQueryLocation4TrendTool = createSelector(
    (state: RootState) => state.TrendTool.queryLocation,
    (queryLocation) => queryLocation
);

export const selectAcquisitionMonth4TrendTool = createSelector(
    (state: RootState) => state.TrendTool.acquisitionMonth,
    (acquisitionMonth) => acquisitionMonth
);

export const selectAcquisitionYear4TrendTool = createSelector(
    (state: RootState) => state.TrendTool.acquisitionYear,
    (acquisitionYear) => acquisitionYear
);

export const selectTrendToolData = createSelector(
    (state: RootState) => state.TrendTool.temporalProfileData.objectIds,
    (state: RootState) => state.TrendTool.temporalProfileData.byObjectId,
    (objectIds, byObjectId) => {
        return objectIds.map((id) => byObjectId[id]);
    }
);

export const selectSpectralIndex4TrendTool = createSelector(
    (state: RootState) => state.TrendTool.spectralIndex,
    (spectralIndex) => spectralIndex
);

export const selectTrendToolOption = createSelector(
    (state: RootState) => state.TrendTool.option,
    (trendToolOption) => trendToolOption
);

export const selectTrendToolState = createSelector(
    (state: RootState) => state.TrendTool,
    (profileTool) => profileTool
);

export const selectIsLoadingData4TrendingTool = createSelector(
    (state: RootState) => state.TrendTool.loading,
    (loading) => loading
);
