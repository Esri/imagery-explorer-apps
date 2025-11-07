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

import Point from '@arcgis/core/geometry/Point';
import { RootState, StoreDispatch, StoreGetState } from '../configureStore';
import {
    selectActiveAnalysisTool,
    selectAppMode,
} from '../ImageryScene/selectors';
import {
    activePanel4UrbanHeatIslandToolChanged,
    failedToCreateJobErrorMessageChanged,
    queryLocation4UrbanHeatIslandToolChanged,
    SIUHIAnalysisJob,
    SIUHIAnalysisJobCreated,
    SIUHIAnalysisJobUpdated,
    SIUHIAnalysisSubJob,
} from './reducer';
import { nanoid } from 'nanoid';
import { getSignedInUser } from '@shared/utils/esri-oauth';
import {
    selectPendingSIUHIAnalysisJob,
    selectSelectedMonths4UrbanHeatIslandTool,
    selectSelectedUrbanAreaFeature,
    selectSelectedYear4UrbanHeatIslandTool,
} from './selectors';

/**
 * This thunk function updates the query location for the Urban Heat Island Tool.
 * @param point The new query location as a Point object.
 * @returns A thunk action that updates the query location in the store.
 */
export const updateQueryLocation4UrbanHeatIslandTool =
    (point: Point) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const mode = selectAppMode(getState());

        const tool = selectActiveAnalysisTool(getState());

        if (mode !== 'analysis' || tool !== 'urban heat island') {
            return;
        }

        dispatch(queryLocation4UrbanHeatIslandToolChanged(point));
    };

export const createNewSIUHIAnalysisJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        // Implementation for creating a new SIUHI analysis job goes here.

        try {
            const signedInUser = getSignedInUser();

            if (!signedInUser) {
                throw new Error(
                    'No signed-in user found. Cannot create SIUHI analysis job.'
                );
            }

            const state = getState();

            // Retrieve necessary input parameters from the state
            const selectedYear = selectSelectedYear4UrbanHeatIslandTool(state);
            const selectedMonths =
                selectSelectedMonths4UrbanHeatIslandTool(state);
            const selectedUrbanAreaFeature =
                selectSelectedUrbanAreaFeature(state);

            if (!selectedUrbanAreaFeature) {
                throw new Error(
                    'No urban area feature selected. Cannot create SIUHI analysis job.'
                );
            }

            if (selectedMonths.length === 0) {
                throw new Error(
                    'No months selected. Cannot create SIUHI analysis job.'
                );
            }

            if (selectedYear === null) {
                throw new Error(
                    'No years selected. Cannot create SIUHI analysis job.'
                );
            }

            // Create the new SIUHI analysis job object
            const subJobObj: SIUHIAnalysisSubJob = {
                status: 'waiting to start',
                startedAt: 0,
                finishedAt: 0,
                outputItemId: '',
                outputServiceUrl: '',
                errorMessage: '',
            };

            // create an object for the new job
            const newJob: SIUHIAnalysisJob = {
                jobId: nanoid(5),
                createdAt: Date.now(),
                createdBy: signedInUser.username,
                isPending: true,
                jobCost: {
                    estimatedCredits: 0,
                    status: 'checking',
                },
                inputParams: {
                    // Populate with actual input parameters as needed
                    urbanAreaFeature: {
                        ...selectedUrbanAreaFeature,
                    },
                    months: [...selectedMonths],
                    year: selectedYear,
                },
                status: 'waiting to start',
                errorMessage: '',
                subJobs: {
                    dataAggregation: {
                        ...subJobObj,
                    },
                    zonalMean: {
                        ...subJobObj,
                    },
                    surfaceHeatIndexCalculation: {
                        ...subJobObj,
                    },
                },
            };

            // Dispatch an action to add the new job to the store
            dispatch(SIUHIAnalysisJobCreated(newJob));
            dispatch(
                activePanel4UrbanHeatIslandToolChanged('view pending job')
            );
        } catch (err) {
            console.error('Error creating new SIUHI analysis job:', err);
            dispatch(
                failedToCreateJobErrorMessageChanged(
                    (err as Error)?.message ||
                        'Unknown error occurred while creating SIUHI analysis job.'
                )
            );
        }
    };

export const updateSIUHIAnalysisJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        // Implementation for updating an existing SIUHI analysis job goes here.
    };

export const removeSIUHIAnalysisJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        // Implementation for removing a SIUHI analysis job goes here.
    };

export const startSIUHIAnalysisDataAggregationSubJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const store = getState();
        const pendingJob = selectPendingSIUHIAnalysisJob(store);

        if (!pendingJob) {
            console.log(
                'No pending job found to start data aggregation sub-job.'
            );
            return;
        }

        dispatch(
            SIUHIAnalysisJobUpdated({
                ...pendingJob,
                subJobs: {
                    ...pendingJob.subJobs,
                    dataAggregation: {
                        ...pendingJob.subJobs.dataAggregation,
                        status: 'in progress',
                        startedAt: Date.now(),
                    },
                },
            })
        );
    };

export const startSIUHIAnalysisZonalMeanSubJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        // Implementation for starting the zonal mean sub-job goes here.
    };

export const startSIUHIAnalysisSurfaceHeatIndexCalculationSubJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        // Implementation for starting the surface heat index calculation sub-job goes here.
    };
