import {
    PublishAndDownloadJob,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { saveData, getAllData, deleteDataByKey, updateData } from './helpers';
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

export const getPublishAndDownloadJobsFromIndexedDB = async (): Promise<
    PublishAndDownloadJob[]
> => {
    const data = await getAllData<PublishAndDownloadJob>(dbName, storeName);
    return data || [];
};

export const deletePublishAndDownloadJobInIndexedDB = async (
    jobId: string
): Promise<void> => {
    await deleteDataByKey(dbName, storeName, jobId);
};
