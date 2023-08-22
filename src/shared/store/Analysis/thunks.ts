import { Point } from 'esri/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    MaskOptions,
    maskOptionsChanged,
    temporalProfileDataUpdated,
    queryLocation4ProfileToolChanged,
} from './reducer';
import {
    selectAcquisitionMonth4ProfileTool,
    selectActiveAnalysisTool,
    selectMaskOptions,
    selectQueryLocation4ProfileTool,
    // selectSamplingTemporalResolution,
} from './selectors';
import { getTemporalProfileData } from '@shared/services/landsat-2/getTemporalProfileData';

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

export const updateQueryLocation4ProfileMask =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const tool = selectActiveAnalysisTool(getState());

        if (tool !== 'profile') {
            return;
        }

        dispatch(queryLocation4ProfileToolChanged(point));
    };

let abortController: AbortController = null;

export const updateTemporalProfileData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation = selectQueryLocation4ProfileTool(rootState);

        const acquisitionMonth = selectAcquisitionMonth4ProfileTool(rootState);

        // const samplingTemporalResolution =
        //     selectSamplingTemporalResolution(rootState);

        if (!queryLocation) {
            dispatch(temporalProfileDataUpdated([]));
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        const data = await getTemporalProfileData({
            queryLocation,
            acquisitionMonth,
            // samplingTemporalResolution,
            abortController,
        });

        dispatch(temporalProfileDataUpdated(data));
    };
