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
            <div
                className="grid items-center mb-6 pb-1 border-b border-custom-light-blue-25"
                style={{ gridTemplateColumns: '1fr 150px 60px' }}
            >
                <div className="uppercase text-lg">Pending Jobs</div>
                <div className="text-sm opacity-50">Status</div>
                <div
                    className="text-sm opacity-50 cursor-pointer underline"
                    title="Remove all pending jobs"
                >
                    Clear All
                </div>
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
