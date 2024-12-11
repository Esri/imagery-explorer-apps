import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { CSSProperties, FC } from 'react';
import { saveJobStatusLabels } from '../constants';
import { getItemUrl } from '@shared/utils/esri-oauth';

type JobStatusProps = {
    job: PublishAndDownloadJob;
};

export const JobStatus: FC<JobStatusProps> = ({ job }) => {
    const statusLabel = saveJobStatusLabels[job.status];

    if (job.status !== PublishAndDownloadJobStatus.Succeeded) {
        return (
            <div className="">
                <span>{statusLabel}</span>
            </div>
        );
    }

    return (
        <div
            style={
                {
                    '--calcite-color-brand': 'var(--calcite-color-green-060)',
                    '--calcite-color-brand-hover':
                        'var(--calcite-color-green-070)',
                } as CSSProperties
            }
        >
            <calcite-button
                // scale="s"
                width="full"
                icon-start={
                    job.type === PublishAndDownloadJobType.DownloadIndexMask
                        ? 'download-to'
                        : 'launch'
                }
                href={
                    job.type === PublishAndDownloadJobType.DownloadIndexMask
                        ? job.outputURL
                        : getItemUrl(job.outputItemId)
                }
                target="_blank"
            >
                {job.type === PublishAndDownloadJobType.DownloadIndexMask
                    ? 'Download'
                    : 'Open'}
            </calcite-button>
        </div>
    );
};
