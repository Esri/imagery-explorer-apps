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

import { getPublishAndDownloadJobsFromIndexedDB } from '@shared/utils/indexedDB/publishAndDownloadJobs';
import {
    initialPublishAndDownloadJobsState,
    PublishAndDownloadJobsState,
} from './reducer';
import { getSignedInUser } from '@shared/utils/esri-oauth';

/**
 * get preloaded state for publish and download jobs state
 * @returns
 */
export const getPreloadedState4PublishAndDownloadJobs =
    async (): Promise<PublishAndDownloadJobsState> => {
        try {
            const user = getSignedInUser();

            if (!user) {
                throw new Error('User not signed in');
            }

            const jobs = await getPublishAndDownloadJobsFromIndexedDB(
                user.username
            );
            // console.log('pending publish and save jobs', jobs);

            if (!jobs || jobs.length === 0) {
                return {
                    ...initialPublishAndDownloadJobsState,
                };
            }

            return {
                jobs: {
                    byId: jobs.reduce((acc, job) => {
                        acc[job.id] = job;
                        return acc;
                    }, {} as PublishAndDownloadJobsState['jobs']['byId']),
                    allIds: jobs.map((job) => job.id),
                },
            };
        } catch (error) {
            console.error('Error fetching jobs from IndexedDB', error);
            return {
                ...initialPublishAndDownloadJobsState,
            };
        }
    };
