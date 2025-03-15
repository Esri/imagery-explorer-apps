/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import {
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';

/**
 * Type definition for information related to save options.
 */
export type SaveOptionInfo = {
    /**
     * The title of the save option, which is used as a label for the button.
     * @example 'Publish Scene as Hosted Imagery'
     */
    title: string;
    /**
     * The action associated with the save option, either 'Publish' or 'Download'.
     * @example 'Publish'
     */
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

// const ProfessionalPlusUserTypeLink = `<a class="underline" href="https://www.esri.com/en-us/arcgis/products/user-types/explore/professional" target="_blank">Professional or above User Type</a>`;
// const PublisherRoleLink = `<a class="underline" href="https://doc.arcgis.com/en/arcgis-online/administer/member-roles.htm" target="_blank">Publisher role</a>`;

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
        title: 'publish_scene_hosted_imagery',
        action: 'Publish',
        inputName: 'scene',
        outputName: 'hosted_imagery',
        // inputName: 'Scene',
        requireUniqueOutputName: true,
        // outputName: 'Hosted Imagery',
        // The description text is moved to the i18n file to support localization,
        // here we just use the key below to get the text
        description: 'publish_scene_description',
        // description: `Publish a hosted imagery layer of the selected scene. This action requires a <a class="underline" href="https://www.esri.com/en-us/arcgis/products/user-types/explore/professional" target="_blank">Professional or above User Type</a> and a <a class="underline" href="https://doc.arcgis.com/en/arcgis-online/administer/member-roles.htm" target="_blank">Publisher role</a> or higher.`,
    },
    [PublishAndDownloadJobType.PublishIndexMask]: {
        title: 'publish_index_mask_hosted_imagery',
        action: 'Publish',
        // inputName: 'Index mask',
        inputName: 'index_mask',
        outputName: 'hosted_imagery',
        requireUniqueOutputName: true,
        // outputName: 'Hosted Imagery',
        description: 'publish_index_mask_description',
        // description: `Publish a hosted imagery layer of the current index mask. This action requires a <a class="underline" href="https://www.esri.com/en-us/arcgis/products/user-types/explore/professional" target="_blank">Professional or above User Type</a> and a <a class="underline" href="https://doc.arcgis.com/en/arcgis-online/administer/member-roles.htm" target="_blank">Publisher role</a> or higher.`,
    },
    [PublishAndDownloadJobType.PublishChangeDetection]: {
        title: 'publish_change_detection_hosted_imagery',
        action: 'Publish',
        // inputName: 'Change Detection',
        inputName: 'change_detection',
        outputName: 'hosted_imagery',
        requireUniqueOutputName: true,
        // outputName: 'Hosted Imagery',
        description: 'publish_change_detection_description',
        // description: `Publish a hosted imagery layer of the current change detection output. This action requires a <a class="underline" href="https://www.esri.com/en-us/arcgis/products/user-types/explore/professional" target="_blank">Professional or above User Type</a> and a <a class="underline" href="https://doc.arcgis.com/en/arcgis-online/administer/member-roles.htm" target="_blank">Publisher role</a> or higher.`,
    },
    [PublishAndDownloadJobType.SaveWebMappingApp]: {
        title: 'publish_current_state_web_app',
        action: 'Publish',
        // inputName: 'Current State',
        inputName: 'current_state',
        outputName: 'web_application',
        requireUniqueOutputName: false,
        // outputName: 'Web Application',
        description: 'publish_web_app_description',
        // description:
        //     'Create an instance of this application in its current state as an ArcGIS Online web application.',
    },
    [PublishAndDownloadJobType.SaveWebMap]: {
        title: 'publish_scene_webmap',
        action: 'Publish',
        // inputName: 'Scene',
        inputName: 'scene',
        outputName: 'arcgis_online_map',
        requireUniqueOutputName: false,
        // outputName: 'ArcGIS Online Map',
        description: 'publish_webmap_description',
        // description:
        //     'Create an ArcGIS Online map containing the selected scene as a layer.',
    },
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: {
        title: 'publish_multi_layers_webmap',
        action: 'Publish',
        // inputName: 'Scenes',
        inputName: 'scenes',
        outputName: 'multi_layers_map',
        requireUniqueOutputName: false,
        // outputName: 'Multiple Layers Map',
        description: 'publish_multi_layers_webmap_description',
        // description:
        //     'Create an ArcGIS Online map with individual layers per scene.',
    },
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: {
        title: 'publish_single_layer_webmap',
        action: 'Publish',
        // inputName: 'Scenes',
        inputName: 'scenes',
        outputName: 'single_layer_map',
        requireUniqueOutputName: false,
        // outputName: 'Single Layer Map',
        description: 'publish_single_layer_webmap_description',
        // description:
        //     'Create an ArcGIS Online map with a single layer with multiple scenes.',
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
