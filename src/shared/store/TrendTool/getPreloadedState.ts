import { getTemporalProfileToolDataFromHashParams } from '@shared/utils/url-hash-params';
import { TrendToolState, initialTrendToolState } from './reducer';

export const getPreloadedTrendToolState = (
    hashParams: URLSearchParams
): TrendToolState => {
    // const maskToolData = getMaskToolDataFromHashParams();
    const trendToolData = getTemporalProfileToolDataFromHashParams(hashParams);

    return {
        ...initialTrendToolState,
        ...trendToolData,
    };
};
