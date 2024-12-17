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
        let progress = job.progress || 0;

        // Limit progress to 99% to avoid showing 100% before the job is done
        // The GP Job will return 100% when it is still processing which might be confusing
        progress = Math.min(progress, 99);

        // only show progress if the job is executing
        const progressInfo =
            job.status === PublishAndDownloadJobStatus.Executing
                ? `(${progress}%)`
                : '';

        return (
            <div className="">
                <span>
                    {statusLabel} {progressInfo}
                </span>
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
