import { getPublishAndDownloadJobsFromIndexedDB } from '@shared/utils/indexedDB/publishAndDownloadJobs';
import {
    initialPublishAndDownloadJobsState,
    PublishAndDownloadJobsState,
} from './reducer';
import { getSignedInUser } from '@shared/utils/esri-oauth';

/**
 * get preloaded state for publish and download jobs state
 * @returns
 */
export const getPreloadedState4PublishAndDownloadJobs =
    async (): Promise<PublishAndDownloadJobsState> => {
        try {
            const user = getSignedInUser();

            if (!user) {
                throw new Error('User not signed in');
            }

            const jobs = await getPublishAndDownloadJobsFromIndexedDB(
                user.username
            );
            // console.log('pending publish and save jobs', jobs);

            if (!jobs || jobs.length === 0) {
                return {
                    ...initialPublishAndDownloadJobsState,
                };
            }

            return {
                jobs: {
                    byId: jobs.reduce((acc, job) => {
                        acc[job.id] = job;
                        return acc;
                    }, {} as PublishAndDownloadJobsState['jobs']['byId']),
                    allIds: jobs.map((job) => job.id),
                },
            };
        } catch (error) {
            console.error('Error fetching jobs from IndexedDB', error);
            return {
                ...initialPublishAndDownloadJobsState,
            };
        }
    };
