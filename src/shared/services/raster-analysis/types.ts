import { PublishAndDownloadJobStatus } from '@shared/store/PublishAndDownloadJobs/reducer';

export type RasterAnalysisJobOutput = {
    jobId: string;
    jobStatus: PublishAndDownloadJobStatus;
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
    outCost?: {
        paramUrl?: string;
    };
};

export type RasterAnalysisTaskName =
    | 'GenerateRaster'
    | 'DownloadRaster'
    | 'EstimateRasterAnalysisCost';
