import React, { FC } from 'react';
import { JobList } from './JobList';
import { useAppSelector } from '@shared/store/configureStore';
import { selectAllSaveJobs } from '@shared/store/PublishAndDownloadJobs/selectors';
import {
    clearAllPublishAndDownloadJobs,
    removePublishAndDownloadJob,
    submitRasterAnalysisJob,
    updatePublishAndDownloadJob,
} from '@shared/store/PublishAndDownloadJobs/thunks';
import {
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { useAppDispatch } from '@shared/store/configureStore';

type Props = {
    /**
     * Emit when user click the accept credits button
     * @param job
     * @returns
     */
    publishJobSubmitHandler: (job: PublishAndDownloadJob) => void;
};

export const JobListContainer: FC<Props> = ({ publishJobSubmitHandler }) => {
    const jobs = useAppSelector(selectAllSaveJobs);

    const dispatch = useAppDispatch();

    return (
        <div className="w-full mt-16">
            <div
                className="grid items-center mb-6 pb-1 border-b border-custom-light-blue-25"
                style={{ gridTemplateColumns: '1fr 150px 60px' }}
            >
                <div className="uppercase text-lg">Task History</div>
                <div className="text-sm opacity-50">Status</div>
                <div
                    className="text-sm opacity-50 cursor-pointer underline"
                    title="Remove all pending jobs"
                    onClick={() => {
                        dispatch(clearAllPublishAndDownloadJobs());
                    }}
                >
                    Clear All
                </div>
            </div>

            <JobList
                data={jobs}
                deleteButtonOnClick={(uniqueId) => {
                    dispatch(removePublishAndDownloadJob(uniqueId));
                }}
                acceptCreditsButtonOnClick={(job) => {
                    // dispatch(submitRasterAnalysisJob(job));
                    publishJobSubmitHandler(job);
                }}
                cancelButtonOnClick={(job) => {
                    dispatch(removePublishAndDownloadJob(job.id));
                }}
            />
        </div>
    );
};
