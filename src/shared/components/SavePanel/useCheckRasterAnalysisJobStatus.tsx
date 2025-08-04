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

import { checkRasterAnalysisJobStatus } from '@shared/services/raster-analysis/checkJobStatus';
import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { selectPendingRasterAnalysisJobs } from '@shared/store/PublishAndDownloadJobs/selectors';
import { updatePublishAndDownloadJob } from '@shared/store/PublishAndDownloadJobs/thunks';
import React, { useEffect, useRef } from 'react';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';

export const useCheckJobStatus = () => {
    const dispatch = useAppDispatch();

    const pendingJobs = useAppSelector(selectPendingRasterAnalysisJobs);

    const intervalIdRef = useRef<NodeJS.Timeout>(null);

    const checkJobStatus = async (job: PublishAndDownloadJob) => {
        const jobWithUpdatedStatus = {
            ...job,
        };

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

            // const jobWithUpdatedStatus = {
            //     ...job,
            //     status: response.jobStatus,
            //     output: response,
            // };

            jobWithUpdatedStatus.status = response.jobStatus;
            // jobWithUpdatedStatus.output = response;

            jobWithUpdatedStatus.progress = response?.progress?.percent || 0;

            // dispatch(updatePublishAndDownloadJob(jobWithUpdatedStatus));
        } catch (error) {
            console.error(
                `Error checking status for job ${job.rasterAnanlysisJobId}:`,
                error
            );

            jobWithUpdatedStatus.status = PublishAndDownloadJobStatus.Failed;
            jobWithUpdatedStatus.errormessage = error.message;
        }

        dispatch(updatePublishAndDownloadJob(jobWithUpdatedStatus));
    };

    useEffect(() => {
        if (intervalIdRef.current) {
            clearInterval(intervalIdRef.current);
        }

        if (!pendingJobs.length) {
            console.log('No pending jobs to check');
            return;
        }

        intervalIdRef.current = setInterval(() => {
            // console.log(
            //     'Checking job status for:',
            //     pendingJobs.map((job) => job.rasterAnanlysisJobId).join(',')
            // );

            pendingJobs.forEach((job) => {
                checkJobStatus(job);
            });
        }, 15 * 1000); // 15 seconds

        return () => clearInterval(intervalIdRef.current); // Cleanup interval on unmount
    }, [pendingJobs]);
};
