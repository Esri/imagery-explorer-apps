import React from 'react';
import { JobList } from './JobList';
import { useSelector } from 'react-redux';
import { selectAllRasterAnalysisJobs } from '@shared/store/RasterAnalysisJobs/selectors';

export const JobListContainer = () => {
    const jobs = useSelector(selectAllRasterAnalysisJobs);

    return (
        <div className="w-full mt-16">
            <div className="mb-6 pb-1 border-b border-custom-light-blue-25">
                <div className="uppercase text-lg">Pending Jobs</div>
            </div>

            <JobList data={jobs} />
        </div>
    );
};
