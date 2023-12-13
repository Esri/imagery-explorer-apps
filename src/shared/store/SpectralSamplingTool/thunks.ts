import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectIdOfSelectedItemInListOfQueryParams,
    selectSelectedItemFromListOfQueryParams,
} from '../ImageryScene/selectors';
import {
    SpectralSamplingData,
    samplingDataUpdated,
    dataOfSelectedSamplingPointChanged,
    classificationNameUpdated,
} from './reducer';
import {
    selectSelectedSpectralSamplingPointData,
    selectSpectralSamplingPointsData,
} from './selectors';
import { getPixelValues } from '@shared/services/landsat-level-2/identify';
import { queryParamsListChanged } from '../ImageryScene/reducer';

let abortController: AbortController = null;

export const addSpectralSamplingPoint =
    (uniqueId: string) =>
    (dispatch: StoreDispatch, getState: StoreGetState) => {
        const existingSamplingPoints = selectSpectralSamplingPointsData(
            getState()
        );

        const data: SpectralSamplingData = {
            uniqueId,
            location: null,
            bandValues: null,
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
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
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
            !queryParamsOfSelectedSpectralSamplingPoint.acquisitionDate ||
            !queryParamsOfSelectedSpectralSamplingPoint.objectIdOfSelectedScene
        ) {
            console.log(
                'select a imagery scene first, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        if (selectedSpectralSamplingPointData?.location) {
            console.log(
                'sampling point aleady has a location selected, abort calling updateLocationOfSpectralSamplingPoint'
            );
            return;
        }

        // save the user selected location and set loading indicator to true
        let updatedData4SelectedSamplingPoint: SpectralSamplingData = {
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

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            const bandValues = await getPixelValues({
                point,
                objectId:
                    queryParamsOfSelectedSpectralSamplingPoint.objectIdOfSelectedScene,
                abortController,
            });

            updatedData4SelectedSamplingPoint = {
                ...updatedData4SelectedSamplingPoint,
                bandValues,
                isLoading: false,
            };

            dispatch(
                dataOfSelectedSamplingPointChanged({
                    id: idOfSelectedSamplingPoint,
                    data: updatedData4SelectedSamplingPoint,
                })
            );
        } catch (err) {
            console.log(err);

            // failed to get band values for the input location
            // this can happen when user selects a point outside of the imagery scene
            // or clicked on a bad pixel. Just reset the location to null to enforce user picks up
            // a different location
            updatedData4SelectedSamplingPoint = {
                ...updatedData4SelectedSamplingPoint,
                location: null,
                isLoading: false,
            };

            dispatch(
                dataOfSelectedSamplingPointChanged({
                    id: idOfSelectedSamplingPoint,
                    data: updatedData4SelectedSamplingPoint,
                })
            );
        }
    };

/**
 * Reset current sampling session will remove all sampling points and query params associated with it,
 * it will also reset classification name
 * @returns
 */
export const resetCurrentSamplingSession =
    () => (dispatch: StoreDispatch, getState: StoreGetState) => {
        dispatch(samplingDataUpdated([]));

        dispatch(
            queryParamsListChanged({
                queryParams: [],
                selectedItemID: '',
            })
        );

        dispatch(classificationNameUpdated(''));

        // dispatch(queryLocationChanged(point));
    };
