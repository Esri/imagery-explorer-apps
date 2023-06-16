import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.Analysis.tool,
    (tool) => tool
);

export const selectSpectralIndex = createSelector(
    (state: RootState) => state.Analysis.spectralIndex,
    (spectralIndex) => spectralIndex
);

export const selectMaskOptions = createSelector(
    (state: RootState) => state.Analysis.spectralIndex,
    (state: RootState) => state.Analysis.maskOptionsBySpectralIndex,
    (spectralIndex, maskOptionsBySpectralIndex) =>
        maskOptionsBySpectralIndex[spectralIndex]
);

export const selectMaskLayerOpcity = createSelector(
    (state: RootState) => state.Analysis.maskLayerOpacity,
    (maskLayerOpacity) => maskLayerOpacity
);

export const selectShouldClipMaskLayer = createSelector(
    (state: RootState) => state.Analysis.shouldClipMaskLayer,
    (shouldClipMaskLayer) => shouldClipMaskLayer
);
