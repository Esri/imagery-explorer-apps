import Point from 'esri/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    queryLocationChanged,
    spectralProfileDataUpdated,
    isLoadingToggled as spectralProfileToolIsLoadingToggled,
} from './reducer';
import { selectQueryLocation4SpectralProfileTool } from './selectors';
import { selectActiveAnalysisTool } from '../Landsat/selectors';

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

        if (!queryLocation) {
            dispatch(spectralProfileDataUpdated([]));
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        dispatch(spectralProfileToolIsLoadingToggled(true));
    };
