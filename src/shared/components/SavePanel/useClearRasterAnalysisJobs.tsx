import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from '@shared/store/configureStore';
import { selectFinishedRasterAnalysisJobs } from '@shared/store/PublishAndDownloadJobs/selectors';
import { removePublishAndDownloadJob } from '@shared/store/PublishAndDownloadJobs/thunks';

/**
 * Custom hook that clears finished raster analysis jobs.
 * If a job has been finished for more than an hour, it will be removed from the store.
 */
export const useClearRasterAnalysisJobs = () => {
    const dispatch = useAppDispatch();

    const finishedJobs = useSelector(selectFinishedRasterAnalysisJobs);

    useEffect(() => {
        if (!finishedJobs.length) {
            console.log('No finished jobs to clear');
            return;
        }

        for (const job of finishedJobs) {
            const currentTime = new Date().getTime();

            const oneHourInMilliseconds = 60 * 60 * 1000;

            if (currentTime - job.updatedAt >= oneHourInMilliseconds) {
                dispatch(removePublishAndDownloadJob(job.id));
            }
        }
    }, [finishedJobs.length]);
};
