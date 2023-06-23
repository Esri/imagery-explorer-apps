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
    selectSamplingTemporalResolution,
} from './selectors';
import { getTemporalProfileData } from '@shared/services/landsat-2/getTemporalProfileData';

/**
 * update selected range for the active mask method
 * @param index index of value, 0 indicates min value of the range and 1 indicates max value of the range
 * @param value
 * @returns void
 */
export const updateSelectedRange =
    (index: number, value: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const maskOptions = selectMaskOptions(getState());

        const selectedRange = [...maskOptions.selectedRange];

        selectedRange[index] = value;

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

export const updateTemporalProfileData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation = selectQueryLocation4ProfileTool(rootState);

        const acquisitionMonth = selectAcquisitionMonth4ProfileTool(rootState);

        const samplingTemporalResolution =
            selectSamplingTemporalResolution(rootState);

        if (!queryLocation) {
            dispatch(temporalProfileDataUpdated([]));
            return;
        }

        const data = await getTemporalProfileData({
            queryLocation,
            acquisitionMonth,
            samplingTemporalResolution,
        });

        dispatch(temporalProfileDataUpdated(data));
    };
