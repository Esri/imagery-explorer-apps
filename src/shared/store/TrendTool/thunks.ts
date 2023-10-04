import { Point } from 'esri/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    temporalProfileDataUpdated,
    queryLocation4ProfileToolChanged,
    trendingToolIsLoadingChanged,
} from './reducer';
import {
    selectAcquisitionMonth4ProfileTool,
    selectAcquisitionYear4ProfileTool,
    selectQueryLocation4ProfileTool,
    selectTrendToolOption,
} from './selectors';
import { getTemporalProfileData } from '@shared/services/landsat/getTemporalProfileData';
import { selectActiveAnalysisTool } from '../Landsat/selectors';

export const updateQueryLocation4ProfileMask =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const tool = selectActiveAnalysisTool(getState());

        if (tool !== 'profile') {
            return;
        }

        dispatch(queryLocation4ProfileToolChanged(point));
    };

let abortController: AbortController = null;

export const updateTemporalProfileData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation = selectQueryLocation4ProfileTool(rootState);

        const acquisitionMonth = selectAcquisitionMonth4ProfileTool(rootState);

        const acquisitionYear = selectAcquisitionYear4ProfileTool(rootState);

        const trendToolOption = selectTrendToolOption(rootState);

        if (!queryLocation) {
            dispatch(temporalProfileDataUpdated([]));
            return;
        }

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        dispatch(trendingToolIsLoadingChanged(true));

        const data = await getTemporalProfileData({
            queryLocation,
            acquisitionMonth:
                trendToolOption === 'year-to-year' ? acquisitionMonth : null,
            acquisitionYear:
                trendToolOption === 'month-to-month' ? acquisitionYear : null,
            // samplingTemporalResolution,
            abortController,
        });

        dispatch(temporalProfileDataUpdated(data));

        dispatch(trendingToolIsLoadingChanged(false));
    };