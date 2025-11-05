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
    (selectedUrbanAreaFeature, selectedMonths, selectedYears) => {
        return (
            !selectedUrbanAreaFeature ||
            selectedMonths.length === 0 ||
            selectedYears.length === 0
        );
    }
);
