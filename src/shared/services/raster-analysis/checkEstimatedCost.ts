import { getToken } from '@shared/utils/esri-oauth';
import { RASTER_ANALYSIS_SERVER_ROOT_URL } from './config';
import { checkRasterAnalysisJobStatus } from './checkJobStatus';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';
import { RasterAnalysisRasterFunction } from './types';

type EstimateRasterAnalysisCostOutCostResponse = {
    dataType: string;
    paramName: string;
    value: {
        credits: number;
        function: any[];
    };
};

type getEstimateRasterAnalysisCostResponse = {
    credits: number;
    succeeded: boolean;
};

const jobIdByRasterFunction = new Map<any, string>();

/**
 * Retrieves an estimate of the cost to perform a raster analysis using the provided raster function.
 *
 * @param {RasterAnalysisRasterFunction} rasterFunction - The raster function to estimate the cost for.
 * @returns {Promise<getEstimateRasterAnalysisCostResponse>} - A promise resolving to an object containing the estimated credits and success status.
 * @throws Will throw an error if the job fails, times out, or is otherwise unsuccessful.
 */
export const getEstimateRasterAnalysisCost = async (
    rasterFunction: RasterAnalysisRasterFunction
): Promise<getEstimateRasterAnalysisCostResponse> => {
    let jobId = jobIdByRasterFunction.get(rasterFunction);

    if (!jobId) {
        jobId = await submitJob(rasterFunction);
        jobIdByRasterFunction.set(rasterFunction, jobId);
    }

    const jobStatusRes = await checkRasterAnalysisJobStatus(
        jobId,
        'EstimateRasterAnalysisCost'
    );

    if (jobStatusRes.jobStatus === PublishAndDownloadJobStatus.Succeeded) {
        const outCost = await getOutCost(jobId);
        return {
            credits: outCost.value.credits,
            succeeded: true,
        };
    }

    if (
        jobStatusRes.jobStatus === PublishAndDownloadJobStatus.Failed ||
        jobStatusRes.jobStatus === PublishAndDownloadJobStatus.Cancelled ||
        jobStatusRes.jobStatus === PublishAndDownloadJobStatus.TimedOut ||
        jobStatusRes.jobStatus === PublishAndDownloadJobStatus.Expired
    ) {
        throw new Error('Failed to estimate cost');
    }

    return {
        credits: 0,
        succeeded: false,
    };
};

/**
 * Fetches the output cost details of a raster analysis job.
 *
 * @param {string} jobId - The job ID of the raster analysis.
 * @returns {Promise<EstimateRasterAnalysisCostOutCostResponse>} - A promise resolving to the cost response object.
 * @throws Will throw an error if the fetch operation fails or returns an error.
 */
const getOutCost = async (
    jobId: string
): Promise<EstimateRasterAnalysisCostOutCostResponse> => {
    const requestURL =
        RASTER_ANALYSIS_SERVER_ROOT_URL +
        `/EstimateRasterAnalysisCost/jobs/${jobId}/results/outCost?f=json&returnType=data&token=${getToken()}`;

    const res = await fetch(requestURL);

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    return data;
};

/**
 * Submits a job to estimate the cost of running a raster function.
 *
 * @param {any} rasterFunction - The raster function to be processed.
 * @returns {Promise<string>} - A promise resolving to the job ID.
 * @throws Will throw an error if the job submission fails.
 */
const submitJob = async (
    rasterFunction: RasterAnalysisRasterFunction
): Promise<string> => {
    const token = getToken();

    const params = new URLSearchParams({
        f: 'json',
        inputAnalysisTask: JSON.stringify({
            name: 'GenerateRaster',
            parameters: {
                rasterFunction,
            },
            outputName: {
                serviceProperties: {
                    name: 'temp-layer',
                    capabilities: 'Image, TilesOnly',
                },
                itemProperties: {
                    description:
                        'Output generated from running Clip raster function template',
                    snippet:
                        'Output generated from running Clip raster function template',
                    folderId: '',
                },
            },
        }),
        token,
    });

    const requestURL =
        RASTER_ANALYSIS_SERVER_ROOT_URL +
        '/EstimateRasterAnalysisCost/submitJob';

    const res = await fetch(requestURL, {
        method: 'POST',
        body: params,
    });

    const data = await res.json();

    if (data.error) {
        throw data.error;
    }

    if (!data.jobId) {
        throw new Error('Failed to create job for estimating cost');
    }

    return data.jobId;
};
