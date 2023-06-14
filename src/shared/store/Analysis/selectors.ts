import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.Analysis.tool,
    (tool) => tool
);

export const selectMaskMethod = createSelector(
    (state: RootState) => state.Analysis.maskMethod,
    (maskMethod) => maskMethod
);

export const selectMaskOptions = createSelector(
    (state: RootState) => state.Analysis.maskMethod,
    (state: RootState) => state.Analysis.maskOptionsByMethodName,
    (maskMethod, maskOptionsByMethodName) => maskOptionsByMethodName[maskMethod]
);
