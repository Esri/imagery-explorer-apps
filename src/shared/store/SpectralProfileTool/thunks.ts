import Point from 'esri/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    errorChanged,
    queryLocationChanged,
    spectralProfileDataUpdated,
    isLoadingToggled as spectralProfileToolIsLoadingToggled,
} from './reducer';
import { selectQueryLocation4SpectralProfileTool } from './selectors';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
} from '../Landsat/selectors';
import {
    getPixelValuesFromIdentifyTaskResponse,
    identify,
} from '@shared/services/landsat-level-2/identify';

let abortController: AbortController = null;

export const updateQueryLocation4SpectralProfileTool =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const tool = selectActiveAnalysisTool(getState());

        if (tool !== 'spectral') {
            return;
        }

        dispatch(queryLocationChanged(point));
    };

export const updateSpectralProfileData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation =
            selectQueryLocation4SpectralProfileTool(rootState);

        const { objectIdOfSelectedScene } =
            selectQueryParams4MainScene(rootState) || {};

        if (!queryLocation || !objectIdOfSelectedScene) {
            dispatch(spectralProfileDataUpdated([]));
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        dispatch(spectralProfileToolIsLoadingToggled(true));

        dispatch(errorChanged(null));

        try {
            const res = await identify({
                point: queryLocation,
                objectId: objectIdOfSelectedScene,
                abortController,
            });

            if (
                res?.catalogItems?.features &&
                res?.catalogItems?.features.length === 0
            ) {
                throw new Error(
                    'Failed to fetch spectral profile data. Please select a location inside of the selected landsat scene.'
                );
            }

            const bandValues = getPixelValuesFromIdentifyTaskResponse(res);

            if (!bandValues) {
                throw new Error('Identify task does not return band values');
            }

            dispatch(spectralProfileDataUpdated(bandValues));

            // console.log(res);
        } catch (err) {
            // console.log(err);
            dispatch(
                errorChanged(
                    err.message || 'failed to fetch spectral profile data'
                )
            );
        }

        dispatch(spectralProfileToolIsLoadingToggled(false));
    };
