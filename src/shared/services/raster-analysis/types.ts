import { SaveJobStatus } from '@shared/store/SaveJobs/reducer';

export type RasterAnalysisJobOutput = {
    jobId: string;
    jobStatus: SaveJobStatus;
    messages: {
        type: string;
        description: string;
    }[];
    results: {
        outputRaster: {
            paramUrl: string;
        };
    };
    progress?: {
        type: string;
        message: string;
        percent: number;
    };
};

export type RasterAnalysisTaskName = 'GenerateRaster' | 'DownloadRaster';
