import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';
import { SpectralProfileToolState } from '@shared/store/SpectralProfileTool/reducer';
import { decodeQueryLocation, encodeQueryLocation } from './helpers';
import { initialSpectralProfileToolState } from '@shared/store/SpectralProfileTool/reducer';

const encodeSpectralProfileToolData = (
    data: SpectralProfileToolState
): string => {
    if (!data) {
        return null;
    }

    const { queryLocation } = data;

    if (!queryLocation) {
        return null;
    }

    return [encodeQueryLocation(queryLocation)].join('|');
};

const decodeSpectralProfileToolData = (
    val: string
): SpectralProfileToolState => {
    if (!val) {
        return null;
    }

    const [queryLocation] = val.split('|');

    return {
        ...initialSpectralProfileToolState,
        queryLocation: decodeQueryLocation(queryLocation),
    };
};

export const saveSpectralProfileToolStateToHashParams = debounce(
    (data: SpectralProfileToolState) => {
        updateHashParams('spectral', encodeSpectralProfileToolData(data));
    },
    500
);

export const getSpectralProfileToolDataFromHashParams =
    (): SpectralProfileToolState => {
        const value = getHashParamValueByKey('spectral');
        return decodeSpectralProfileToolData(value);
    };
