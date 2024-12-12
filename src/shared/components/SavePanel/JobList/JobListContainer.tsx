import React from 'react';
import { JobList } from './JobList';
import { useDispatch, useSelector } from 'react-redux';
import { selectAllSaveJobs } from '@shared/store/PublishAndDownloadJobs/selectors';
import { removePublishAndDownloadJob } from '@shared/store/PublishAndDownloadJobs/thunks';

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
                    dispatch(removePublishAndDownloadJob(uniqueId));
                }}
            />
        </div>
    );
};
