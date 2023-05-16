import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import {
    DefaultQueryParams4LandsatScene,
    QueryParams4LandsatScene,
} from './reducer';

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
    (state: RootState) => state.Landsat.selectedSide4SwipeMode,
    (state: RootState) => state.Landsat.indexOfSelectedQueryParams4AnimateMode,
    (
        mode,
        queryParams4FindASceneMode,
        queryParams4SwipeMode,
        queryParams4AnimateMode,
        selectedSide4SwipeMode,
        indexOfSelectedQueryParams4AnimateMode
    ) => {
        if (mode === 'find a scene') {
            return queryParams4FindASceneMode;
        }

        if (mode === 'swipe') {
            return queryParams4SwipeMode[selectedSide4SwipeMode];
        }

        if (mode === 'animate') {
            return queryParams4AnimateMode[
                indexOfSelectedQueryParams4AnimateMode
            ];
        }
    }
);

export const selectLandsatQueryParams4LeftSideOfSwipeMode = createSelector(
    (state: RootState) => state.Landsat.queryParams4SwipeMode,
    (queryParams4SwipeMode) => {
        return queryParams4SwipeMode.left;
    }
);

export const selectLandsatQueryParams4RightSideOfSwipeMode = createSelector(
    (state: RootState) => state.Landsat.queryParams4SwipeMode,
    (queryParams4SwipeMode) => {
        return queryParams4SwipeMode.right;
    }
);

export const selectSelectedSideOfSwipeMode = createSelector(
    (state: RootState) => state.Landsat.selectedSide4SwipeMode,
    (selectedSide4SwipeMode) => selectedSide4SwipeMode
);

export const selectAppMode = createSelector(
    (state: RootState) => state.Landsat.mode,
    (mode) => mode
);
