import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectAllRasterAnalysisJobs = createSelector(
    (state: RootState) => state.RasterAnalysisJobs.jobs.byId,
    (state: RootState) => state.RasterAnalysisJobs.jobs.allIds,
    (byId, allIds) => allIds.map((id) => byId[id])
);

export const selectPendingRasterAnalysisJobs = createSelector(
    (state: RootState) => state.RasterAnalysisJobs.jobs.byId,
    (state: RootState) => state.RasterAnalysisJobs.jobs.allIds,
    (byId, allIds) => {
        return allIds
            .map((id) => byId[id])
            .filter((job) => {
                const status = job.status;
                return (
                    status !== 'esriJobSucceeded' &&
                    status !== 'esriJobFailed' &&
                    status !== 'esriJobCancelled' &&
                    status !== 'esriJobTimedOut'
                );
            });
    }
);
