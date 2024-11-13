import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';

type RasterAnalysisJob = {
    jobId: string;
    status: 'pending' | 'processing' | 'completed' | 'failed';
    progress: number;
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
