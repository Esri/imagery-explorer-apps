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

import {
    PublishAndDownloadJob,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import {
    saveData,
    getAllData,
    deleteDataByKey,
    updateData,
    clearStore,
} from './helpers';
import { APP_NAME } from '@shared/config';

const dbName = 'ImageryExplorerApp_' + APP_NAME;
const storeName = 'PublishAndDownloadJobsStore';

const shouldBeSavedInIndexedDB = (jobData: PublishAndDownloadJob) => {
    const jobType = jobData.type;

    if (
        jobType === PublishAndDownloadJobType.SaveWebMap ||
        jobType === PublishAndDownloadJobType.SaveWebMappingApp
    ) {
        return false;
    }

    return true;
};

export const savePublishAndDownloadJob2IndexedDB = async (
    job: PublishAndDownloadJob
) => {
    if (!shouldBeSavedInIndexedDB(job)) {
        return;
    }

    await saveData(dbName, storeName, job);
};

export const updatePublishAndDownloadJob2IndexedDB = async (
    job: PublishAndDownloadJob
) => {
    if (!shouldBeSavedInIndexedDB(job)) {
        return;
    }

    await updateData(dbName, storeName, job);
};

/**
 * Retrieves publish and download jobs from IndexedDB for a specific user.
 *
 * @param userId - The ID of the user whose jobs are to be fetched.
 * @returns A promise that resolves to an array of `PublishAndDownloadJob` objects associated with the specified user.
 * @throws Will log an error to the console and return an empty array if there is an issue fetching the jobs from IndexedDB.
 */
export const getPublishAndDownloadJobsFromIndexedDB = async (
    userId: string
): Promise<PublishAndDownloadJob[]> => {
    try {
        const data = await getAllData<PublishAndDownloadJob>(dbName, storeName);

        return data.filter((job) => job.creator === userId);
    } catch (error) {
        console.error('Error fetching jobs from IndexedDB', error);
        return [];
    }
};

export const deletePublishAndDownloadJobInIndexedDB = async (
    jobId: string
): Promise<void> => {
    await deleteDataByKey(dbName, storeName, jobId);
};

export const deleteAllPublishAndDownloadJobInIndexedDB =
    async (): Promise<void> => {
        await clearStore(dbName, storeName);
    };
