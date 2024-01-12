import {
    MaskToolState,
    initialMaskToolState,
} from '@shared/store/MaskTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';

export const encodeMaskToolData = (data: MaskToolState): string => {
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

export const decodeMaskToolData = (val: string): MaskToolState => {
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
            : initialMaskToolState.maskOptionsBySpectralIndex[
                  spectralIndex as SpectralIndex
              ];

    return {
        spectralIndex: spectralIndex as SpectralIndex,
        shouldClipMaskLayer: shouldClipMaskLayer === 'true',
        maskLayerOpacity: +maskLayerOpacity,
        maskOptionsBySpectralIndex: {
            ...initialMaskToolState.maskOptionsBySpectralIndex,
            [spectralIndex]: maskOptionForSelectedSpectralIndex,
        },
    };
};

export const saveMaskToolToHashParams = debounce((data: MaskToolState) => {
    updateHashParams('mask', encodeMaskToolData(data));
}, 500);

export const getMaskToolDataFromHashParams = (): MaskToolState => {
    const value = getHashParamValueByKey('mask');
    return decodeMaskToolData(value);
};
