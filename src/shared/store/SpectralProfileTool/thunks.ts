import Point from 'esri/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
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
} from '@shared/services/landsat/identify';

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
                    'cannot query spectral profile outside of the geometry of selected landsat scene'
                );
            }

            const bandValues = getPixelValuesFromIdentifyTaskResponse(res);

            if (!bandValues) {
                throw new Error('identify task does not return band values');
            }

            dispatch(spectralProfileDataUpdated(bandValues));

            console.log(res);
        } catch (err) {
            console.log(err);
        }

        dispatch(spectralProfileToolIsLoadingToggled(false));
    };
