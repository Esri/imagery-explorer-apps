import {
    SaveJob,
    SaveJobStatus,
    SaveJobType,
} from '@shared/store/SaveJobs/reducer';
import React, { CSSProperties, FC } from 'react';
import { saveJobStatusLabels } from '../constants';

type JobStatusProps = {
    job: SaveJob;
};

export const JobStatus: FC<JobStatusProps> = ({ job }) => {
    const statusLabel = saveJobStatusLabels[job.status];

    if (job.status !== SaveJobStatus.Succeeded) {
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
                    job.type === SaveJobType.DownloadIndexMask
                        ? 'download-to'
                        : 'launch'
                }
            >
                {job.type === SaveJobType.DownloadIndexMask
                    ? 'Download'
                    : 'Open'}
            </calcite-button>
        </div>
    );
};
