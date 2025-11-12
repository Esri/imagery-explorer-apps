import { useAppDispatch } from '@shared/store/configureStore';
import {
    SIUHIAnalysisJob,
    SIUHIAnalysisJobUpdated,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import {
    startSIUHIAnalysisDataAggregationSubJob,
    startSIUHIAnalysisZonalMeanSubJob,
} from '@shared/store/UrbanHeatIslandTool/thunks';
import React, { useEffect } from 'react';
import {
    getRasterFunction4DataAggregation,
    getRasterFunction4ZonalMean,
} from '../../../services/SIHUI/getRasterFunctions';
import { RasteranalysisTaskName } from '@shared/services/raster-analysis/config';
import { checkRasterAnalysisJobStatus } from '@shared/services/raster-analysis/checkJobStatus';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';

export const useManageZonalMeanJob = (job: SIUHIAnalysisJob) => {
    const dispatch = useAppDispatch();

    const { subJobs, jobCost } = job || {};

    const jobStatus = job?.status;

    const { zonalMean, dataAggregation } = subJobs || {};

    const dataAggregationStatus = dataAggregation?.status;

    const dataAggregationOutoutServiceUrl = dataAggregation?.outputServiceUrl;

    const zonalMeanStatus = zonalMean?.status;

    const zonalMeanJobId = zonalMean?.rasterAnalysisJobId;

    const jobCostStatus = jobCost?.status;

    const startJob = async () => {
        if (!job) {
            return;
        }

        try {
            const rasterFunction = getRasterFunction4ZonalMean(
                dataAggregationOutoutServiceUrl
            );

            dispatch(startSIUHIAnalysisZonalMeanSubJob(rasterFunction));
        } catch (error) {
            console.error('Error starting zonal mean job:', error);
        }
    };

    const checkJobStatus = async () => {
        if (!job || !zonalMeanJobId) {
            return;
        }

        try {
            const response = await checkRasterAnalysisJobStatus(
                zonalMeanJobId,
                RasteranalysisTaskName.GenerateRaster
            );
            // Handle the response as needed
            // console.log(`Status for job ${job.jobId}:`, response);

            if (!response.jobStatus) {
                throw new Error('Job status not found');
            }

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    subJobs: {
                        ...job.subJobs,
                        zonalMean: {
                            ...job.subJobs.zonalMean,
                            status: response.jobStatus,
                        },
                    },
                })
            );
        } catch (error) {
            console.error(
                `Error checking status for job ${job.subJobs.zonalMean.rasterAnalysisJobId}:`,
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    subJobs: {
                        ...job.subJobs,
                        zonalMean: {
                            ...job.subJobs.zonalMean,
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
            !job ||
            jobCostStatus !== PublishAndDownloadJobStatus.Succeeded ||
            dataAggregationStatus !== PublishAndDownloadJobStatus.Succeeded ||
            !dataAggregationOutoutServiceUrl
        ) {
            console.log(
                'Zonal Mean Job Management: No action needed for job:',
                job
            );
            return;
        }

        if (
            zonalMeanStatus !== PublishAndDownloadJobStatus.Waiting ||
            zonalMeanJobId
        ) {
            console.log(
                'Zonal Mean job management: Zonal Mean job already started for job:',
                job
            );
            return;
        }

        // dispatch(startSIUHIAnalysisDataAggregationSubJob());
        startJob();
    }, [
        jobCostStatus,
        dataAggregationStatus,
        zonalMeanStatus,
        zonalMeanJobId,
        dataAggregationOutoutServiceUrl,
    ]);

    useEffect(() => {
        if (!zonalMeanJobId) {
            return;
        }

        if (
            zonalMeanStatus !== PublishAndDownloadJobStatus.Executing &&
            zonalMeanStatus !== PublishAndDownloadJobStatus.New
        ) {
            return;
        }

        const interval = setInterval(async () => {
            console.log('Checking status of zonal mean job:', zonalMeanJobId);
            // dispatch(checkSIUHIAnalysisDataAggregationSubJobStatus(dataAggregationJobId));
            checkJobStatus();
        }, 15 * 1000); // Check every 15 seconds

        return () => {
            clearInterval(interval);
        };
    }, [zonalMeanJobId, zonalMeanStatus, dataAggregationOutoutServiceUrl]);
};
