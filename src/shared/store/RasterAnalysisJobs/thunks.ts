import { StoreDispatch } from '../configureStore';
import { jobAdded, jobRemoved, jobUpdated, RasterAnalysisJob } from './reducer';

export const addNewRasterAnalysisJob =
    (job: RasterAnalysisJob) => async (dispatch: StoreDispatch) => {
        dispatch(jobAdded(job));
    };

export const removeRasterAnalysisJob =
    (jobId: string) => async (dispatch: StoreDispatch) => {
        dispatch(jobRemoved(jobId));
    };

export const updateRasterAnalysisJob =
    (job: RasterAnalysisJob) => async (dispatch: StoreDispatch) => {
        dispatch(jobUpdated(job));
    };
