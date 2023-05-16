import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

// export const selectLandsatRasterFunction = createSelector(
//     (state: RootState) => state.Landsat.rasterFunctionName,
//     (rasterFunctionName) => rasterFunctionName
// );

// export const selectObjectIdOfSelectedScene = createSelector(
//     (state: RootState) => state.Landsat.objectIdOfSelectedScene,
//     (objectIdOfSelectedScene) => objectIdOfSelectedScene
// );

// export const selectAcquisitionYear = createSelector(
//     (state: RootState) => state.Landsat.acquisitionYear,
//     (acquisitionYear) => acquisitionYear
// );

// export const selectAcquisitionMonth = createSelector(
//     (state: RootState) => state.Landsat.acquisitionMonth,
//     (acquisitionMonth) => acquisitionMonth
// );

// export const selectAcquisitionDate = createSelector(
//     (state: RootState) => state.Landsat.acquisitionDate,
//     (acquisitionDate) => acquisitionDate
// );

// export const selectLandsatQueryParams4FindASceneMode = createSelector(
//     (state: RootState) => state.Landsat.queryParams4FindASceneMode,
//     (queryParams4FindASceneMode) => queryParams4FindASceneMode
// );

export const selectLandsatQueryParams4SelectedMode = createSelector(
    (state: RootState) => state.Landsat.mode,
    (state: RootState) => state.Landsat.queryParams4FindASceneMode,
    (state: RootState) => state.Landsat.queryParams4SwipeMode,
    (state: RootState) => state.Landsat.queryParams4AnimateMode,
    (
        mode,
        queryParams4FindASceneMode,
        queryParams4SwipeMode,
        queryParams4AnimateMode
    ) => {
        if (mode === 'find a scene') {
            return queryParams4FindASceneMode || {};
        }
    }
);

export const selectAppMode = createSelector(
    (state: RootState) => state.Landsat.mode,
    (mode) => mode
);
