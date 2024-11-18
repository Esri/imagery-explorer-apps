import {
    SaveJob,
    SaveJobStatus,
    SaveJobType,
} from '@shared/store/SaveJobs/reducer';
import { da } from 'date-fns/locale';
import React, { FC, useMemo } from 'react';
import { jobTypeLabels, saveJobStatusLabels } from '../constants';
import { JobStatus } from './JobStatus';
import { JobInfo } from './JobInfo';
import { JobIcon } from './JobIcon';

type JobListProps = {
    /**
     * List of save jobs to be displayed in the job list.
     */
    data: SaveJob[];
    /**
     * Emits when the delete button is clicked.
     * @param jobId unique ID of the job to be deleted.
     * @returns
     */
    deleteButtonOnClick: (jobId: string) => void;
};

export const JobList: FC<JobListProps> = ({ data, deleteButtonOnClick }) => {
    /**
     * Sort the jobs by creation time in descending order.
     */
    const sortedByCreationTime = useMemo(() => {
        return data.sort((a, b) => b.createdAt - a.createdAt);
    }, [data]);

    if (!data.length) {
        return (
            <div className="text-center w-full opacity-50">No pending jobs</div>
        );
    }

    return (
        <div>
            {sortedByCreationTime.map((job) => {
                // const statusLabel = saveJobStatusLabels[job.status];

                return (
                    <div
                        key={job.uniqueId}
                        className="w-full grid gap-1 items-center text-custom-light-blue text-sm my-4"
                        style={{ gridTemplateColumns: '50px 1fr 150px 32px' }}
                    >
                        <JobIcon job={job} />

                        <JobInfo job={job} />

                        {/* <div className="text-center">{statusLabel}</div> */}
                        <JobStatus job={job} />

                        <div
                            className="flex justify-center items-center cursor-pointer"
                            onClick={() => deleteButtonOnClick(job.uniqueId)}
                        >
                            <calcite-icon icon="x" scale="s" />
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
