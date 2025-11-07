import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectQueryLocation4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.queryLocation;

export const selectSelectedUrbanAreaFeature = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedUrbanAreaFeature;

export const selectSelectedMonths4UrbanHeatIslandTool = createSelector(
    (state: RootState) => state.UrbanHeatIslandTool.selectedMonths,
    (selectedMonths) => {
        return selectedMonths.slice().sort((a, b) => a - b);
    }
);

export const selectSelectedYear4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedYear;

export const selectActivePanel4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.activePanel;

export const selectShouldDisableCreateJobButton = createSelector(
    (state: RootState) => state.UrbanHeatIslandTool.selectedUrbanAreaFeature,
    (state: RootState) => state.UrbanHeatIslandTool.selectedMonths,
    (state: RootState) => state.UrbanHeatIslandTool.selectedYear,
    (state: RootState) =>
        state.UrbanHeatIslandTool.failedToCreateJobErrorMessage,
    (
        selectedUrbanAreaFeature,
        selectedMonths,
        selectedYear,
        failedToCreateJobErrorMessage
    ) => {
        return (
            !selectedUrbanAreaFeature ||
            selectedMonths.length === 0 ||
            selectedYear === null ||
            failedToCreateJobErrorMessage !== ''
        );
    }
);

export const selectPendingSIUHIAnalysisJob = createSelector(
    (state: RootState) => state.UrbanHeatIslandTool.jobs.byJobId,
    (state: RootState) => state.UrbanHeatIslandTool.jobs.allJobIds,
    (byJobId, allJobIds) => {
        const pendingJobs = allJobIds
            .map((jobId) => byJobId[jobId])
            .filter((job) => job.isPending === true);

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
