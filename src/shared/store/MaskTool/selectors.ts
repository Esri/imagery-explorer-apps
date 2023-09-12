import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectSpectralIndex4MaskTool = createSelector(
    (state: RootState) => state.MaskTool.spectralIndex,
    (spectralIndex) => spectralIndex
);

export const selectMaskOptions = createSelector(
    (state: RootState) => state.MaskTool.spectralIndex,
    (state: RootState) => state.MaskTool.maskOptionsBySpectralIndex,
    (spectralIndex, maskOptionsBySpectralIndex) =>
        maskOptionsBySpectralIndex[spectralIndex]
);

export const selectMaskLayerOpcity = createSelector(
    (state: RootState) => state.MaskTool.maskLayerOpacity,
    (maskLayerOpacity) => maskLayerOpacity
);

export const selectShouldClipMaskLayer = createSelector(
    (state: RootState) => state.MaskTool.shouldClipMaskLayer,
    (shouldClipMaskLayer) => shouldClipMaskLayer
);

export const selectMaskToolState = createSelector(
    (state: RootState) => state.MaskTool,
    (maskTool) => maskTool
);
