import { Point } from '@arcgis/core/geometry';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    trendToolDataUpdated,
    queryLocation4TrendToolChanged,
    trendToolIsLoadingChanged,
} from './reducer';
import {
    selectAcquisitionMonth4TrendTool,
    selectAcquisitionYear4TrendTool,
    selectQueryLocation4TrendTool,
    selectTrendToolOption,
} from './selectors';
import { getDataForTrendTool } from '@shared/services/landsat-level-2/getTemporalProfileData';
import { selectActiveAnalysisTool } from '../ImageryScene/selectors';
import { TemporalProfileData } from '@typing/imagery-service';
import { selectLandsatMissionsToBeExcluded } from '../Landsat/selectors';
import { delay } from '@shared/utils/snippets/delay';

export const updateQueryLocation4TrendTool =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const tool = selectActiveAnalysisTool(getState());

        if (tool !== 'trend') {
            return;
        }

        dispatch(queryLocation4TrendToolChanged(point));
    };

let abortController: AbortController = null;

export const updateTrendToolData =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const rootState = getState();

        const queryLocation = selectQueryLocation4TrendTool(rootState);

        const acquisitionMonth = selectAcquisitionMonth4TrendTool(rootState);

        const acquisitionYear = selectAcquisitionYear4TrendTool(rootState);

        const trendToolOption = selectTrendToolOption(rootState);

        const missionsToBeExcluded =
            selectLandsatMissionsToBeExcluded(rootState);

        if (!queryLocation) {
            dispatch(trendToolDataUpdated([]));
            return;
        }

        dispatch(trendToolIsLoadingChanged(true));

        if (abortController) {
            abortController.abort();
        }

        abortController = new AbortController();

        try {
            const data: TemporalProfileData[] = await getDataForTrendTool({
                queryLocation,
                acquisitionMonth:
                    trendToolOption === 'year-to-year'
                        ? acquisitionMonth
                        : null,
                acquisitionYear:
                    trendToolOption === 'month-to-month'
                        ? acquisitionYear
                        : null,
                // samplingTemporalResolution,
                missionsToBeExcluded,
                abortController,
            });

            dispatch(trendToolDataUpdated(data));

            dispatch(trendToolIsLoadingChanged(false));
        } catch (err) {
            console.log('failed to fetch temporal profile data');
            throw err;
        }
    };
