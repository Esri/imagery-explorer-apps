import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { selectFinishedRasterAnalysisJobs } from '@shared/store/PublishAndDownloadJobs/selectors';
import { removePublishAndDownloadJob } from '@shared/store/PublishAndDownloadJobs/thunks';

/**
 * Custom hook that clears finished raster analysis jobs.
 */
export const useClearRasterAnalysisJobs = () => {
    const dispatch = useDispatch();

    const finishedJobs = useSelector(selectFinishedRasterAnalysisJobs);

    useEffect(() => {
        if (!finishedJobs.length) {
            console.log('No finished jobs to clear');
            return;
        }

        for (const job of finishedJobs) {
            const currentTime = new Date().getTime();

            const oneHourInMilliseconds = 60 * 60 * 1000;

            if (job.createdAt - currentTime >= oneHourInMilliseconds) {
                dispatch(removePublishAndDownloadJob(job.id));
            }
        }
    }, [finishedJobs]);
};
