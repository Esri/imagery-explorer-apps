import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

const selectAllRasterAnalysisJobs = createSelector(
    (state: RootState) => state.RasterAnalysisJobs.jobs.byId,
    (state: RootState) => state.RasterAnalysisJobs.jobs.allIds,
    (byId, allIds) => allIds.map((id) => byId[id])
);
