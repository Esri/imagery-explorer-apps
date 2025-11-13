import { useAppDispatch } from '@shared/store/configureStore';
import {
    SIUHIAnalysisJob,
    SIUHIAnalysisJobUpdated,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import {
    startSIUHIAnalysisDataAggregationSubJob,
    startSIUHIAnalysisSurfaceHeatIndexCalculationSubJob,
    startSIUHIAnalysisZonalMeanSubJob,
} from '@shared/store/UrbanHeatIslandTool/thunks';
import React, { useEffect } from 'react';
import {
    getRasterFunction4DataAggregation,
    getRasterFunction4SurfaceHeatIndex,
    getRasterFunction4ZonalMean,
} from '../../../services/SIHUI/getRasterFunctions';
import { RasteranalysisTaskName } from '@shared/services/raster-analysis/config';
import { checkRasterAnalysisJobStatus } from '@shared/services/raster-analysis/checkJobStatus';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';

export const useManageSurfaceHeatIndexJob = (job: SIUHIAnalysisJob) => {
    const dispatch = useAppDispatch();

    const { subJobs } = job || {};

    const jobStatus = job?.status;

    const { zonalMean, dataAggregation, surfaceHeatIndexCalculation } =
        subJobs || {};

    const dataAggregationStatus = dataAggregation?.status;

    const dataAggregationOutoutServiceUrl = dataAggregation?.outputServiceUrl;

    const zonalMeanStatus = zonalMean?.status;

    const zonalMeanOutputServiceUrl = zonalMean?.outputServiceUrl;

    const surfaceHeatIndexCalculationStatus =
        surfaceHeatIndexCalculation?.status;

    const surfaceHeatIndexCalculationJobId =
        surfaceHeatIndexCalculation?.rasterAnalysisJobId;

    const startJob = async () => {
        if (!dataAggregationOutoutServiceUrl || !zonalMeanOutputServiceUrl) {
            return;
        }

        try {
            const rasterFunction = getRasterFunction4SurfaceHeatIndex(
                dataAggregationOutoutServiceUrl,
                zonalMeanOutputServiceUrl
            );

            dispatch(
                startSIUHIAnalysisSurfaceHeatIndexCalculationSubJob(
                    rasterFunction
                )
            );
        } catch (error) {
            console.error('Error starting zonal mean job:', error);
        }
    };

    const checkJobStatus = async () => {
        if (!job || !surfaceHeatIndexCalculationJobId) {
            return;
        }

        try {
            const response = await checkRasterAnalysisJobStatus(
                surfaceHeatIndexCalculationJobId,
                RasteranalysisTaskName.GenerateRaster
            );
            // Handle the response as needed
            // console.log(`Status for job ${job.jobId}:`, response);

            if (!response.jobStatus) {
                throw new Error('Job status not found');
            }

            const succeeded =
                response.jobStatus === PublishAndDownloadJobStatus.Succeeded;

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    subJobs: {
                        ...job.subJobs,
                        surfaceHeatIndexCalculation: {
                            ...job.subJobs.surfaceHeatIndexCalculation,
                            status: response.jobStatus,
                            finishedAt: succeeded ? Date.now() : 0,
                        },
                    },
                    // Update overall job status based on sub-job status
                    // since this is the last sub-job to complete
                    status: succeeded
                        ? PublishAndDownloadJobStatus.Succeeded
                        : job.status,
                })
            );
        } catch (error) {
            console.error(
                `Error checking status for job ${job.subJobs.surfaceHeatIndexCalculation.rasterAnalysisJobId}:`,
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    subJobs: {
                        ...job.subJobs,
                        surfaceHeatIndexCalculation: {
                            ...job.subJobs.surfaceHeatIndexCalculation,
                            status: PublishAndDownloadJobStatus.Failed,
                            errorMessage: (error as Error).message,
                        },
                    },
                    status: PublishAndDownloadJobStatus.Failed,
                    errorMessage: (error as Error).message,
                })
            );
        }
    };

    useEffect(() => {
        if (
            dataAggregationStatus !== PublishAndDownloadJobStatus.Succeeded ||
            zonalMeanStatus !== PublishAndDownloadJobStatus.Succeeded ||
            !dataAggregationOutoutServiceUrl ||
            !zonalMeanOutputServiceUrl
        ) {
            console.log('Surface Heat Index: No action needed for job:', job);
            return;
        }

        if (
            jobStatus === PublishAndDownloadJobStatus.Succeeded ||
            jobStatus === PublishAndDownloadJobStatus.Failed ||
            jobStatus === PublishAndDownloadJobStatus.Cancelled
        ) {
            console.log(
                'Surface Heat Index Calculation job management: Overall job already completed for job:',
                job
            );
            return;
        }

        if (
            surfaceHeatIndexCalculationStatus !==
                PublishAndDownloadJobStatus.Waiting ||
            surfaceHeatIndexCalculationJobId
        ) {
            console.log(
                'Surface Heat Index Calculation Job Management: Job already started or not in waiting state:',
                job
            );
            return;
        }

        // dispatch(startSIUHIAnalysisDataAggregationSubJob());
        startJob();
    }, [
        dataAggregationStatus,
        zonalMeanStatus,
        dataAggregationOutoutServiceUrl,
        zonalMeanOutputServiceUrl,
        surfaceHeatIndexCalculationStatus,
        surfaceHeatIndexCalculationJobId,
        jobStatus,
    ]);

    useEffect(() => {
        if (!surfaceHeatIndexCalculationJobId) {
            return;
        }

        if (
            surfaceHeatIndexCalculationStatus !==
                PublishAndDownloadJobStatus.Executing &&
            surfaceHeatIndexCalculationStatus !==
                PublishAndDownloadJobStatus.New
        ) {
            return;
        }

        if (
            jobStatus === PublishAndDownloadJobStatus.Succeeded ||
            jobStatus === PublishAndDownloadJobStatus.Failed ||
            jobStatus === PublishAndDownloadJobStatus.Cancelled
        ) {
            return;
        }

        const interval = setInterval(async () => {
            console.log(
                'Checking Surface Heat Index Calculation job status for job:',
                surfaceHeatIndexCalculationStatus
            );
            // dispatch(checkSIUHIAnalysisDataAggregationSubJobStatus(dataAggregationJobId));
            checkJobStatus();
        }, 15 * 1000); // Check every 15 seconds

        return () => {
            clearInterval(interval);
        };
    }, [
        surfaceHeatIndexCalculationJobId,
        surfaceHeatIndexCalculationStatus,
        jobStatus,
    ]);
};
