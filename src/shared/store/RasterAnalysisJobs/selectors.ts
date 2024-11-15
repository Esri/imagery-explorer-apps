import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { RasterAnalysisJobStatus } from '@shared/services/raster-analysis/types';

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
                    status !== RasterAnalysisJobStatus.Succeeded &&
                    status !== RasterAnalysisJobStatus.Failed &&
                    status !== RasterAnalysisJobStatus.Cancelled &&
                    status !== RasterAnalysisJobStatus.TimedOut
                );
            });
    }
);
