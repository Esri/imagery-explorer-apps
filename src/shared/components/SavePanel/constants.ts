import {
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';

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
    /**
     * If true, the output name must be unique.
     */
    requireUniqueOutputName: boolean;
};

const ProfessionalPlusUserTypeLink = `<a class="underline" href="https://www.esri.com/en-us/arcgis/products/user-types/explore/professional" target="_blank">Professional or above User Type</a>`;
const PublisherRoleLink = `<a class="underline" href="https://doc.arcgis.com/en/arcgis-online/administer/member-roles.htm" target="_blank">Publisher role</a>`;

/**
 * A lookup object that maps save options to their corresponding information.
 * Each save option is associated with an object containing a title, subtitle, and description.
 *
 * @type {Record<SaveOption, { title: string; outputName: string; description: string }>}
 */
export const saveOptionInfoLookup: Record<
    PublishAndDownloadJobType,
    SaveOptionInfo
> = {
    [PublishAndDownloadJobType.PublishScene]: {
        action: 'Publish',
        inputName: 'Scene',
        requireUniqueOutputName: true,
        outputName: 'Hosted Imagery',
        description: `Publish a hosted imagery layer of the selected scene. This action requires a ${ProfessionalPlusUserTypeLink} and a ${PublisherRoleLink} or higher.`,
    },
    [PublishAndDownloadJobType.PublishIndexMask]: {
        action: 'Publish',
        inputName: 'Index mask',
        requireUniqueOutputName: true,
        outputName: 'Hosted Imagery',
        description: `Publish a hosted imagery layer of the current index mask. This action requires a ${ProfessionalPlusUserTypeLink} and a ${PublisherRoleLink} or higher.`,
    },
    [PublishAndDownloadJobType.PublishChangeDetection]: {
        action: 'Publish',
        inputName: 'Change Detection',
        requireUniqueOutputName: true,
        outputName: 'Hosted Imagery',
        description: `Publish a hosted imagery layer of the current change detection output. This action requires a ${ProfessionalPlusUserTypeLink} and a ${PublisherRoleLink} or higher.`,
    },
    [PublishAndDownloadJobType.SaveWebMappingApp]: {
        action: 'Publish',
        inputName: 'Current State',
        requireUniqueOutputName: false,
        outputName: 'Web Application',
        description:
            'Create an instance of this application in its current state as an ArcGIS Online web application.',
    },
    [PublishAndDownloadJobType.SaveWebMap]: {
        action: 'Publish',
        inputName: 'Scene',
        requireUniqueOutputName: false,
        outputName: 'ArcGIS Online Map',
        description:
            'Create an ArcGIS Online map containing the selected scene as a layer.',
    },
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: {
        action: 'Publish',
        inputName: 'Scenes',
        requireUniqueOutputName: false,
        outputName: 'Multiple Layers Map',
        description:
            'Create an ArcGIS Online map with individual layers per scene.',
    },
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: {
        action: 'Publish',
        inputName: 'Scenes',
        requireUniqueOutputName: false,
        outputName: 'Single Layer Map',
        description:
            'Create an ArcGIS Online map with a single layer with multiple scenes.',
    },
};

export const saveJobStatusLabels: Record<PublishAndDownloadJobStatus, string> =
    {
        [PublishAndDownloadJobStatus.PendingCheckingCost]:
            'Checking credit usage',
        // [PublishAndDownloadJobStatus.CheckingCost]: 'Checking credit usage',
        [PublishAndDownloadJobStatus.PendingUserApprovalForActualCost]:
            'Pending User Approval',
        [PublishAndDownloadJobStatus.Submitted]: 'Pending',
        [PublishAndDownloadJobStatus.New]: 'In Progress',
        [PublishAndDownloadJobStatus.Executing]: 'In Progress',
        [PublishAndDownloadJobStatus.Cancelled]: 'Cancelled',
        [PublishAndDownloadJobStatus.Cancelling]: 'Cancelled',
        [PublishAndDownloadJobStatus.Failed]: 'Failed',
        [PublishAndDownloadJobStatus.Succeeded]: 'Succeeded',
        [PublishAndDownloadJobStatus.TimedOut]: 'Timed Out',
        [PublishAndDownloadJobStatus.Waiting]: 'Timed Out',
        [PublishAndDownloadJobStatus.Expired]: 'Expired',
    };

export const jobTypeLabels: Record<PublishAndDownloadJobType, string> = {
    [PublishAndDownloadJobType.PublishScene]: 'Scene as Hosted Imagery',
    [PublishAndDownloadJobType.PublishIndexMask]:
        'Index Mask as Hosted Imagery',
    [PublishAndDownloadJobType.PublishChangeDetection]:
        'Change Detection as Hosted Imagery',
    // [PublishAndDownloadJobType.DownloadIndexMask]: 'Index Mask as GeoTIFF',
    [PublishAndDownloadJobType.SaveWebMappingApp]:
        'Current State as Web Application',
    [PublishAndDownloadJobType.SaveWebMap]: 'Scene as ArcGIS Online Web Map',
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]:
        'Scenes as ArcGIS Online Web Map',
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]:
        'Scenes as ArcGIS Online Web Map',
};

/**
 * This is the template for the item description when saving current state as a web mapping app.
 */
export const ITEM_DESCRIPTION_TEMPLATE_4_WEB_APP =
    '<i>This Web Mapping Application item provides a saved "view" or state of the {{APP_NAME}} app. These items can be used to save and share exactly what you were seeing in the app. From visualizations, like swipe and animate, to analysis results such as change detection. Fill in your own description here if you wish to persist and/or share this item with others. Common use cases include saving and sharing current events.</i>';
