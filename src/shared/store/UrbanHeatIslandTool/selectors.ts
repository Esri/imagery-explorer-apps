import { RootState } from '../configureStore';

export const selectQueryLocation4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.queryLocation;

export const selectSelectedUrbanAreaFeature = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedUrbanAreaFeature;

export const selectSelectedMonths = (state: RootState) =>
    state.UrbanHeatIslandTool.selectedMonths;

export const selectActivePanel4UrbanHeatIslandTool = (state: RootState) =>
    state.UrbanHeatIslandTool.activePanel;
