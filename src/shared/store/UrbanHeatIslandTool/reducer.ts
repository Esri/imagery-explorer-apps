/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    createSlice,
    // createSelector,
    PayloadAction,
    // createAsyncThunk
} from '@reduxjs/toolkit';
import {
    getCurrentMonth,
    getCurrentYear,
} from '@shared/utils/date-time/getCurrentDateTime';

import Point from '@arcgis/core/geometry/Point';

// type MaskOptionsBySpectralIndex = Partial<Record<SpectralIndex, MaskOptions>>;

type UrbanAreaFeature = {
    OBJECTID: number;
    /**
     * Unique identifier for the urban area
     */
    URBAN_CENTER_ID: number;
    /**
     * Name of the urban area
     */
    NAME: string;
    /**
     * All names associated with the urban area
     */
    ALL_NAMES: string;
    /**
     * Country where the urban area is located
     */
    COUNTRY: string;
};

export type UrbanHeatIslandToolPanel =
    | 'create new job'
    | 'view previous jobs'
    | 'view pending job';

/**
 * Represents the status of a surface intra-urban heat islands (SIUHI) analysis job
 */
export type SIUHIAnalysisJobStatus =
    | 'waiting to start'
    | 'checking credits'
    | 'in progress'
    | 'completed'
    | 'failed'
    | 'cancelled';

/**
 * Represents a sub-job within the surface intra-urban heat islands (SIUHI) analysis job
 */
export type SIUHIAnalysisSubJob = {
    /**
     * Timestamp when the step started
     */
    startedAt: number;
    /**
     * Timestamp when the step ended
     */
    finishedAt: number;
    /**
     * Status of the step
     */
    status: SIUHIAnalysisJobStatus;
    /**
     * the credit cost incurred for this step
     */
    creditCost: number;
    /**
     * If the step completed successfully, the ID of the output item created
     */
    outputItemId: string;
    /**
     * If the step completed successfully, the URL of the output service
     */
    outputServiceUrl: string;
    /**
     * If the step failed, the error message
     */
    errorMessage: string;
};

/**
 * Represents a surface intra-urban heat islands (SIUHI) analysis job
 */
export type SIUHIAnalysisJob = {
    /**
     * Unique identifier for the job
     */
    jobId: string;
    /**
     * Status of the job
     */
    status: SIUHIAnalysisJobStatus;
    /**
     * Timestamp when the job was created
     */
    createdAt: number;
    /**
     * Username of the user who created the job
     */
    createdBy: string;
    /**
     * If the job failed, the error message describing the failure
     */
    errorMessage: string;
    /**
     * Parameters used for the job
     */
    inputParams: {
        years: number[];
        months: number[];
        urbanAreaFeature: UrbanAreaFeature;
    };
    /**
     * Sub-jobs that make up the overall SIUHI analysis job
     */
    subJobs: {
        dataAggregation: SIUHIAnalysisSubJob;
        zonalMean: SIUHIAnalysisSubJob;
        surfaceHeatIndexCalculation: SIUHIAnalysisSubJob;
    };
};

export type UrbanHeatIslandToolState = {
    /**
     * Query Location for Urban Heat Island Tool
     */
    queryLocation: Point;
    /**
     * The selected urban area feature based on the query location
     */
    selectedUrbanAreaFeature: UrbanAreaFeature;
    /**
     * list of selected months (1-12) to run the urban heat island analysis
     */
    selectedMonths: number[]; // default to current month
    /**
     * list of selected years to run the urban heat island analysis
     */
    selectedYears: number[]; // default to current year
    /**
     * active panel in the urban heat island tool UI
     */
    activePanel: UrbanHeatIslandToolPanel;
    /**
     * list of SIUHI analysis jobs
     */
    jobs: {
        /**
         * Mapping of jobId to SIUHIAnalysisJob
         */
        byJobId: Record<string, SIUHIAnalysisJob>;
        /**
         * List of all job IDs
         */
        allJobIds: string[];
    };
    /**
     * Error message when failing to create a new SIUHI analysis job
     */
    failedToCreateJobErrorMessage: string;
};

export const initialUrbanHeatIslandToolState: UrbanHeatIslandToolState = {
    queryLocation: null,
    selectedUrbanAreaFeature: null,
    selectedMonths: [],
    selectedYears: [],
    activePanel: 'create new job',
    jobs: {
        byJobId: {},
        allJobIds: [],
    },
    failedToCreateJobErrorMessage: '',
};

const slice = createSlice({
    name: 'UrbanHeatIslandTool',
    initialState: initialUrbanHeatIslandToolState,
    reducers: {
        queryLocation4UrbanHeatIslandToolChanged: (
            state,
            action: PayloadAction<Point>
        ) => {
            state.queryLocation = action.payload;
        },
        selectedUrbanAreaFeatureChanged: (
            state,
            action: PayloadAction<UrbanAreaFeature>
        ) => {
            state.selectedUrbanAreaFeature = action.payload;
        },
        selectedMonthsChanged: (state, action: PayloadAction<number[]>) => {
            state.selectedMonths = action.payload;
        },
        selectedYearsChanged: (state, action: PayloadAction<number[]>) => {
            state.selectedYears = action.payload;
        },
        activePanel4UrbanHeatIslandToolChanged: (
            state,
            action: PayloadAction<UrbanHeatIslandToolPanel>
        ) => {
            state.activePanel = action.payload;
        },
        urbanHeatIslandToolFiltersReset: (state) => {
            state.queryLocation = initialUrbanHeatIslandToolState.queryLocation;
            state.selectedUrbanAreaFeature =
                initialUrbanHeatIslandToolState.selectedUrbanAreaFeature;
            state.selectedMonths =
                initialUrbanHeatIslandToolState.selectedMonths;
            state.selectedYears = initialUrbanHeatIslandToolState.selectedYears;
            state.failedToCreateJobErrorMessage = '';
        },
        SIUHIAnalysisJobCreated: (
            state,
            action: PayloadAction<SIUHIAnalysisJob>
        ) => {
            const newJob = action.payload;
            state.jobs.byJobId[newJob.jobId] = newJob;
            state.jobs.allJobIds.push(newJob.jobId);
        },
        SIUHIAnalysisJobUpdated: (
            state,
            action: PayloadAction<SIUHIAnalysisJob>
        ) => {
            const updatedJob = action.payload;
            state.jobs.byJobId[updatedJob.jobId] = updatedJob;
        },
        SIUHIAnalysisJobRemoved: (state, action: PayloadAction<string>) => {
            const jobIdToRemove = action.payload;
            delete state.jobs.byJobId[jobIdToRemove];
            state.jobs.allJobIds = state.jobs.allJobIds.filter(
                (id) => id !== jobIdToRemove
            );
        },
        failedToCreateJobErrorMessageChanged: (
            state,
            action: PayloadAction<string>
        ) => {
            state.failedToCreateJobErrorMessage = action.payload;
        },
    },
});

const { reducer } = slice;

export const {
    queryLocation4UrbanHeatIslandToolChanged,
    selectedUrbanAreaFeatureChanged,
    selectedMonthsChanged,
    selectedYearsChanged,
    activePanel4UrbanHeatIslandToolChanged,
    urbanHeatIslandToolFiltersReset,
    SIUHIAnalysisJobCreated,
    SIUHIAnalysisJobUpdated,
    SIUHIAnalysisJobRemoved,
    failedToCreateJobErrorMessageChanged,
} = slice.actions;

export default reducer;
