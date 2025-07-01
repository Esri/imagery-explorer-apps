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
    // PublishAndDownloadJobStatus,
    // PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { FC, useMemo } from 'react';
import { JobStatus } from './JobStatus';
import { JobInfo } from './JobInfo';
import { JobIcon } from './JobIcon';
import { useTranslation } from 'react-i18next';

type JobListProps = {
    /**
     * List of save jobs to be displayed in the job list.
     */
    data: PublishAndDownloadJob[];
    /**
     * Emits when the delete button is clicked.
     * @param jobId unique ID of the job to be deleted.
     * @returns
     */
    deleteButtonOnClick: (jobId: string) => void;
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

export const JobList: FC<JobListProps> = ({
    data,
    deleteButtonOnClick,
    acceptCreditsButtonOnClick,
    cancelButtonOnClick,
}) => {
    const { t } = useTranslation();

    /**
     * Sort the jobs by creation time in descending order.
     */
    const sortedByCreationTime = useMemo(() => {
        return data.sort((a, b) => b.createdAt - a.createdAt);
    }, [data]);

    if (!data.length) {
        return (
            <div
                className="text-center w-full opacity-50"
                data-testid="no-pending-jobs"
            >
                {t('no_pending_jobs')}
            </div>
        );
    }

    return (
        <div>
            {sortedByCreationTime.map((job, index) => {
                return (
                    <div
                        key={job.id}
                        data-testid={`job-list-item-${index}`}
                        data-job-status={job.status}
                        data-job-type={job.type}
                        className="w-full grid gap-1 items-center text-custom-light-blue text-sm my-4"
                        style={{ gridTemplateColumns: '50px 1fr 150px 60px' }}
                    >
                        <JobIcon job={job} />

                        <JobInfo job={job} />

                        {/* <div className="text-center">{statusLabel}</div> */}
                        <JobStatus
                            job={job}
                            acceptCreditsButtonOnClick={
                                acceptCreditsButtonOnClick
                            }
                            cancelButtonOnClick={cancelButtonOnClick}
                        />

                        <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={() => deleteButtonOnClick(job.id)}
                        >
                            <calcite-icon icon="x" scale="s" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
