import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';
import { TrendToolState } from '@shared/store/TrendTool/reducer';
import {
    TrendToolOption,
    initialTrendToolState,
} from '@shared/store/TrendTool/reducer';
import { SpectralIndex } from '@typing/imagery-service';
import { getCurrentYear } from '../date-time/getCurrentDateTime';
import { decodeQueryLocation, encodeQueryLocation } from './helpers';

const encodeTemporalProfileToolData = (data: TrendToolState): string => {
    if (!data) {
        return null;
    }

    const {
        spectralIndex,
        acquisitionMonth,
        queryLocation,
        acquisitionYear,
        option,
    } = data;

    if (!queryLocation) {
        return null;
    }

    return [
        spectralIndex,
        acquisitionMonth,
        // samplingTemporalResolution,
        encodeQueryLocation(queryLocation),
        acquisitionYear,
        option,
    ].join('|');
};

const decodeTemporalProfileToolData = (val: string): TrendToolState => {
    if (!val) {
        return null;
    }

    const [
        spectralIndex,
        acquisitionMonth,
        // samplingTemporalResolution,
        queryLocation,
        acquisitionYear,
        option,
    ] = val.split('|');

    return {
        ...initialTrendToolState,
        spectralIndex: spectralIndex as SpectralIndex,
        acquisitionMonth: +acquisitionMonth,
        acquisitionYear: acquisitionYear ? +acquisitionYear : getCurrentYear(),
        option: option ? (option as TrendToolOption) : 'year-to-year',
        queryLocation: decodeQueryLocation(queryLocation),
    };
};

export const saveTrendToolStateToHashParams = debounce(
    (data: TrendToolState) => {
        updateHashParams('trend', encodeTemporalProfileToolData(data));
    },
    500
);

export const getTemporalProfileToolDataFromHashParams = (): TrendToolState => {
    const value =
        getHashParamValueByKey('trend') || getHashParamValueByKey('profile');
    return decodeTemporalProfileToolData(value);
};
