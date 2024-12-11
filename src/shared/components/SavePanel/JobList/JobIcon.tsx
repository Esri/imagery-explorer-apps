import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { FC, useMemo } from 'react';
import { jobTypeLabels } from '../constants';

type JobStatusProps = {
    job: PublishAndDownloadJob;
};

export const JobIcon: FC<JobStatusProps> = ({ job }) => {
    const content = useMemo(() => {
        if (job.status === PublishAndDownloadJobStatus.Succeeded) {
            return <calcite-icon icon="check" scale="s" />;
        }

        if (job.status === PublishAndDownloadJobStatus.Failed) {
            return <calcite-icon icon="exclamation-mark-circle" scale="s" />;
        }

        return <calcite-loader inline active />;
    }, [job]);

    return <div className="flex justify-center items-center">{content}</div>;
};
