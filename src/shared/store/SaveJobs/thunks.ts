import { getSignedInUser } from '@shared/utils/esri-oauth';
import { StoreDispatch } from '../configureStore';
import {
    jobAdded,
    jobRemoved,
    jobUpdated,
    SaveJob,
    SaveJobStatus,
} from './reducer';
import { nanoid } from 'nanoid';
import { SaveJobType } from '@shared/store/SaveJobs/reducer';
import { APP_NAME } from '@shared/config';
import {
    deletePublishAndDownloadJobInIndexedDB,
    savePublishAndDownloadJob2IndexedDB,
    updatePublishAndDownloadJob2IndexedDB,
} from '@shared/utils/indexedDB/publishAndDownloadJobs';
import { de } from 'date-fns/locale';

type CreateNewSaveJobParams = {
    jobType: SaveJobType;
    sceneId?: string;
};

export const createNewSaveJob =
    ({ jobType, sceneId }: CreateNewSaveJobParams) =>
    async (dispatch: StoreDispatch): Promise<SaveJob> => {
        const user = getSignedInUser();

        const newJob: SaveJob = {
            id: nanoid(5),
            type: jobType,
            status: SaveJobStatus.Submitted,
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
    (job: SaveJob) => async (dispatch: StoreDispatch) => {
        await updatePublishAndDownloadJob2IndexedDB(job);
        dispatch(jobUpdated(job));
    };
