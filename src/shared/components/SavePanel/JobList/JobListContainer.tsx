import React from 'react';
import { JobList } from './JobList';
import { useSelector } from 'react-redux';
import { selectAllRasterAnalysisJobs } from '@shared/store/RasterAnalysisJobs/selectors';

export const JobListContainer = () => {
    const jobs = useSelector(selectAllRasterAnalysisJobs);

    return (
        <div className="w-full mt-4">
            <div className="mb-2">Pending Jobs</div>

            <JobList data={jobs} />
        </div>
    );
};
