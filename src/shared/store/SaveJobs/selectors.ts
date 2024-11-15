import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { SaveJobStatus } from './reducer';

export const selectAllRasterAnalysisJobs = createSelector(
    (state: RootState) => state.SaveJobs.jobs.byId,
    (state: RootState) => state.SaveJobs.jobs.allIds,
    (byId, allIds) => allIds.map((id) => byId[id])
);

export const selectPendingRasterAnalysisJobs = createSelector(
    (state: RootState) => state.SaveJobs.jobs.byId,
    (state: RootState) => state.SaveJobs.jobs.allIds,
    (byId, allIds) => {
        const allJobs = allIds.map((id) => byId[id]);

        const rasterAnanlysisJobs = allJobs.filter(
            (job) => job.rasterAnanlysisJobId !== undefined
        );

        return rasterAnanlysisJobs.filter((job) => {
            const status = job.status;
            return (
                status !== SaveJobStatus.Succeeded &&
                status !== SaveJobStatus.Failed &&
                status !== SaveJobStatus.Cancelled &&
                status !== SaveJobStatus.TimedOut
            );
        });
    }
);
