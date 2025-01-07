import { getToken } from '@shared/utils/esri-oauth';
import { RASTER_ANALYSIS_SERVER_ROOT_URL } from './config';
import { checkRasterAnalysisJobStatus } from './checkJobStatus';
import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';

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

export const getEstimateRasterAnalysisCost = async (
    rasterFunction: any
): Promise<getEstimateRasterAnalysisCostResponse> => {
    const jobId = jobIdByRasterFunction.get(rasterFunction);

    if (!jobId) {
        const newJobId = await submitJob(rasterFunction);
        jobIdByRasterFunction.set(rasterFunction, newJobId);
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
 * Submit a job to estimate the cost of running a raster function
 * @param rasterFunction
 * @returns
 */
const submitJob = async (rasterFunction: any): Promise<string> => {
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
