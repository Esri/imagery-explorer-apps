import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.Analysis.tool,
    (tool) => tool
);

export const selectSpectralIndex4MaskTool = createSelector(
    (state: RootState) => state.Analysis.spectralIndex4MaskTool,
    (spectralIndex) => spectralIndex
);

export const selectMaskOptions = createSelector(
    (state: RootState) => state.Analysis.spectralIndex4MaskTool,
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
