import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectActiveAnalysisTool,
    selectQueryParams4MainScene,
} from '../ImageryScene/selectors';
import {
    getPixelValuesFromIdentifyTaskResponse,
    identify,
} from '@shared/services/landsat-level-2/identify';

const abortController: AbortController = null;

export const addSpectralSamplingPoint =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        console.log(point);

        // dispatch(queryLocationChanged(point));
    };
