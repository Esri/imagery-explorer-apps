import {
    MaskToolData,
    SpectralIndex,
    TemporalProfileToolData,
    initialAnalysisState,
} from '@shared/store/Analysis/reducer';
import { QueryParams4ImageryScene } from '@shared/store/Landsat/reducer';

export const encodeQueryParams4ImageryScene = (
    data: QueryParams4ImageryScene
): string => {
    if (!data) {
        return null;
    }

    const { acquisitionDate, rasterFunctionName, objectIdOfSelectedScene } =
        data;

    return [acquisitionDate, rasterFunctionName, objectIdOfSelectedScene].join(
        '|'
    );
};

export const decodeQueryParams4ImageryScene = (
    val: string
): QueryParams4ImageryScene => {
    if (!val) {
        return null;
    }

    const [acquisitionDate, rasterFunctionName, objectId] = val.split('|');

    return {
        acquisitionDate,
        rasterFunctionName,
        objectIdOfSelectedScene: objectId ? +objectId : null,
        cloudCover: 0.5,
        animationFrameId: null,
    };
};

export const encodeMaskToolData = (data: MaskToolData): string => {
    if (!data) {
        return null;
    }

    const {
        spectralIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        maskOptionsBySpectralIndex,
    } = data;

    const maskOptions = maskOptionsBySpectralIndex[spectralIndex];

    return [
        spectralIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        maskOptions?.color,
        maskOptions?.selectedRange,
    ].join('|');
};

export const decodeMaskToolData = (val: string): MaskToolData => {
    if (!val) {
        return null;
    }

    const [
        spectralIndex,
        shouldClipMaskLayer,
        maskLayerOpacity,
        color,
        selectedRange,
    ] = val.split('|');

    const maskOptionForSelectedSpectralIndex =
        color && selectedRange
            ? {
                  color: color.split(',').map((d) => +d),
                  selectedRange: selectedRange.split(',').map((d) => +d),
              }
            : initialAnalysisState.maskTool.maskOptionsBySpectralIndex[
                  spectralIndex
              ];

    return {
        spectralIndex: spectralIndex as SpectralIndex,
        shouldClipMaskLayer: shouldClipMaskLayer === 'true',
        maskLayerOpacity: +maskLayerOpacity,
        maskOptionsBySpectralIndex: {
            ...initialAnalysisState.maskTool.maskOptionsBySpectralIndex,
            [spectralIndex]: maskOptionForSelectedSpectralIndex,
        },
    };
};

export const encodeTemporalProfileToolData = (
    data: TemporalProfileToolData
): string => {
    if (!data) {
        return null;
    }

    const {
        spectralIndex,
        acquisitionMonth,
        samplingTemporalResolution,
        queryLocation,
    } = data;

    if (!queryLocation) {
        return null;
    }

    return [spectralIndex, acquisitionMonth, samplingTemporalResolution].join(
        '|'
    );
};
