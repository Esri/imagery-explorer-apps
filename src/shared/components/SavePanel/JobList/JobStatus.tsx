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
    /**
     * Emits when the accept credits button is clicked.
     * @returns
     */
    acceptCreditsButtonOnClick: (job: PublishAndDownloadJob) => void;
    /**
     * Emits when the cancel button is clicked.
     * @returns
     */
    cancelButtonOnClick: (job: PublishAndDownloadJob) => void;
};

const CustomCalciteButtonStyles = {
    '--calcite-color-brand': 'var(--calcite-color-green-060)',
    '--calcite-color-brand-hover': 'var(--calcite-color-green-070)',
} as CSSProperties;

export const JobStatus: FC<JobStatusProps> = ({
    job,
    acceptCreditsButtonOnClick,
    cancelButtonOnClick,
}) => {
    const statusLabel = saveJobStatusLabels[job.status];

    if (
        job.status ===
        PublishAndDownloadJobStatus.PendingUserApprovalForActualCost
    ) {
        return (
            <div>
                <div className="mb-1">required credits: {job.actualCost}</div>

                <div
                    className="flex items-center"
                    style={CustomCalciteButtonStyles}
                >
                    <div className="mr-2">
                        <span
                            className="underline cursor-pointer"
                            onClick={() => {
                                // dispatch(updatePublishAndDownloadJob({ ...job, status: PublishAndDownloadJobStatus.ToBeSubmitted }));
                                cancelButtonOnClick(job);
                            }}
                        >
                            Cancel
                        </span>
                    </div>

                    <calcite-button
                        scale="s"
                        width="half"
                        // icon-start="check"
                        onClick={() => {
                            // dispatch(updatePublishAndDownloadJob({ ...job, status: PublishAndDownloadJobStatus.ToBeSubmitted }));
                            acceptCreditsButtonOnClick(job);
                        }}
                    >
                        Accept
                    </calcite-button>
                </div>
            </div>
        );
    }

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
        <div style={CustomCalciteButtonStyles}>
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
