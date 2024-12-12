import { getSpectralProfileToolDataFromHashParams } from '@shared/utils/url-hash-params';
import {
    SpectralProfileToolState,
    initialSpectralProfileToolState,
} from './reducer';

export const getPreloadedState4SpectralProfileTool = (
    hashParams: URLSearchParams
): SpectralProfileToolState => {
    const spectralProfileToolData =
        getSpectralProfileToolDataFromHashParams(hashParams);

    return {
        ...initialSpectralProfileToolState,
        ...spectralProfileToolData,
    };
};
