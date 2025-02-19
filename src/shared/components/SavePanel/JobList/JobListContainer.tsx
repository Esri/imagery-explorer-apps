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
