import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryLocation4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.queryLocation;

export const selectSelectedUrbanAreaFeature = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedUrbanAreaFeature;

export const selectSelectedMonths4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedMonths;

export const selectSelectedYears4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedYears;

export const selectActivePanel4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.activePanel;

export const selectShouldDisableCreateJobButton = createSelector(
    (state: RootState) => state.UrbanHeatIslandTool.selectedUrbanAreaFeature,
    (state: RootState) => state.UrbanHeatIslandTool.selectedMonths,
    (state: RootState) => state.UrbanHeatIslandTool.selectedYears,
    (state: RootState) =>
        state.UrbanHeatIslandTool.failedToCreateJobErrorMessage,
    (
        selectedUrbanAreaFeature,
        selectedMonths,
        selectedYears,
        failedToCreateJobErrorMessage
    ) => {
        return (
            !selectedUrbanAreaFeature ||
            selectedMonths.length === 0 ||
            selectedYears.length === 0 ||
            failedToCreateJobErrorMessage !== ''
        );
    }
);

export const selectPendingSIUHIAnalysisJobs = createSelector(
    (state: RootState) => state.UrbanHeatIslandTool.jobs.byJobId,
    (state: RootState) => state.UrbanHeatIslandTool.jobs.allJobIds,
    (byJobId, allJobIds) => {
        const pendingJobs = allJobIds
            .map((jobId) => byJobId[jobId])
            .filter(
                (job) =>
                    job.status === 'waiting to start' ||
                    job.status === 'checking credits' ||
                    job.status === 'in progress'
            );

        return pendingJobs[0] || null;
    }
);

export const selectFinishedSIUHIAnalysisJobs = createSelector(
    (state: RootState) => state.UrbanHeatIslandTool.jobs.byJobId,
    (state: RootState) => state.UrbanHeatIslandTool.jobs.allJobIds,
    (byJobId, allJobIds) => {
        const finishedJobs = allJobIds
            .map((jobId) => byJobId[jobId])
            .filter(
                (job) => job.status === 'completed' || job.status === 'failed'
            );

        return finishedJobs;
    }
);

export const selectFailedToCreateJobErrorMessage = (state: RootState) =>
    state.UrbanHeatIslandTool.failedToCreateJobErrorMessage;
