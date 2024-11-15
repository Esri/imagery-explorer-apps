export enum RasterAnalysisJobStatus {
    Submitted = 'esriJobSubmitted',
    New = 'esriJobNew',
    Waiting = 'esriJobWaiting',
    Executing = 'esriJobExecuting',
    Succeeded = 'esriJobSucceeded',
    Failed = 'esriJobFailed',
    TimedOut = 'esriJobTimedOut',
    Cancelling = 'esriJobCancelling',
    Cancelled = 'esriJobCancelled',
}

export type RasterAnalysisJobOutput = {
    jobId: string;
    jobStatus: RasterAnalysisJobStatus;
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
