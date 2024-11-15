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
