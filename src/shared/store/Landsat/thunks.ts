import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    QueryParams4LandsatScene,
    queryParams4FindASceneModeChanged,
    queryParams4SwipeModeChanged,
} from './reducer';
import {
    selectAppMode,
    selectLandsatQueryParams4SelectedMode,
    selectSelectedSideOfSwipeMode,
} from './selectors';

export const updateLandsatQueryParams4SelectedMode =
    (updatedQueryParams: QueryParams4LandsatScene) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const mode = selectAppMode(getState());

        if (mode === 'find a scene') {
            dispatch(queryParams4FindASceneModeChanged(updatedQueryParams));
            return;
        }

        if (mode === 'swipe') {
            dispatch(queryParams4SwipeModeChanged(updatedQueryParams));
            return;
        }

        if (mode === 'animate') {
            // dispatch()
        }
    };

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

            dispatch(updateLandsatQueryParams4SelectedMode(updatedQueryParams));
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

            dispatch(updateLandsatQueryParams4SelectedMode(updatedQueryParams));
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

            dispatch(updateLandsatQueryParams4SelectedMode(updatedQueryParams));
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

            dispatch(updateLandsatQueryParams4SelectedMode(updatedQueryParams));
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

            dispatch(updateLandsatQueryParams4SelectedMode(updatedQueryParams));
        } catch (err) {
            console.error(err);
        }
    };
