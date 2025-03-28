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
     * A string key used to fetch the localized title of the save option.
     */
    title: string;
    /**
     * The action associated with the save option, either 'Publish' or 'Download'.
     * @example 'Publish'
     */
    action: 'Publish' | 'Download';
    /**
     * A string key used to fetch the localized input name of the save option.
     */
    inputName: string;
    /**
     * A string key used to fetch the localized output name of the save option.
     */
    outputName: string;
    /**
     * A string key used to fetch the localized description of the save option.
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
 * A lookup object that maps `PublishAndDownloadJobType` to `SaveOptionInfo`.
 * This object provides configuration details for different publishing and saving options.
 *
 * Each key in the object corresponds to a specific job type and contains the following properties:
 *
 * - `title`: A string key used to fetch the localized title of the save option.
 * - `action`: The action to be performed, typically 'Publish'.
 * - `inputName`: The name of the input data for the save option.
 * - `outputName`: The name of the output data for the save option.
 * - `requireUniqueOutputName`: A boolean indicating whether the output name must be unique.
 * - `description`: A string key used to fetch the localized description text for the save option.
 *
 * The descriptions are stored in an i18n file to support localization.
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

/**
 * Lookup object that maps job status to the string key of their corresponding labels in the i18n file.
 */
export const saveJobStatusLabels: Record<PublishAndDownloadJobStatus, string> =
    {
        [PublishAndDownloadJobStatus.PendingCheckingCost]:
            'job_status_pending_checking_cost',
        // 'Checking credit usage',
        // [PublishAndDownloadJobStatus.CheckingCost]: 'Checking credit usage',
        [PublishAndDownloadJobStatus.PendingUserApprovalForActualCost]:
            'job_status_pending_user_approval',
        // 'Pending User Approval',
        [PublishAndDownloadJobStatus.Submitted]: 'job_status_submitted', //'Pending',
        [PublishAndDownloadJobStatus.New]: 'job_status_new', //'In Progress',
        [PublishAndDownloadJobStatus.Executing]: 'job_status_executing', //'In Progress',
        [PublishAndDownloadJobStatus.Cancelled]: 'job_status_cancelled', //'Cancelled',
        [PublishAndDownloadJobStatus.Cancelling]: 'job_status_cancelled', //'Cancelled',
        [PublishAndDownloadJobStatus.Failed]: 'job_status_failed', //'Failed',
        [PublishAndDownloadJobStatus.Succeeded]: 'job_status_succeeded', //'Succeeded',
        [PublishAndDownloadJobStatus.TimedOut]: 'job_status_timed_out', //'Timed Out',
        [PublishAndDownloadJobStatus.Waiting]: 'job_status_waiting', //'Timed Out',
        [PublishAndDownloadJobStatus.Expired]: 'job_status_expired', //'Expired',
    };

/**
 * Lookup object that maps job type to the string key of their corresponding labels in the i18n file.
 */
export const jobTypeLabels: Record<PublishAndDownloadJobType, string> = {
    [PublishAndDownloadJobType.PublishScene]: 'job_type_publish_scene', //'Scene as Hosted Imagery',
    [PublishAndDownloadJobType.PublishIndexMask]: 'job_type_publish_index_mask',
    // 'Index Mask as Hosted Imagery',
    [PublishAndDownloadJobType.PublishChangeDetection]:
        'job_type_publish_change_detection',
    // 'Change Detection as Hosted Imagery',
    // [PublishAndDownloadJobType.DownloadIndexMask]: 'Index Mask as GeoTIFF',
    [PublishAndDownloadJobType.SaveWebMappingApp]: 'job_type_save_web_app',
    // 'Current State as Web Application',
    [PublishAndDownloadJobType.SaveWebMap]: 'job_type_save_web_map',
    // 'Scene as ArcGIS Online Web Map',
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]:
        'job_type_save_web_map_with_multiple_scenes',
    // 'Scenes as ArcGIS Online Web Map',
    [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]:
        'job_type_save_web_map_with_multiple_scenes',
    // 'Scenes as ArcGIS Online Web Map',
};

/**
 * This is the template for the item description when saving current state as a web mapping app.
 */
export const ITEM_DESCRIPTION_TEMPLATE_4_WEB_APP =
    '<i>This Web Mapping Application item provides a saved "view" or state of the {{APP_NAME}} app. These items can be used to save and share exactly what you were seeing in the app. From visualizations, like swipe and animate, to analysis results such as change detection. Fill in your own description here if you wish to persist and/or share this item with others. Common use cases include saving and sharing current events.</i>';
