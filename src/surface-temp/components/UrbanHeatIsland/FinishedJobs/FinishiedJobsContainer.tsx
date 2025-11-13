import { APP_NAME } from '@shared/config';
import { useAppSelector } from '@shared/store/configureStore';
import { selectFinishedSIUHIAnalysisJobs } from '@shared/store/UrbanHeatIslandTool/selectors';
import React from 'react';
import { useTranslation } from 'react-i18next';
import { JobCard } from '../JobCard/JobCard';

export const FinishiedJobsContainer = () => {
    const { t } = useTranslation();

    const finishedJobs = useAppSelector(selectFinishedSIUHIAnalysisJobs);

    if (finishedJobs.length === 0) {
        return (
            <div className="opacity-50 text-center w-full text-sm">
                {t('no_finished_jobs', { ns: APP_NAME })}
            </div>
        );
    }

    return (
        <div className="flex gap-1">
            {finishedJobs.map((job) => {
                return (
                    <JobCard
                        key={job.jobId}
                        jobData={job}
                        removeJobButtonOnClick={() => {
                            // no-op for finished jobs
                        }}
                    />
                );
            })}
        </div>
    );
};
