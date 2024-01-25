import Point from '@arcgis/core/geometry/Point';
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
} from '../ImageryScene/selectors';
import { getPixelValues } from '@shared/services/landsat-level-2/identify';

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
            dispatch(updateQueryLocation4SpectralProfileTool(null));
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        dispatch(spectralProfileToolIsLoadingToggled(true));

        dispatch(errorChanged(null));

        try {
            const bandValues = await getPixelValues({
                point: queryLocation,
                objectId: objectIdOfSelectedScene,
                abortController,
            });

            dispatch(spectralProfileDataUpdated(bandValues));

            // console.log(res);
        } catch (err) {
            dispatch(
                errorChanged(
                    err.message || 'failed to fetch spectral profile data'
                )
            );
        }

        dispatch(spectralProfileToolIsLoadingToggled(false));
    };
