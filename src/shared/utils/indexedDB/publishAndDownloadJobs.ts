import { SaveJob, SaveJobType } from '@shared/store/SaveJobs/reducer';
import { saveData, getAllData, deleteDataByKey, updateData } from './helpers';

const dbName = 'ImageryExplorerApps';
const storeName = 'PublishAndDownloadJobsStore';

const shouldBeSavedInIndexedDB = (jobData: SaveJob) => {
    const jobType = jobData.type;

    if (
        jobType === SaveJobType.SaveWebMap ||
        jobType === SaveJobType.SaveWebMappingApp
    ) {
        return false;
    }

    return true;
};

export const savePublishAndDownloadJob2IndexedDB = async (job: SaveJob) => {
    if (!shouldBeSavedInIndexedDB(job)) {
        return;
    }

    await saveData(dbName, storeName, job);
};

export const updatePublishAndDownloadJob2IndexedDB = async (job: SaveJob) => {
    if (!shouldBeSavedInIndexedDB(job)) {
        return;
    }

    await updateData(dbName, storeName, job);
};

export const getPublishAndDownloadJobsFromIndexedDB = async (): Promise<
    SaveJob[]
> => {
    const data = await getAllData<SaveJob>(dbName, storeName);
    return data || [];
};

export const deletePublishAndDownloadJobInIndexedDB = async (
    jobId: string
): Promise<void> => {
    await deleteDataByKey(dbName, storeName, jobId);
};
