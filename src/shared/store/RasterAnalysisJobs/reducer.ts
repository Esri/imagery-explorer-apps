import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { AppName } from '@shared/config';
import { SaveOption } from '@shared/constants/saveOptions';
import {
    RasterAnalysisJobOutput,
    RasterAnalysisJobStatus,
    RasterAnalysisTaskName,
} from '@shared/services/raster-analysis/checkJobStatus';

export type RasterAnalysisJob = {
    /**
     * id of the job
     */
    jobId: string;
    /**
     * type of the job
     */
    jobType: SaveOption;
    /**
     * name of the raster analysis task
     */
    taskName: RasterAnalysisTaskName;
    /**
     * status of the job
     */
    status: RasterAnalysisJobStatus;
    /**
     * id of the user who created the job
     */
    creator: string;
    /**
     * unix timestamp of when the job was created
     */
    createdAt: number;
    /**
     * id of the imagery scene the job is related to
     */
    sceneId: string;
    /**
     * name of the imagery explorer app that initiated the job
     */
    appName: AppName;
    /**
     * output of the job
     */
    output: RasterAnalysisJobOutput;
};

// import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
export type RasteranalysisJobsState = {
    jobs: {
        byId: {
            [jobId: string]: RasterAnalysisJob;
        };
        allIds: string[];
    };
};

export const initialRasterAnalysisState: RasteranalysisJobsState = {
    jobs: {
        byId: {},
        allIds: [],
    },
};

const slice = createSlice({
    name: 'RasterAnalysisJobs',
    initialState: initialRasterAnalysisState,
    reducers: {
        jobAdded: (state, action: PayloadAction<RasterAnalysisJob>) => {
            const job = action.payload;
            state.jobs.byId[job.jobId] = job;
            state.jobs.allIds.push(job.jobId);
        },
        jobRemoved: (state, action: PayloadAction<string>) => {
            const jobId = action.payload;
            delete state.jobs.byId[jobId];
            state.jobs.allIds = state.jobs.allIds.filter((id) => id !== jobId);
        },
        jobUpdated: (state, action: PayloadAction<RasterAnalysisJob>) => {
            const job = action.payload;
            if (state.jobs.byId[job.jobId]) {
                state.jobs.byId[job.jobId] = job;
            }
        },
    },
});

const { reducer } = slice;

export const { jobAdded, jobRemoved, jobUpdated } = slice.actions;

export default reducer;
