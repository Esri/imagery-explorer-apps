import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.Analysis.tool,
    (tool) => tool
);

export const selectMaskIndexMethod = createSelector(
    (state: RootState) => state.Analysis.maskMethod,
    (maskMethod) => maskMethod
);
