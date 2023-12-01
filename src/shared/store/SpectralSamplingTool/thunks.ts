import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectSelectedItemFromListOfQueryParams,
} from '../ImageryScene/selectors';
import {
    getPixelValuesFromIdentifyTaskResponse,
    identify,
} from '@shared/services/landsat-level-2/identify';
import {
    SpectralSamplingData,
    samplingDataUpdated,
    dataOfSelectedSamplingPointChanged,
} from './reducer';
import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from './selectors';

const abortController: AbortController = null;

export const addSpectralSamplingPoint =
    (uniqueId: string) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const existingSamplingPoints = selectSpectralSamplingPointsData(
            getState()
        );

        const data: SpectralSamplingData = {
            uniqueId,
            location: null,
            spectralProfileData: null,
            isLoading: false,
        };

        const updatedSamplingPoints: SpectralSamplingData[] = [
            ...existingSamplingPoints,
            data,
        ];

        dispatch(samplingDataUpdated(updatedSamplingPoints));

        // dispatch(queryLocationChanged(point));
    };

export const removeSpectralSamplingPoint =
    (idOfItem2Remove: string) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const existingSamplingPoints = selectSpectralSamplingPointsData(
            getState()
        );

        // remove the sampling point by id
        const updatedSamplingPoints = existingSamplingPoints.filter(
            (d) => d.uniqueId !== idOfItem2Remove
        );

        dispatch(samplingDataUpdated(updatedSamplingPoints));

        // dispatch(queryLocationChanged(point));
    };

export const updateLocationOfSpectralSamplingPoint =
    (point: Point) => (dispatch: StoreDispatch, getState: StoreGetState) => {
        // dispatch(queryLocationChanged(point));

        const idOfSelectedSamplingPoint =
            selectIdOfSelectedItemInListOfQueryParams(getState());

        const selectedSpectralSamplingPointData =
            selectSelectedSpectralSamplingPointData(getState());

        const queryParamsOfSelectedSpectralSamplingPoint =
            selectSelectedItemFromListOfQueryParams(getState());

        if (!idOfSelectedSamplingPoint) {
            console.log(
                'no selected sampling point is found, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        if (
            !queryParamsOfSelectedSpectralSamplingPoint ||
            !queryParamsOfSelectedSpectralSamplingPoint.acquisitionDate
        ) {
            console.log(
                'select a acquisition date first, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        const updatedData4SelectedSamplingPoint: SpectralSamplingData = {
            ...selectedSpectralSamplingPointData,
            location: {
                ...point.toJSON(),
                latitude: point.latitude,
                longitude: point.longitude,
            },
            isLoading: true,
        };

        dispatch(
            dataOfSelectedSamplingPointChanged({
                id: idOfSelectedSamplingPoint,
                data: updatedData4SelectedSamplingPoint,
            })
        );
    };
