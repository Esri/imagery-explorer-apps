import { Point } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import { MaskOptions, maskOptionsChanged } from './reducer';
import {
    // selectActiveAnalysisTool,
    selectMaskOptions,
    // selectSamplingTemporalResolution,
} from './selectors';

/**
 * update selected range for the active mask method
 * @param values updated range of the mask layer
 * @returns void
 */
export const updateSelectedRange =
    (values: number[]) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const maskOptions = selectMaskOptions(getState());

        const selectedRange = [...values];

        const updatedMaskOptions = {
            ...maskOptions,
            selectedRange,
        };

        dispatch(maskOptionsChanged(updatedMaskOptions));
    };

export const updateMaskColor =
    (color: number[]) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const maskOptions = selectMaskOptions(getState());

        const updatedMaskOptions = {
            ...maskOptions,
            color,
        };

        dispatch(maskOptionsChanged(updatedMaskOptions));
    };
