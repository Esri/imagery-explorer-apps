import {
    Sentinel1State,
    initialSentinel1State,
} from '@shared/store/Sentinel1/reducer';
import { Sentinel1OrbitDirection } from '@typing/imagery-service';
import { getHashParamValueByKey, updateHashParams } from '.';

const encodeSentinel1Data = (data: Sentinel1State): string => {
    if (!data) {
        return null;
    }

    const { orbitDirection } = data;

    return [orbitDirection].join('|');
};

const decodeSentinel1Data = (val: string): Sentinel1State => {
    if (!val) {
        return null;
    }

    const [orbitDirection] = val.split('|');

    return {
        ...initialSentinel1State,
        orbitDirection: orbitDirection as Sentinel1OrbitDirection,
    };
};

export const saveSentinel1StateToHashParams = (state: Sentinel1State) => {
    updateHashParams('sentinel1', encodeSentinel1Data(state));
};

export const getSentinel1StateFromHashParams = () => {
    const value = getHashParamValueByKey('sentinel1');
    return decodeSentinel1Data(value);
};
