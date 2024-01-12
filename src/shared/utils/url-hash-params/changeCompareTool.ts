import { debounce } from '../snippets/debounce';
import { getHashParamValueByKey, updateHashParams } from '.';
import { ChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';
import { initialChangeCompareToolState } from '@shared/store/ChangeCompareTool/reducer';

export const encodeChangeCompareToolData = (
    data: ChangeCompareToolState
): string => {
    if (!data) {
        return null;
    }

    const { spectralIndex, changeCompareLayerIsOn, selectedRange } = data;

    return [spectralIndex, changeCompareLayerIsOn, selectedRange].join('|');
};

export const decodeChangeCompareToolData = (
    val: string
): ChangeCompareToolState => {
    if (!val) {
        return null;
    }

    const [spectralIndex, changeCompareLayerIsOn, selectedRange] =
        val.split('|');

    return {
        ...initialChangeCompareToolState,
        spectralIndex,
        changeCompareLayerIsOn: changeCompareLayerIsOn === 'true',
        selectedRange: selectedRange.split(',').map((d) => +d),
    } as ChangeCompareToolState;
};

export const saveChangeCompareToolStateToHashParams = debounce(
    (data: ChangeCompareToolState) => {
        updateHashParams('change', encodeChangeCompareToolData(data));
    },
    500
);

export const getChangeCompareToolDataFromHashParams =
    (): ChangeCompareToolState => {
        const value = getHashParamValueByKey('change');
        return decodeChangeCompareToolData(value);
    };
