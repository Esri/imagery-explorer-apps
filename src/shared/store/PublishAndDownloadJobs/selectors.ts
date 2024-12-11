import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { PublishAndDownloadJobStatus } from './reducer';

export const selectAllSaveJobs = createSelector(
    (state: RootState) => state.PublishAndDownloadJobs.jobs.byId,
    (state: RootState) => state.PublishAndDownloadJobs.jobs.allIds,
    (byId, allIds) => allIds.map((id) => byId[id])
);

export const selectPendingRasterAnalysisJobs = createSelector(
    (state: RootState) => state.PublishAndDownloadJobs.jobs.byId,
    (state: RootState) => state.PublishAndDownloadJobs.jobs.allIds,
    (byId, allIds) => {
        const allJobs = allIds.map((id) => byId[id]);

        const rasterAnanlysisJobs = allJobs.filter(
            (job) => job.rasterAnanlysisJobId !== undefined
        );

        return rasterAnanlysisJobs.filter((job) => {
            const status = job.status;
            return (
                status !== PublishAndDownloadJobStatus.Succeeded &&
                status !== PublishAndDownloadJobStatus.Failed &&
                status !== PublishAndDownloadJobStatus.Cancelled &&
                status !== PublishAndDownloadJobStatus.TimedOut
            );
        });
    }
);
