import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import { AppName } from '@shared/config';

/**
 * Type of the raster analysis job
 */
export type RasterAnalysisJobType =
    | 'publish scene'
    | 'publish mask index'
    | 'publish change compare'
    | 'download mask index'
    | 'download change compare';

/**
 * Status of the job
 */
export type RasterAnalysisJobStatus =
    | 'pending'
    | 'processing'
    | 'completed'
    | 'failed';

/**
 * Output of the raster analysis job
 */
type RasterAnalysisJobOutput = {
    jobId: string;
    jobStause: string;
    messages: {
        type: string;
        description: string;
    }[];
    results: {
        outputRaster: {
            paramUrl: string;
        };
    };
};

export type RasterAnalysisJob = {
    /**
     * id of the job
     */
    jobId: string;
    /**
     * type of the job
     */
    jobType: RasterAnalysisJobType;
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
