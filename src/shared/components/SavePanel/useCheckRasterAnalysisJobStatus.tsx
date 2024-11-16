import { checkRasterAnalysisJobStatus } from '@shared/services/raster-analysis/checkJobStatus';
import { SaveJob } from '@shared/store/SaveJobs/reducer';
import { selectPendingRasterAnalysisJobs } from '@shared/store/SaveJobs/selectors';
import { updateSaveJob } from '@shared/store/SaveJobs/thunks';
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

        const checkJobStatus = async (job: SaveJob) => {
            try {
                const response = await checkRasterAnalysisJobStatus(
                    job.rasterAnanlysisJobId,
                    job.rasterAnalysisTaskName
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

                dispatch(updateSaveJob(jobWithUpdatedStatus));
            } catch (error) {
                console.error(
                    `Error checking status for job ${job.rasterAnanlysisJobId}:`,
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
                pendingJobs.map((job) => job.rasterAnanlysisJobId).join(',')
            );

            pendingJobs.forEach((job) => {
                checkJobStatus(job);
            });
        }, 15 * 1000); // 15 seconds

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [pendingJobs]);
};
