import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    QueryParams4LandsatScene,
    queryParams4FindASceneModeChanged,
} from './reducer';
import { selectLandsatQueryParams4SelectedMode } from './selectors';

export const updateRasterFunctionName =
    (rasterFunctionName: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectLandsatQueryParams4SelectedMode(
                getState()
            );

            const updatedQueryParams: QueryParams4LandsatScene = {
                ...queryParams,
                rasterFunctionName,
            };

            dispatch(queryParams4FindASceneModeChanged(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateObjectIdOfSelectedScene =
    (objectIdOfSelectedScene: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectLandsatQueryParams4SelectedMode(
                getState()
            );

            const updatedQueryParams: QueryParams4LandsatScene = {
                ...queryParams,
                objectIdOfSelectedScene,
            };

            dispatch(queryParams4FindASceneModeChanged(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateAcquisitionYear =
    (acquisitionYear: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectLandsatQueryParams4SelectedMode(
                getState()
            );

            const updatedQueryParams: QueryParams4LandsatScene = {
                ...queryParams,
                acquisitionYear,
            };

            dispatch(queryParams4FindASceneModeChanged(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateAcquisitionMonth =
    (acquisitionMonth: number) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectLandsatQueryParams4SelectedMode(
                getState()
            );

            const updatedQueryParams: QueryParams4LandsatScene = {
                ...queryParams,
                acquisitionMonth,
            };

            dispatch(queryParams4FindASceneModeChanged(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };

export const updateAcquisitionDate =
    (acquisitionDate: string) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        try {
            const queryParams = selectLandsatQueryParams4SelectedMode(
                getState()
            );

            const updatedQueryParams: QueryParams4LandsatScene = {
                ...queryParams,
                acquisitionDate,
            };

            dispatch(queryParams4FindASceneModeChanged(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };
