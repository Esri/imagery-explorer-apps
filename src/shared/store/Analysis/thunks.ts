import { Point } from 'esri/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    MaskOptions,
    maskOptionsChanged,
    profileDataUpdated,
    queryLocation4ProfileToolChanged,
} from './reducer';
import {
    selectAcquisitionMonth4ProfileTool,
    selectActiveAnalysisTool,
    selectMaskOptions,
    selectQueryLocation4ProfileTool,
} from './selectors';
import { getProfileData } from '@shared/services/landsat-2/getProfileData';

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

export const updateProfileData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const queryLocation = selectQueryLocation4ProfileTool(getState());

        const acquisitionMonth = selectAcquisitionMonth4ProfileTool(getState());

        if (!queryLocation) {
            dispatch(profileDataUpdated([]));
            return;
        }

        const data = await getProfileData({
            queryLocation,
            acquisitionMonth,
        });

        dispatch(profileDataUpdated(data));
    };
