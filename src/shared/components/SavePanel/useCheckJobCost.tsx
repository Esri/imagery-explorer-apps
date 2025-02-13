import { getEstimateRasterAnalysisCost } from '@shared/services/raster-analysis/checkEstimatedCost';
import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { selectRasterAnalysisJobsPendingCheckingCost } from '@shared/store/PublishAndDownloadJobs/selectors';
import {
    // submitRasterAnalysisJob,
    updatePublishAndDownloadJob,
} from '@shared/store/PublishAndDownloadJobs/thunks';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
import { PublishJobSubmitHandler } from './SavePanelContainer';

export const useCheckJobCost = (
    publishJobSubmitHandler: PublishJobSubmitHandler
) => {
    const dispatch = useAppDispatch();

    const intervalIdRef = useRef<NodeJS.Timeout>();

    const jobsPendingCheckingCost = useAppSelector(
        selectRasterAnalysisJobsPendingCheckingCost
    );

    const checkJobCost = async (job: PublishAndDownloadJob) => {
        try {
            const res = await getEstimateRasterAnalysisCost(job.rasterFunction);

            if (!res.succeeded) {
                return;
            }

            const actualCost = res.credits;

            // add the actual cost to the job
            const updatedJobData: PublishAndDownloadJob = {
                ...job,
                actualCost,
            };

            // If the actual cost is greater than the estimated cost, ask for user approval
            // before submitting the job, otherwise submit the job
            if (actualCost > job.estimatedCost) {
                dispatch(
                    updatePublishAndDownloadJob({
                        ...updatedJobData,
                        status: PublishAndDownloadJobStatus.PendingUserApprovalForActualCost,
                    })
                );
            } else {
                // dispatch(submitRasterAnalysisJob(updatedJobData));
                publishJobSubmitHandler(updatedJobData);
            }
        } catch (error) {
            console.error(
                `Error checking cost for job ${job.rasterAnanlysisJobId}:`,
                error
            );

            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    status: PublishAndDownloadJobStatus.Failed,
                    errormessage: error.message,
                })
            );
        }
    };

    useEffect(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        if (!jobsPendingCheckingCost.length) {
            console.log('No job pending checking cost');
            return;
        }

        intervalIdRef.current = setInterval(() => {
            jobsPendingCheckingCost.forEach((job) => {
                checkJobCost(job);
            });
        }, 15 * 1000); // 15 seconds

        return () => clearInterval(intervalIdRef.current); // Cleanup interval on unmount
    }, [jobsPendingCheckingCost]);
};
