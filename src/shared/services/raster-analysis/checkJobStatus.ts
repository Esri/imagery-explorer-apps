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

import { getToken } from '@shared/utils/esri-oauth';
import { RASTER_ANALYSIS_SERVER_ROOT_URL } from './config';
import { RasterAnalysisJobOutput, RasterAnalysisTaskName } from './types';

/**
 * Checks the status of a raster analysis job by its job ID.
 *
 * @param {string} jobId - The ID of the raster analysis job to check.
 * @returns {Promise<RasterAnalysisJobOutput>} A promise that resolves to the output of the raster analysis job.
 * @throws Will throw an error if the response contains an error.
 *
 * @see https://developers.arcgis.com/rest/services-reference/enterprise/checking-job-status/
 */
export const checkRasterAnalysisJobStatus = async (
    jobId: string,
    taskName: RasterAnalysisTaskName
): Promise<RasterAnalysisJobOutput> => {
    const token = getToken();

    const requestURL =
        RASTER_ANALYSIS_SERVER_ROOT_URL +
        `/${taskName}/jobs/${jobId}?f=json&token=${token}`;
    // console.log('requestURL for checkJobStatus', requestURL)

    const res = await fetch(requestURL);

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return data;
};
