import { RasterAnalysisJob } from '@shared/store/RasterAnalysisJobs/reducer';
import { da } from 'date-fns/locale';
import React, { FC } from 'react';

type JobListProps = {
    /**
     * List of raster analysis jobs to be displayed in the job list.
     */
    data: RasterAnalysisJob[];
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
                        key={job.jobId}
                        className="flex justify-between items-center my-2"
                    >
                        <div className="grid grid-cols-3 text-custom-light-blue">
                            <div className="">{job.status}</div>
                            <div className="">{job.jobType}</div>
                            <div className="">{job.sceneId}</div>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
