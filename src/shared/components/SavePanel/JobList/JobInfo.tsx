import {
    PublishAndDownloadJob,
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

        if (job.type === PublishAndDownloadJobType.SaveWebMappingApp) {
            return null;
        }

        return job.sceneId || 'No selected scene';
    }, [job]);

    if (job.publishToHostedImageryService && job.outputItemId === undefined) {
        return <p>Initiating the publish job. Please do not close the tab.</p>;
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
