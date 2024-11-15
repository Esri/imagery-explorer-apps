import { SaveJob } from '@shared/store/SaveJobs/reducer';
import { da } from 'date-fns/locale';
import React, { FC } from 'react';

type JobListProps = {
    /**
     * List of save jobs to be displayed in the job list.
     */
    data: SaveJob[];
};

export const JobList: FC<JobListProps> = ({ data }) => {
    if (!data.length) {
        return (
            <div className="text-center w-full opacity-50">No pending jobs</div>
        );
    }

    return (
        <div>
            {data.map((job) => {
                return (
                    <div
                        key={job.uniqueId}
                        className="flex justify-between items-center my-2"
                    >
                        <div className="grid grid-cols-3 text-custom-light-blue">
                            <div className="">{job.status}</div>
                            <div className="">{job.type}</div>
                            <div className="">{job.sceneId}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
