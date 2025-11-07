import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
import { selectPendingSIUHIAnalysisJob } from '@shared/store/UrbanHeatIslandTool/selectors';
import React from 'react';
import { SubJobCard } from '../JobCard/SubJobCard';
import { JobCard } from '../JobCard/JobCard';
import { useCheckSIUHIAnalysisJobCredits } from './useCheckCredits';
import {
    SIUHIAnalysisJobUpdated,
    SIUHIAnalysisJobRemoved,
} from '@shared/store/UrbanHeatIslandTool/reducer';
import { useRunDataAggregationJob } from './useRunDataAggregationJob';

export const PendingJobContainer = () => {
    const dispatch = useAppDispatch();

    const pendingJob = useAppSelector(selectPendingSIUHIAnalysisJob);

    // this hook will check credits when the pending job is initiated
    useCheckSIUHIAnalysisJobCredits(pendingJob);

    // this hook will manage data aggregation job after credits are accepted
    useRunDataAggregationJob(pendingJob);

    const getContent = () => {
        if (!pendingJob) {
            return (
                <div className="opacity-50 text-center w-full text-sm">
                    No pending job found.
                </div>
            );
        }

        return (
            <div className="grid grid-cols-4 gap-4">
                <JobCard
                    jobData={pendingJob}
                    acceptCreditsButtonOnClick={() => {
                        dispatch(
                            SIUHIAnalysisJobUpdated({
                                ...pendingJob,
                                jobCost: {
                                    ...pendingJob.jobCost,
                                    status: 'accepted',
                                },
                            })
                        );
                    }}
                    rejectCreditsButtonOnClick={() => {
                        dispatch(
                            SIUHIAnalysisJobUpdated({
                                ...pendingJob,
                                jobCost: {
                                    ...pendingJob.jobCost,
                                    status: 'rejected',
                                },
                                status: 'failed',
                            })
                        );
                    }}
                    removeJobButtonOnClick={() => {
                        dispatch(SIUHIAnalysisJobRemoved(pendingJob.jobId));
                    }}
                />

                <SubJobCard
                    subJobData={pendingJob.subJobs.dataAggregation}
                    title="Step 1: Data Aggregation"
                />
                <SubJobCard
                    subJobData={pendingJob.subJobs.zonalMean}
                    title="Step 2: Zonal Mean"
                />
                <SubJobCard
                    subJobData={pendingJob.subJobs.surfaceHeatIndexCalculation}
                    title="Step 3: Surface Heat Index"
                />
            </div>
        );
    };

    return <div className="w-full">{getContent()}</div>;
};
