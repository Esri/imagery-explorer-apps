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

            // If the actual cost is greater than 0, ask for user approval
            // before submitting the job, otherwise submit the job
            if (actualCost > 0) {
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
