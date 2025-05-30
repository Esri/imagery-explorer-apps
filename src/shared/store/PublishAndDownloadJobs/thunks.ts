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

import { getSignedInUser } from '@shared/utils/esri-oauth';
import { StoreDispatch } from '../configureStore';
import {
    jobAdded,
    jobRemoved,
    jobsCleared,
    jobUpdated,
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
} from './reducer';
import { nanoid } from 'nanoid';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import { APP_NAME } from '@shared/config';
import {
    deleteAllPublishAndDownloadJobInIndexedDB,
    deletePublishAndDownloadJobInIndexedDB,
    savePublishAndDownloadJob2IndexedDB,
    updatePublishAndDownloadJob2IndexedDB,
} from '@shared/utils/indexedDB/publishAndDownloadJobs';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';

type CreateNewSaveJobParams = {
    /**
     * type of the job
     */
    jobType: PublishAndDownloadJobType;
    /**
     * title of the job
     */
    title: string;
    /**
     * summary of the job
     */
    summary: string;
    /**
     * id of the scene associated with the job
     */
    sceneIds?: string[];
    /**
     * raster function of the raster analysis job
     */
    rasterFunction?: any;
    // /**
    //  * estimated cost of the raster analysis job
    //  */
    // estimatedCost?: number;
};

export const createNewPublishAndDownloadJob =
    ({
        jobType,
        title,
        summary,
        sceneIds,
        rasterFunction,
    }: // estimatedCost,
    CreateNewSaveJobParams) =>
    async (dispatch: StoreDispatch): Promise<PublishAndDownloadJob> => {
        const user = getSignedInUser();

        const timestamp = Date.now();

        const publishToHostedImageryService =
            jobType === PublishAndDownloadJobType.PublishChangeDetection ||
            jobType === PublishAndDownloadJobType.PublishIndexMask ||
            jobType === PublishAndDownloadJobType.PublishScene;

        // set the status of the raster analysis job to PendingCheckingCost so it will be checked for cost before being submitted
        const status: PublishAndDownloadJobStatus =
            publishToHostedImageryService
                ? PublishAndDownloadJobStatus.PendingCheckingCost
                : PublishAndDownloadJobStatus.Submitted;

        const sceneId = sceneIds?.[0] || 'N/A';

        const newJob: PublishAndDownloadJob = {
            id: nanoid(5),
            type: jobType,
            title,
            summary,
            status,
            publishToHostedImageryService,
            creator: user?.username || 'anonymous',
            createdAt: timestamp,
            updatedAt: timestamp,
            sceneId,
            appName: APP_NAME,
            rasterFunction,
            // estimatedCost,
        };

        await savePublishAndDownloadJob2IndexedDB(newJob);

        dispatch(jobAdded(newJob));

        return newJob;
    };

export const removePublishAndDownloadJob =
    (jobId: string) => async (dispatch: StoreDispatch) => {
        await deletePublishAndDownloadJobInIndexedDB(jobId);
        dispatch(jobRemoved(jobId));
    };

export const clearAllPublishAndDownloadJobs =
    () => async (dispatch: StoreDispatch) => {
        await deleteAllPublishAndDownloadJobInIndexedDB();
        dispatch(jobsCleared());
    };

export const updatePublishAndDownloadJob =
    (job: PublishAndDownloadJob) => async (dispatch: StoreDispatch) => {
        const updatedJob: PublishAndDownloadJob = {
            ...job,
            updatedAt: Date.now(),
        };

        await updatePublishAndDownloadJob2IndexedDB(updatedJob);
        dispatch(jobUpdated(updatedJob));
    };

export const submitRasterAnalysisJob =
    ({
        job,
        description,
        accessInformation,
        licenseInfo,
    }: {
        job: PublishAndDownloadJob;
        description?: string;
        accessInformation?: string;
        licenseInfo?: string;
    }) =>
    async (dispatch: StoreDispatch) => {
        try {
            const { title, summary, rasterFunction } = job;

            if (!rasterFunction) {
                throw new Error('Failed to create raster function');
            }

            const updatedJobData = {
                ...job,
                status: PublishAndDownloadJobStatus.Submitted,
            };

            // set the status of the job to Submitted
            // so the user can see the job is being processed
            dispatch(updatePublishAndDownloadJob(updatedJobData));

            // create the hosted imagery layer and submit the generate raster job
            const response = await publishSceneAsHostedImageryLayer({
                title,
                snippet: summary,
                rasterFunction,
                cost: job.actualCost,
                description,
                accessInformation,
                licenseInfo,
            });
            // console.log('Generate Raster Job submitted', response);

            dispatch(
                updatePublishAndDownloadJob({
                    ...updatedJobData,
                    rasterAnanlysisJobId: response.rasterAnalysisJobId,
                    rasterAnalysisTaskName: 'GenerateRaster',
                    outputURL: response.outputServiceUrl,
                    outputItemId: response.outputItemId,
                })
            );
        } catch (err) {
            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    status: PublishAndDownloadJobStatus.Failed,
                    errormessage: `Failed to publish scene: ${
                        err.message || 'unknown error'
                    }`,
                })
            );
        }
    };
