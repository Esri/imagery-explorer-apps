import { getChangeCompareToolDataFromHashParams } from '@shared/utils/url-hash-params';
import {
    ChangeCompareToolState,
    initialChangeCompareToolState,
} from './reducer';

export const getPreloadedState4ChangeCompareTool = (
    hashParams: URLSearchParams
): ChangeCompareToolState => {
    const changeCompareToolData =
        getChangeCompareToolDataFromHashParams(hashParams);

    return {
        ...initialChangeCompareToolState,
        ...changeCompareToolData,
    };
};
