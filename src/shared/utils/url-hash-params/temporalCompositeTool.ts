import {
    TemporalCompositeToolState,
    initialState4TemporalCompositeTool,
} from '@shared/store/TemporalCompositeTool/reducer';
import { getHashParamValueByKey, updateHashParams } from '.';

const encodeTemporalCompositeTool = (
    data: TemporalCompositeToolState
): string => {
    if (!data) {
        return null;
    }

    const { isTemporalCompositeLayerOn, rasterFunction } = data;

    return [isTemporalCompositeLayerOn, rasterFunction].join('|');
};

const decodeTemporalCompositeTool = (
    val: string
): TemporalCompositeToolState => {
    if (!val) {
        return null;
    }

    const [isTemporalCompositeLayerOn, rasterFunction] = val.split('|');

    return {
        isTemporalCompositeLayerOn: isTemporalCompositeLayerOn === 'true',
        rasterFunction: rasterFunction || '',
    } as TemporalCompositeToolState;
};

export const saveTemporalCompositeToolStateToHashParams = (
    data: TemporalCompositeToolState
) => {
    updateHashParams('composite', encodeTemporalCompositeTool(data));
};

export const getTemporalCompositeToolDataFromHashParams =
    (): TemporalCompositeToolState => {
        const value = getHashParamValueByKey('composite');
        return decodeTemporalCompositeTool(value);
    };
