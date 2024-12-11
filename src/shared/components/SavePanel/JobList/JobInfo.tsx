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

    return (
        <div>
            <div className="">{jobTypeLabel}</div>

            {extraJobInfo && <div className=" italic">{extraJobInfo}</div>}
        </div>
    );
};
