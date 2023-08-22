import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';

export const selectActiveAnalysisTool = createSelector(
    (state: RootState) => state.Analysis.tool,
    (tool) => tool
);

export const selectSpectralIndex4MaskTool = createSelector(
    (state: RootState) => state.Analysis.maskTool.spectralIndex,
    (spectralIndex) => spectralIndex
);

export const selectMaskOptions = createSelector(
    (state: RootState) => state.Analysis.maskTool.spectralIndex,
    (state: RootState) => state.Analysis.maskTool.maskOptionsBySpectralIndex,
    (spectralIndex, maskOptionsBySpectralIndex) =>
        maskOptionsBySpectralIndex[spectralIndex]
);

export const selectMaskLayerOpcity = createSelector(
    (state: RootState) => state.Analysis.maskTool.maskLayerOpacity,
    (maskLayerOpacity) => maskLayerOpacity
);

export const selectShouldClipMaskLayer = createSelector(
    (state: RootState) => state.Analysis.maskTool.shouldClipMaskLayer,
    (shouldClipMaskLayer) => shouldClipMaskLayer
);

export const selectQueryLocation4ProfileTool = createSelector(
    (state: RootState) => state.Analysis.profileTool.queryLocation,
    (queryLocation) => queryLocation
);

export const selectAcquisitionMonth4ProfileTool = createSelector(
    (state: RootState) => state.Analysis.profileTool.acquisitionMonth,
    (acquisitionMonth) => acquisitionMonth
);

export const selectTemporalProfileData = createSelector(
    (state: RootState) =>
        state.Analysis.profileTool.temporalProfileData.objectIds,
    (state: RootState) =>
        state.Analysis.profileTool.temporalProfileData.byObjectId,
    (objectIds, byObjectId) => {
        return objectIds.map((id) => byObjectId[id]);
    }
);

export const selectSpectralIndex4ProfileTool = createSelector(
    (state: RootState) => state.Analysis.profileTool.spectralIndex,
    (spectralIndex) => spectralIndex
);

// export const selectSamplingTemporalResolution = createSelector(
//     (state: RootState) => state.Analysis.profileTool.samplingTemporalResolution,
//     (samplingTemporalResolution) => samplingTemporalResolution
// );

export const selectMaskToolState = createSelector(
    (state: RootState) => state.Analysis.maskTool,
    (maskTool) => maskTool
);

export const selectProfileToolState = createSelector(
    (state: RootState) => state.Analysis.profileTool,
    (profileTool) => profileTool
);
