import { useAppDispatch } from '@shared/store/configureStore';
import { SIUHIAnalysisJob } from '@shared/store/UrbanHeatIslandTool/reducer';
import { startSIUHIAnalysisDataAggregationSubJob } from '@shared/store/UrbanHeatIslandTool/thunks';
import React, { useEffect } from 'react';

export const useRunDataAggregationJob = (job: SIUHIAnalysisJob) => {
    const dispatch = useAppDispatch();

    const { subJobs, status, jobId, jobCost } = job || {};

    const jobStatus = job?.status;

    const { dataAggregation } = subJobs || {};

    const dataAggregationStatus = dataAggregation?.status;

    const jobCostStatus = jobCost?.status;

    useEffect(() => {
        if (
            !jobId ||
            jobStatus !== 'waiting to start' ||
            jobCostStatus !== 'accepted'
        ) {
            console.log(
                'Data aggregation job management: No action needed for job:',
                job
            );
            return;
        }

        if (dataAggregationStatus !== 'waiting to start') {
            console.log(
                'Data aggregation job management: Data aggregation already started for job:',
                job
            );
            return;
        }

        dispatch(startSIUHIAnalysisDataAggregationSubJob());
    }, [jobId, jobStatus, dataAggregationStatus, jobCostStatus]);
};
