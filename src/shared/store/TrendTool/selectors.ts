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
