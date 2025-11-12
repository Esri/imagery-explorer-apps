import { useAppDispatch } from '@shared/store/configureStore';
import {
    SIUHIAnalysisJob,
    SIUHIAnalysisJobUpdated,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import { startSIUHIAnalysisDataAggregationSubJob } from '@shared/store/UrbanHeatIslandTool/thunks';
import React, { useEffect } from 'react';
import { getRasterFunction4DataAggregation } from '../../../services/SIHUI/getRasterFunctions';
import { RasteranalysisTaskName } from '@shared/services/raster-analysis/config';
import { checkRasterAnalysisJobStatus } from '@shared/services/raster-analysis/checkJobStatus';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';

export const useManageDataAggregationJob = (job: SIUHIAnalysisJob) => {
    const dispatch = useAppDispatch();

    const { subJobs, jobCost } = job || {};

    const jobStatus = job?.status;

    const { dataAggregation } = subJobs || {};

    const dataAggregationStatus = dataAggregation?.status;

    const dataAggregationJobId = dataAggregation?.rasterAnalysisJobId;

    const jobCostStatus = jobCost?.status;

    const startJob = async () => {
        if (!job) {
            return;
        }

        const resterFunction = await getRasterFunction4DataAggregation({
            selectedFeature: job.inputParams.urbanAreaFeature,
            selectedYear: job.inputParams.year,
            selectedMonths: job.inputParams.months,
        });

        dispatch(startSIUHIAnalysisDataAggregationSubJob(resterFunction));
    };

    const checkJobStatus = async () => {
        if (!job || !dataAggregationJobId) {
            return;
        }

        try {
            const response = await checkRasterAnalysisJobStatus(
                dataAggregationJobId,
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
                        dataAggregation: {
                            ...job.subJobs.dataAggregation,
                            status: response.jobStatus,
                        },
                    },
                })
            );
        } catch (error) {
            console.error(
                `Error checking status for job ${job.subJobs.dataAggregation.rasterAnalysisJobId}:`,
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    subJobs: {
                        ...job.subJobs,
                        dataAggregation: {
                            ...job.subJobs.dataAggregation,
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
            jobStatus !== PublishAndDownloadJobStatus.Waiting ||
            jobCostStatus !== PublishAndDownloadJobStatus.Succeeded
        ) {
            console.log(
                'Data aggregation job management: No action needed for job:',
                job
            );
            return;
        }

        if (
            dataAggregationStatus !== PublishAndDownloadJobStatus.Waiting ||
            dataAggregationJobId
        ) {
            console.log(
                'Data aggregation job management: Data aggregation already started for job:',
                job
            );
            return;
        }

        // dispatch(startSIUHIAnalysisDataAggregationSubJob());
        startJob();
    }, [dataAggregationJobId, jobStatus, dataAggregationStatus, jobCostStatus]);

    useEffect(() => {
        if (!dataAggregationJobId) {
            return;
        }

        if (
            dataAggregationStatus !== PublishAndDownloadJobStatus.Executing &&
            dataAggregationStatus !== PublishAndDownloadJobStatus.New
        ) {
            return;
        }

        const interval = setInterval(async () => {
            console.log(
                'Checking status of data aggregation job:',
                dataAggregationJobId
            );
            // dispatch(checkSIUHIAnalysisDataAggregationSubJobStatus(dataAggregationJobId));
            checkJobStatus();
        }, 15 * 1000); // Check every 15 seconds

        return () => {
            clearInterval(interval);
        };
    }, [dataAggregationJobId, dataAggregationStatus]);
};
