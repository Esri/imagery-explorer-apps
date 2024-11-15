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

type CreateNewSaveJobParams = {
    jobType: SaveJobType;
    sceneId?: string;
};

export const createNewSaveJob =
    ({ jobType, sceneId }: CreateNewSaveJobParams) =>
    async (dispatch: StoreDispatch): Promise<SaveJob> => {
        const user = getSignedInUser();

        const newJob: SaveJob = {
            uniqueId: nanoid(5),
            type: jobType,
            status: SaveJobStatus.Submitted,
            creator: user?.username || 'anonymous',
            createdAt: Date.now(),
            sceneId,
            appName: APP_NAME,
        };

        dispatch(jobAdded(newJob));

        return newJob;
    };

export const removeSaveJob =
    (jobId: string) => async (dispatch: StoreDispatch) => {
        dispatch(jobRemoved(jobId));
    };

export const updateSaveJob =
    (job: SaveJob) => async (dispatch: StoreDispatch) => {
        dispatch(jobUpdated(job));
    };
