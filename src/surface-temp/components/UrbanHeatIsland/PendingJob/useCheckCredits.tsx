import { getEstimateRasterAnalysisCost } from '@shared/services/raster-analysis/checkEstimatedCost';
import { useAppDispatch } from '@shared/store/configureStore';
import {
    SIUHIAnalysisJob,
    SIUHIAnalysisJobUpdated,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import React, { useEffect, useRef } from 'react';

export const useCheckSIUHIAnalysisJobCredits = (job: SIUHIAnalysisJob) => {
    const dispatch = useAppDispatch();

    const intervalIdRef = useRef<NodeJS.Timeout>(null);

    const shouldCheckCredits = React.useMemo(() => {
        return (
            job?.jobId &&
            job?.status === 'waiting to start' &&
            job?.jobCost?.status === 'checking'
        );
    }, [job?.jobId, job?.status, job?.jobCost?.status]);

    const checkJobCost = async (job: SIUHIAnalysisJob) => {
        console.log('Checking job cost for SIUHI analysis job:', job);

        try {
            const res = await getEstimateRasterAnalysisCost(null);

            if (!res.succeeded) {
                return;
            }

            const actualCost = res.credits;

            // add the actual cost to the job
            const updatedJobData: SIUHIAnalysisJob = {
                ...job,
                jobCost: {
                    estimatedCredits: actualCost,
                    status: actualCost > 0 ? 'pending-acceptance' : 'accepted',
                },
            };

            dispatch(SIUHIAnalysisJobUpdated(updatedJobData));
        } catch (error) {
            console.error(
                `Error checking cost for SIUHI analysis job ${job.jobId}:`,
                error
            );

            dispatch(
                SIUHIAnalysisJobUpdated({
                    ...job,
                    status: 'failed',
                    errorMessage: 'Error checking job cost',
                })
            );
        }
    };

    useEffect(() => {
        clearInterval(intervalIdRef.current);

        if (shouldCheckCredits === false) {
            console.log('No need to check credits for job:', job);
            return;
        }

        intervalIdRef.current = setInterval(() => {
            checkJobCost(job);
        }, 15 * 1000); // 15 seconds

        return () => clearInterval(intervalIdRef.current); // Cleanup interval on unmount
    }, [shouldCheckCredits]);
};
