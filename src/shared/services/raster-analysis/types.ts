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

export type RasterAnalysisRasterFunction = {
    name: string;
    description: string;
    function: {
        type: string;
        pixelType: string;
        name: string;
        description: string;
    };
    arguments: {
        Raster: any;
        [key: string]: any;
    };
    [key: string]: any;
};

export type RasterAnalysisTaskName =
    | 'GenerateRaster'
    | 'DownloadRaster'
    | 'EstimateRasterAnalysisCost';
