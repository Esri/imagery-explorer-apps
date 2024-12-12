import { getMaskToolDataFromHashParams } from '@shared/utils/url-hash-params';
import { MaskToolState, initialMaskToolState } from './reducer';

export const getPreloadedState4MaskTool = (
    hashParams: URLSearchParams
): MaskToolState => {
    const maskToolData = getMaskToolDataFromHashParams(hashParams);

    return {
        ...initialMaskToolState,
        ...maskToolData,
    };
};
