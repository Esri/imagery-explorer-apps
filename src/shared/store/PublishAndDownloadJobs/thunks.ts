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

type CreateNewSaveJobParams = {
    /**
     * type of the job
     */
    jobType: PublishAndDownloadJobType;
    title: string;
    summary: string;
    /**
     * id of the scene associated with the job
     */
    sceneId?: string;
};

export const createNewPublishAndDownloadJob =
    ({ jobType, title, summary, sceneId }: CreateNewSaveJobParams) =>
    async (dispatch: StoreDispatch): Promise<PublishAndDownloadJob> => {
        const user = getSignedInUser();

        const timestamp = Date.now();

        const newJob: PublishAndDownloadJob = {
            id: nanoid(5),
            type: jobType,
            title,
            summary,
            status: PublishAndDownloadJobStatus.Submitted,
            publishToHostedImageryService:
                jobType === PublishAndDownloadJobType.PublishChangeDetection ||
                jobType === PublishAndDownloadJobType.PublishIndexMask ||
                jobType === PublishAndDownloadJobType.PublishScene,
            creator: user?.username || 'anonymous',
            createdAt: timestamp,
            updatedAt: timestamp,
            sceneId,
            appName: APP_NAME,
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
