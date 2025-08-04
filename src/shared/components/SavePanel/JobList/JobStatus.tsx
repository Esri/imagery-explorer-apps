/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { CSSProperties, FC } from 'react';
import { saveJobStatusLabels } from '../constants';
import { getItemUrl } from '@shared/utils/esri-oauth';
import { useTranslation } from 'react-i18next';
import { CalciteButton } from '@esri/calcite-components-react';

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
    const { t } = useTranslation();

    const statusLabel = t(saveJobStatusLabels[job.status]);

    if (
        job.status ===
        PublishAndDownloadJobStatus.PendingUserApprovalForActualCost
    ) {
        return (
            <div>
                <div
                    className="mb-1"
                    data-testid="job-cost-info"
                    data-actual-cost={job?.actualCost || undefined}
                >
                    {t('required_credits')}: {job.actualCost}
                </div>

                <div
                    className="flex items-center"
                    style={CustomCalciteButtonStyles}
                >
                    <div className="mr-2">
                        <span
                            className="underline cursor-pointer uppercase"
                            data-testid="reject-credits-button"
                            onClick={() => {
                                // dispatch(updatePublishAndDownloadJob({ ...job, status: PublishAndDownloadJobStatus.ToBeSubmitted }));
                                cancelButtonOnClick(job);
                            }}
                        >
                            {t('cancel')}
                        </span>
                    </div>

                    <CalciteButton
                        scale="s"
                        width="half"
                        // icon-start="check"
                        data-testid="accept-credits-button"
                        onClick={() => {
                            // dispatch(updatePublishAndDownloadJob({ ...job, status: PublishAndDownloadJobStatus.ToBeSubmitted }));
                            acceptCreditsButtonOnClick(job);
                        }}
                    >
                        <span className="uppercase">{t('accept')}</span>
                    </CalciteButton>
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
            <CalciteButton
                // scale="s"
                width="full"
                icon-start={'launch'}
                href={getItemUrl(job.outputItemId)}
                target="_blank"
                data-testid="open-job-output-button"
            >
                {t('open')}
            </CalciteButton>
        </div>
    );
};
