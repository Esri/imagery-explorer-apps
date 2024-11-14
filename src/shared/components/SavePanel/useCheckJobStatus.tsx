import {
    checkRasterAnalysisJobStatus,
    RasterAnalysisTaskName,
} from '@shared/services/raster-analysis/checkJobStatus';
import { RasterAnalysisJob } from '@shared/store/RasterAnalysisJobs/reducer';
import { selectPendingRasterAnalysisJobs } from '@shared/store/RasterAnalysisJobs/selectors';
import { updateRasterAnalysisJob } from '@shared/store/RasterAnalysisJobs/thunks';
import { th } from 'date-fns/locale';
import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const useCheckJobStatus = () => {
    const dispatch = useDispatch();

    const pendingJobs = useSelector(selectPendingRasterAnalysisJobs);

    useEffect(() => {
        if (!pendingJobs.length) {
            console.log('No pending jobs to check');
            return;
        }

        const checkJobStatus = async (job: RasterAnalysisJob) => {
            try {
                const response = await checkRasterAnalysisJobStatus(
                    job.jobId,
                    job.taskName
                );
                // Handle the response as needed
                // console.log(`Status for job ${job.jobId}:`, response);

                if (!response.jobStatus) {
                    throw new Error('Job status not found');
                }

                const jobWithUpdatedStatus = {
                    ...job,
                    status: response.jobStatus,
                    output: response,
                };

                dispatch(updateRasterAnalysisJob(jobWithUpdatedStatus));
            } catch (error) {
                console.error(
                    `Error checking status for job ${job.jobId}:`,
                    error
                );
            }
        };

        const intervalId = setInterval(() => {
            if (!pendingJobs.length) {
                clearInterval(intervalId);
                return;
            }

            console.log(
                'Checking job status for:',
                pendingJobs.map((job) => job.jobId).join(',')
            );

            pendingJobs.forEach((job) => {
                checkJobStatus(job);
            });
        }, 15 * 1000); // 15 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [pendingJobs]);
};
