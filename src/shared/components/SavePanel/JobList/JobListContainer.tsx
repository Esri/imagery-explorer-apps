import React from 'react';
import { JobList } from './JobList';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSaveJobs } from '@shared/store/SaveJobs/selectors';
import { removeSaveJob } from '@shared/store/SaveJobs/thunks';

export const JobListContainer = () => {
    const jobs = useSelector(selectAllSaveJobs);

    const dispatch = useDispatch();

    return (
        <div className="w-full mt-16">
            <div className="mb-6 pb-1 border-b border-custom-light-blue-25">
                <div className="uppercase text-lg">Pending Jobs</div>
            </div>

            <JobList
                data={jobs}
                deleteButtonOnClick={(uniqueId) => {
                    dispatch(removeSaveJob(uniqueId));
                }}
            />
        </div>
    );
};
