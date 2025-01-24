import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { FC, useMemo } from 'react';
import { jobTypeLabels } from '../constants';

type JobInfoProps = {
    job: PublishAndDownloadJob;
};

export const JobInfo: FC<JobInfoProps> = ({ job }) => {
    const jobTypeLabel = jobTypeLabels[job.type];

    const extraJobInfo = useMemo(() => {
        if (job.errormessage) {
            return job.errormessage;
        }

        if (
            job.type === PublishAndDownloadJobType.SaveWebMappingApp ||
            job.type ===
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenes ||
            job.type ===
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
        ) {
            return null;
        }

        return job.sceneId || 'No selected scene';
    }, [job]);

    if (
        job.status === PublishAndDownloadJobStatus.Submitted &&
        job.publishToHostedImageryService &&
        job.outputItemId === undefined
    ) {
        return (
            <p>
                Submitting the raster analysis job. Please do not close the
                browser tab.
            </p>
        );
    }

    return (
        <div className=" ">
            <div className="">{jobTypeLabel}</div>

            {extraJobInfo && (
                <div className=" italic break-words max-w-[480px]">
                    <span>{extraJobInfo}</span>
                </div>
            )}
        </div>
    );
};
