import { APP_NAME } from '@shared/config';
import { RasterAnalysisJob } from './reducer';
import { getSignedInUser } from '@shared/utils/esri-oauth';
import {
    RasterAnalysisJobStatus,
    RasterAnalysisTaskName,
} from '@shared/services/raster-analysis/checkJobStatus';
import { SaveOption } from '@shared/constants/saveOptions';

/**
 * Generates a new raster analysis job data object with the provided parameters.
 *
 * @param {Object} params - The parameters for generating the raster analysis job data.
 * - `{string} jobId` - The optional ID of the job.
 * - `{RasterAnalysisJobType} jobType` - The type of the raster analysis job.
 * - `{string} sceneId` - The ID of the scene associated with the job.
 * @returns {RasterAnalysisJob} The newly generated raster analysis job data.
 */
export const generateRasterAnalysisJobData = ({
    jobId,
    jobType,
    taskName,
    sceneId,
}: {
    jobId?: string;
    jobType: SaveOption;
    taskName: RasterAnalysisTaskName;
    sceneId: string;
}): RasterAnalysisJob => {
    const user = getSignedInUser();

    return {
        jobId,
        jobType,
        status: RasterAnalysisJobStatus.Submitted,
        taskName,
        creator: user?.username || 'anonymous',
        createdAt: Date.now(),
        sceneId,
        appName: APP_NAME,
        output: null,
    };
};
