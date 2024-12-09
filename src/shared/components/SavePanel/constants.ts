import { SaveJobStatus, SaveJobType } from '@shared/store/SaveJobs/reducer';

/**
 * Type definition for information related to save options.
 */
export type SaveOptionInfo = {
    action: 'Publish' | 'Download';
    /**
     * The name of the input type associated with the save option.
     */
    inputName: string;
    /**
     * The name of the output type associated with the save option.
     */
    outputName: string;
    /**
     * A detailed description of the save option.
     */
    description: string;
};

/**
 * A lookup object that maps save options to their corresponding information.
 * Each save option is associated with an object containing a title, subtitle, and description.
 *
 * @type {Record<SaveOption, { title: string; outputName: string; description: string }>}
 */
export const saveOptionInfoLookup: Record<SaveJobType, SaveOptionInfo> = {
    'Publish Scene': {
        action: 'Publish',
        inputName: 'Scene',
        outputName: 'Hosted Imagery',
        description:
            'Publish a hosted imagery layer of the selected scene. This action requires a Professional Plus User Type and a Publisher role or higher.',
    },
    'Publish Index Mask': {
        action: 'Publish',
        inputName: 'Index mask',
        outputName: 'Hosted Imagery',
        description:
            'Publish a hosted imagery layer of the current index mask. This action requires a Professional Plus User Type and a Publisher role or higher.',
    },
    'Download Index Mask': {
        action: 'Download',
        inputName: 'Index mask',
        outputName: 'GeoTIFF',
        description:
            'Download the current index mask as a black and white image in GeoTIFF format.',
    },
    'Save Web Mapping App': {
        action: 'Publish',
        inputName: 'Current State',
        outputName: 'Web Application',
        description:
            'Create an instance of this application in its current state as an ArcGIS Online web application.',
    },
    'Save Web Map': {
        action: 'Publish',
        inputName: 'Scene',
        outputName: 'ArcGIS Online Map',
        description:
            'Create an ArcGIS Online map containing the selected scene as a layer.',
    },
};

export const saveJobStatusLabels: Record<SaveJobStatus, string> = {
    [SaveJobStatus.Cancelled]: 'Cancelled',
    [SaveJobStatus.Cancelling]: 'Cancelled',
    [SaveJobStatus.Executing]: 'In Progress',
    [SaveJobStatus.Failed]: 'Failed',
    [SaveJobStatus.New]: 'In Progress',
    [SaveJobStatus.Submitted]: 'Pending',
    [SaveJobStatus.Succeeded]: 'Succeeded',
    [SaveJobStatus.TimedOut]: 'Timed Out',
    [SaveJobStatus.Waiting]: 'Timed Out',
    [SaveJobStatus.Expired]: 'Expired',
};

export const jobTypeLabels: Record<SaveJobType, string> = {
    [SaveJobType.PublishScene]: 'Scene as Hosted Imagery',
    [SaveJobType.PublishIndexMask]: 'Index Mask as Hosted Imagery',
    [SaveJobType.DownloadIndexMask]: 'Index Mask as GeoTIFF',
    [SaveJobType.SaveWebMappingApp]: 'Current State as Web Application',
    [SaveJobType.SaveWebMap]: 'Scene as ArcGIS Online Web Map',
};
