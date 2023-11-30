import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectActiveAnalysisTool,
    selectIdOfSelectedItemInListOfQueryParams,
    selectQueryParams4MainScene,
} from '../ImageryScene/selectors';
import {
    getPixelValuesFromIdentifyTaskResponse,
    identify,
} from '@shared/services/landsat-level-2/identify';
import { SpectralSamplingData, samplingDataUpdated } from './reducer';
import { selectSpectralSamplingPointsData } from './selectors';

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

export const updateSpectralSamplingPoint =
    () => (dispatch: StoreDispatch, getState: StoreGetState) => {
        // dispatch(queryLocationChanged(point));
    };
