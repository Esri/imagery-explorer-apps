import { getSignedInUser } from '@shared/utils/esri-oauth';
import { StoreDispatch } from '../configureStore';
import {
    jobAdded,
    jobRemoved,
    jobUpdated,
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
} from './reducer';
import { nanoid } from 'nanoid';
import { PublishAndDownloadJobType } from '@shared/store/SaveJobs/reducer';
import { APP_NAME } from '@shared/config';
import {
    deletePublishAndDownloadJobInIndexedDB,
    savePublishAndDownloadJob2IndexedDB,
    updatePublishAndDownloadJob2IndexedDB,
} from '@shared/utils/indexedDB/publishAndDownloadJobs';
import { de } from 'date-fns/locale';

type CreateNewSaveJobParams = {
    jobType: PublishAndDownloadJobType;
    sceneId?: string;
};

export const createNewSaveJob =
    ({ jobType, sceneId }: CreateNewSaveJobParams) =>
    async (dispatch: StoreDispatch): Promise<PublishAndDownloadJob> => {
        const user = getSignedInUser();

        const newJob: PublishAndDownloadJob = {
            id: nanoid(5),
            type: jobType,
            status: PublishAndDownloadJobStatus.Submitted,
            creator: user?.username || 'anonymous',
            createdAt: Date.now(),
            sceneId,
            appName: APP_NAME,
        };

        await savePublishAndDownloadJob2IndexedDB(newJob);

        dispatch(jobAdded(newJob));

        return newJob;
    };

export const removeSaveJob =
    (jobId: string) => async (dispatch: StoreDispatch) => {
        await deletePublishAndDownloadJobInIndexedDB(jobId);
        dispatch(jobRemoved(jobId));
    };

export const updateSaveJob =
    (job: PublishAndDownloadJob) => async (dispatch: StoreDispatch) => {
        await updatePublishAndDownloadJob2IndexedDB(job);
        dispatch(jobUpdated(job));
    };
