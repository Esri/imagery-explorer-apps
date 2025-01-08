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
    sceneId?: string;
    /**
     * raster function of the raster analysis job
     */
    rasterFunction?: any;
    /**
     * estimated cost of the raster analysis job
     */
    estimatedCost?: number;
};

export const createNewPublishAndDownloadJob =
    ({
        jobType,
        title,
        summary,
        sceneId,
        rasterFunction,
        estimatedCost,
    }: CreateNewSaveJobParams) =>
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
            estimatedCost,
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
    (job: PublishAndDownloadJob) => async (dispatch: StoreDispatch) => {
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
