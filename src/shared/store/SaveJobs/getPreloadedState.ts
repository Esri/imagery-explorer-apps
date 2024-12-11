import { getPublishAndDownloadJobsFromIndexedDB } from '@shared/utils/indexedDB/publishAndDownloadJobs';
import { initialSaveJobsState, SaveJobsState } from './reducer';

/**
 * get preloaded state for save jobs state
 * @returns
 */
export const getPreloadedState4SaveJobs = async (): Promise<SaveJobsState> => {
    const jobs = await getPublishAndDownloadJobsFromIndexedDB();
    console.log('pending publish and save jobs', jobs);

    if (!jobs || jobs.length === 0) {
        return {
            ...initialSaveJobsState,
        };
    }

    return {
        jobs: {
            byId: jobs.reduce((acc, job) => {
                acc[job.id] = job;
                return acc;
            }, {} as SaveJobsState['jobs']['byId']),
            allIds: jobs.map((job) => job.id),
        },
    };
};
