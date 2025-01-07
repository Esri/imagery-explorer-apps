import { PublishAndDownloadJob } from '@shared/store/PublishAndDownloadJobs/reducer';
import { selectRasterAnalysisJobsPendingCheckingCost } from '@shared/store/PublishAndDownloadJobs/selectors';
import React, { useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useCheckJobCost = () => {
    const dispatch = useDispatch();

    const intervalIdRef = useRef<NodeJS.Timeout>();

    const jobsPendingCheckingCost = useSelector(
        selectRasterAnalysisJobsPendingCheckingCost
    );

    const checkJobCost = async (job: PublishAndDownloadJob) => {
        const jobWithUpdatedStatus = {
            ...job,
        };

        try {
            // const response = await checkRasterAnalysisJobStatus(
            //     job.rasterAnanlysisJobId,
            //     job.rasterAnalysisTaskName
            // );
            // if (!response.jobStatus) {
            //     throw new Error('Job status not found');
            // }
            // const jobWithUpdatedStatus = {
            //     ...job,
            //     status: response.jobStatus,
            //     output: response,
            // };
            // jobWithUpdatedStatus.status = response.jobStatus;
            // // jobWithUpdatedStatus.output = response;
            // jobWithUpdatedStatus.progress =
            //     response?.progress?.percent || 0;
            // dispatch(updatePublishAndDownloadJob(jobWithUpdatedStatus));
        } catch (error) {
            // console.error(
            //     `Error checking status for job ${job.rasterAnanlysisJobId}:`,
            //     error
            // );
            // jobWithUpdatedStatus.status =
            //     PublishAndDownloadJobStatus.Failed;
            // jobWithUpdatedStatus.errormessage = error.message;
        }

        // dispatch(updatePublishAndDownloadJob(jobWithUpdatedStatus));
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
        }, 5 * 1000); // 5 seconds

        return () => clearInterval(intervalIdRef.current); // Cleanup interval on unmount
    }, [jobsPendingCheckingCost]);
};
