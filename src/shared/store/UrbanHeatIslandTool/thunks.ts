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
import { RasterAnalysisRasterFunction } from '@shared/services/raster-analysis/types';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import { PublishAndDownloadJobStatus } from '../PublishAndDownloadJobs/reducer';

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
                status: PublishAndDownloadJobStatus.Waiting,
                startedAt: 0,
                finishedAt: 0,
                outputItemId: '',
                outputServiceUrl: '',
                errorMessage: '',
                rasterAnalysisJobId: '',
            };

            // create an object for the new job
            const newJob: SIUHIAnalysisJob = {
                jobId: nanoid(5),
                createdAt: Date.now(),
                createdBy: signedInUser.username,
                isPending: true,
                jobCost: {
                    estimatedCredits: 0,
                    status: PublishAndDownloadJobStatus.PendingCheckingCost,
                },
                inputParams: {
                    // Populate with actual input parameters as needed
                    urbanAreaFeature: {
                        ...selectedUrbanAreaFeature,
                    },
                    months: [...selectedMonths],
                    year: selectedYear,
                },
                status: PublishAndDownloadJobStatus.Waiting,
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

export const cancelPendingSIUHIAnalysisJob =
    () => async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const store = getState();

        const pendingJob = selectPendingSIUHIAnalysisJob(store);

        if (!pendingJob) {
            console.log('No pending job found to cancel.');
            return;
        }

        dispatch(
            SIUHIAnalysisJobUpdated({
                ...pendingJob,
                status: PublishAndDownloadJobStatus.Cancelled,
                errorMessage: 'Job was cancelled by the user.',
                isPending: false,
            })
        );
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
    (rasterFunction: RasterAnalysisRasterFunction) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const store = getState();

        const pendingJob = selectPendingSIUHIAnalysisJob(store);

        if (!pendingJob) {
            console.log(
                'No pending job found to start data aggregation sub-job.'
            );
            return;
        }

        const jobCostStatus = pendingJob.jobCost?.status;

        if (
            !jobCostStatus ||
            jobCostStatus !== PublishAndDownloadJobStatus.Succeeded
        ) {
            console.log(
                'Data aggregation sub-job cannot be started as job cost is not accepted.'
            );
            return;
        }

        try {
            // Update the sub-job status to Executing
            // so that the UI can reflect that the sub-job has started
            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        dataAggregation: {
                            ...pendingJob.subJobs.dataAggregation,
                            status: PublishAndDownloadJobStatus.Executing,
                        },
                    },
                })
            );

            const res = await publishSceneAsHostedImageryLayer({
                title: `SIUHI Data Aggregation - Job ${pendingJob.jobId}`,
                snippet:
                    'Surface Intra-Urban Heat Islands Data Aggregation Result',
                description: '',
                accessInformation: '',
                licenseInfo: '',
                rasterFunction,
                cost: pendingJob.jobCost.estimatedCredits,
            });

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        dataAggregation: {
                            ...pendingJob.subJobs.dataAggregation,
                            status: PublishAndDownloadJobStatus.Executing,
                            startedAt: Date.now(),
                            rasterAnalysisJobId: res.rasterAnalysisJobId,
                            outputItemId: res.outputItemId,
                            outputServiceUrl: res.outputServiceUrl,
                        },
                    },
                })
            );
        } catch (error) {
            console.error(
                'Error starting SIUHI analysis data aggregation sub-job:',
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        dataAggregation: {
                            ...pendingJob.subJobs.dataAggregation,
                            status: PublishAndDownloadJobStatus.Failed,
                            finishedAt: Date.now(),
                            errorMessage: (error as Error).message,
                        },
                    },
                    status: PublishAndDownloadJobStatus.Failed,
                    errorMessage: (error as Error).message,
                })
            );
        }
    };

