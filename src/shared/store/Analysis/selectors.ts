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

export const selectQueryLocation4ProfileTool = createSelector(
    (state: RootState) => state.Analysis.queryLocation4ProfileTool,
    (queryLocation4ProfileTool) => queryLocation4ProfileTool
);

export const selectAcquisitionMonth4ProfileTool = createSelector(
    (state: RootState) => state.Analysis.acquisitionMonth4ProfileTool,
    (acquisitionMonth4ProfileTool) => acquisitionMonth4ProfileTool
);

export const selectTemporalProfileData = createSelector(
    (state: RootState) => state.Analysis.temporalProfileData.objectIds,
    (state: RootState) => state.Analysis.temporalProfileData.byObjectId,
    (objectIds, byObjectId) => {
        return objectIds.map((id) => byObjectId[id]);
    }
);

export const selectSpectralIndex4ProfileTool = createSelector(
    (state: RootState) => state.Analysis.spectralIndex4ProfileTool,
    (spectralIndex4ProfileTool) => spectralIndex4ProfileTool
);

export const selectSamplingTemporalResolution = createSelector(
    (state: RootState) => state.Analysis.samplingTemporalResolution,
    (samplingTemporalResolution) => samplingTemporalResolution
);
