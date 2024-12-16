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