export const startSIUHIAnalysisZonalMeanSubJob =
    (rasterFunction: RasterAnalysisRasterFunction) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const store = getState();

        const pendingJob = selectPendingSIUHIAnalysisJob(store);

        if (!pendingJob) {
            console.log('No pending job found to start zonal eman sub-job.');
            return;
        }

        const dataAggregationJob = pendingJob.subJobs.dataAggregation;

        if (
            !dataAggregationJob ||
            dataAggregationJob.status !==
                PublishAndDownloadJobStatus.Succeeded ||
            !dataAggregationJob.outputServiceUrl
        ) {
            console.log(
                'Zonal mean sub-job cannot be started as data aggregation sub-job is not yet succeeded.'
            );
            return;
        }

        try {
            // Update the sub-job status to Executing
            // so that the UI can reflect that the sub-job has started
            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        zonalMean: {
                            ...pendingJob.subJobs.zonalMean,
                            status: PublishAndDownloadJobStatus.Executing,
                        },
                    },
                })
            );

            const res = await publishSceneAsHostedImageryLayer({
                title: `SIUHI Zonal Mean ${pendingJob.jobId}`,
                snippet: 'Surface Intra-Urban Heat Islands Zonal Mean Result',
                description: '',
                accessInformation: '',
                licenseInfo: '',
                rasterFunction,
                cost: pendingJob.jobCost.estimatedCredits,
            });

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        zonalMean: {
                            ...pendingJob.subJobs.zonalMean,
                            status: PublishAndDownloadJobStatus.Executing,
                            startedAt: Date.now(),
                            rasterAnalysisJobId: res.rasterAnalysisJobId,
                            outputItemId: res.outputItemId,
                            outputServiceUrl: res.outputServiceUrl,
                        },
                    },
                })
            );
        } catch (error) {
            console.error(
                'Error starting SIUHI analysis zonal Mean sub-job:',
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        zonalMean: {
                            ...pendingJob.subJobs.zonalMean,
                            status: PublishAndDownloadJobStatus.Failed,
                            finishedAt: Date.now(),
                            errorMessage: (error as Error).message,
                        },
                    },
                    status: PublishAndDownloadJobStatus.Failed,
                    errorMessage: (error as Error).message,
                })
            );
        }
    };

export const startSIUHIAnalysisSurfaceHeatIndexCalculationSubJob =
    (rasterFunction: RasterAnalysisRasterFunction) =>
    async (dispatch: StoreDispatch, getState: StoreGetState) => {
        const store = getState();

        const pendingJob = selectPendingSIUHIAnalysisJob(store);

        if (!pendingJob) {
            console.log('No pending job found to start zonal eman sub-job.');
            return;
        }

        const dataAggregationJob = pendingJob.subJobs.dataAggregation;
        const zonalMeanJob = pendingJob.subJobs.zonalMean;

        if (
            !dataAggregationJob ||
            dataAggregationJob.status !==
                PublishAndDownloadJobStatus.Succeeded ||
            !dataAggregationJob.outputServiceUrl ||
            !zonalMeanJob ||
            zonalMeanJob.status !== PublishAndDownloadJobStatus.Succeeded ||
            !zonalMeanJob.outputServiceUrl
        ) {
            console.log(
                'Surface Heat Index Calculation sub-job cannot be started as data aggregation or zonal mean sub-job is not yet succeeded.'
            );
            return;
        }

        try {
            // Update the sub-job status to Executing
            // so that the UI can reflect that the sub-job has started
            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        surfaceHeatIndexCalculation: {
                            ...pendingJob.subJobs.surfaceHeatIndexCalculation,
                            status: PublishAndDownloadJobStatus.Executing,
                        },
                    },
                })
            );

            const res = await publishSceneAsHostedImageryLayer({
                title: `SIUHI Surface Heat Index ${pendingJob.jobId}`,
                snippet:
                    'Surface Intra-Urban Heat Islands Surface Heat Index Result',
                description: '',
                accessInformation: '',
                licenseInfo: '',
                rasterFunction,
                cost: pendingJob.jobCost.estimatedCredits,
            });

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        surfaceHeatIndexCalculation: {
                            ...pendingJob.subJobs.surfaceHeatIndexCalculation,
                            status: PublishAndDownloadJobStatus.Executing,
                            startedAt: Date.now(),
                            rasterAnalysisJobId: res.rasterAnalysisJobId,
                            outputItemId: res.outputItemId,
                            outputServiceUrl: res.outputServiceUrl,
                        },
                    },
                })
            );
        } catch (error) {
            console.error(
                'Error starting SIUHI analysis zonal Mean sub-job:',
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...pendingJob,
                    subJobs: {
                        ...pendingJob.subJobs,
                        surfaceHeatIndexCalculation: {
                            ...pendingJob.subJobs.surfaceHeatIndexCalculation,
                            status: PublishAndDownloadJobStatus.Failed,
                            finishedAt: Date.now(),
                            errorMessage: (error as Error).message,
                        },
                    },
                    status: PublishAndDownloadJobStatus.Failed,
                    errorMessage: (error as Error).message,
                })
            );
        }
    };
