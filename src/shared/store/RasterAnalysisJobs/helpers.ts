import { APP_NAME } from '@shared/config';
import { RasterAnalysisJob, RasterAnalysisJobType } from './reducer';
import { getSignedInUser } from '@shared/utils/esri-oauth';
import { RasterAnalysisTaskName } from '@shared/services/raster-analysis/checkJobStatus';

/**
 * Creates a new raster analysis job with the provided parameters.
 *
 * @param {Object} params - The parameters for creating the raster analysis job.
 * - `{string} jobId` - The optional ID of the job.
 * - `{RasterAnalysisJobType} jobType` - The type of the raster analysis job.
 * - `{string} sceneId` - The ID of the scene associated with the job.
 * @returns {RasterAnalysisJob} The newly created raster analysis job.
 */
export const createNewRasterAnalysisJob = ({
    jobId,
    jobType,
    taskName,
    sceneId,
}: {
    jobId?: string;
    jobType: RasterAnalysisJobType;
    taskName: RasterAnalysisTaskName;
    sceneId: string;
}): RasterAnalysisJob => {
    const user = getSignedInUser();

    return {
        jobId,
        jobType,
        status: 'esriJobSubmitted',
        taskName,
        creator: user?.username || 'anonymous',
        createdAt: Date.now(),
        sceneId,
        appName: APP_NAME,
        output: null,
    };
};
