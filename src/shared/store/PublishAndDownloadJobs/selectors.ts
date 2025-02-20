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

import { createSelector } from '@reduxjs/toolkit';
import { RootState } from '../configureStore';
import { PublishAndDownloadJobStatus } from './reducer';

export const selectAllSaveJobs = createSelector(
    (state: RootState) => state.PublishAndDownloadJobs.jobs.byId,
    (state: RootState) => state.PublishAndDownloadJobs.jobs.allIds,
    (byId, allIds) => allIds.map((id) => byId[id])
);

export const selectRasterAnalysisJobsPendingCheckingCost = createSelector(
    (state: RootState) => state.PublishAndDownloadJobs.jobs.byId,
    (state: RootState) => state.PublishAndDownloadJobs.jobs.allIds,
    (byId, allIds) => {
        const allJobs = allIds.map((id) => byId[id]);

        return allJobs.filter((job) => {
            const status = job.status;

            return (
                job.publishToHostedImageryService === true &&
                status === PublishAndDownloadJobStatus.PendingCheckingCost
            );
        });
    }
);

export const selectPendingRasterAnalysisJobs = createSelector(
    (state: RootState) => state.PublishAndDownloadJobs.jobs.byId,
    (state: RootState) => state.PublishAndDownloadJobs.jobs.allIds,
    (byId, allIds) => {
        const allJobs = allIds.map((id) => byId[id]);

        const rasterAnanlysisJobs = allJobs.filter(
            (job) => job.rasterAnanlysisJobId !== undefined
        );

        return rasterAnanlysisJobs.filter((job) => {
            const status = job.status;
            return (
                status !== PublishAndDownloadJobStatus.Succeeded &&
                status !== PublishAndDownloadJobStatus.Failed &&
                status !== PublishAndDownloadJobStatus.Cancelled &&
                status !== PublishAndDownloadJobStatus.TimedOut
            );
        });
    }
);

export const selectFinishedRasterAnalysisJobs = createSelector(
    (state: RootState) => state.PublishAndDownloadJobs.jobs.byId,
    (state: RootState) => state.PublishAndDownloadJobs.jobs.allIds,
    (byId, allIds) => {
        const allJobs = allIds.map((id) => byId[id]);

        const rasterAnanlysisJobs = allJobs.filter(
            (job) => job.rasterAnanlysisJobId !== undefined
        );

        return rasterAnanlysisJobs.filter((job) => {
            const status = job.status;
            return (
                status === PublishAndDownloadJobStatus.Succeeded ||
                status === PublishAndDownloadJobStatus.Failed ||
                status === PublishAndDownloadJobStatus.Cancelled ||
                status === PublishAndDownloadJobStatus.TimedOut ||
                status === PublishAndDownloadJobStatus.Expired
            );
        });
    }
);
