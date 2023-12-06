import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSpectralSamplingPointsData = createSelector(
    (state: RootState) => state.SpectralSamplingTool.data.byId,
    (state: RootState) => state.SpectralSamplingTool.data.ids,
    (byId, ids) => {
        return ids.map((id) => byId[id]);
    }
);

export const selectClassifictionNameOfSpectralSamplingTask = createSelector(
    (state: RootState) => state.SpectralSamplingTool.classificationName,
    (classificationName) => classificationName
);

export const selectIdOfItem2Highlight = createSelector(
    (state: RootState) => state.SpectralSamplingTool.idOfItem2Highlight,
    (idOfItem2Highlight) => idOfItem2Highlight
);

export const selectSelectedSpectralSamplingPointData = createSelector(
    (state: RootState) => state.SpectralSamplingTool.data.byId,
    (state: RootState) => state.ImageryScenes.queryParamsList.selectedItemID,
    (byId, idOfSelectedItemInListOfQueryParams) => {
        return byId[idOfSelectedItemInListOfQueryParams];
    }
);
