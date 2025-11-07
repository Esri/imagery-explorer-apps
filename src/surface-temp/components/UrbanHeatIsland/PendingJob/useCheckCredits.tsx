import { useAppDispatch } from '@shared/store/configureStore';
import {
    SIUHIAnalysisJob,
    SIUHIAnalysisJobUpdated,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import React, { useEffect } from 'react';

export const useCheckSIUHIAnalysisJobCredits = (job: SIUHIAnalysisJob) => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        if (
            !job ||
            job.status !== 'waiting to start' ||
            job.jobCost?.status !== 'checking'
        ) {
            console.log('No need to check credits for job:', job);
            return;
        }

        // Simulate checking credits
        const timeout = setTimeout(() => {
            // Here you would normally call an API to check credits
            console.log('Checking credits for job:', job);

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    jobCost: {
                        estimatedCredits: 10,
                        status: 'pending-acceptance', // or 'accepted' / 'rejected' based on actual check
                    },
                })
            );
        }, 5000);

        return () => {
            clearTimeout(timeout);
        };
    }, [job?.jobId, job?.status, job?.jobCost?.status]);
};
