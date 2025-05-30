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

import { appConfig } from '@shared/config';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { useMemo } from 'react';

export const useDefaultTitleAndSummary = (
    /**
     * The type of save job.
     */
    saveJobType: PublishAndDownloadJobType,
    /**
     * The scene IDs used in the title and summary.
     */
    sceneIds: string[],
    /**
     * The satellite name used in the title and summary.
     */
    satellite: string
) => {
    const { title } = appConfig;

    const foramttedTitle = title.split(' | ')[1] || title;

    const mainSceneId = sceneIds[0] || 'N/A';
    const secondarySceneId = sceneIds[1] || 'N/A';

    const titleBySaveJobType: Record<PublishAndDownloadJobType, string> = {
        [PublishAndDownloadJobType.SaveWebMappingApp]: `${foramttedTitle} View`,
        [PublishAndDownloadJobType.SaveWebMap]: `${satellite} Scene - ${mainSceneId}`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: `${satellite} Scenes - Individual layers per scene`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: `${satellite} Scenes - A single layer with multiple scenes`,
        [PublishAndDownloadJobType.PublishScene]: `${satellite} Scene - ${mainSceneId}`,
        [PublishAndDownloadJobType.PublishIndexMask]: `${satellite} Index Mask - ${mainSceneId}`,
        [PublishAndDownloadJobType.PublishChangeDetection]: `${satellite} Change Detection - ${mainSceneId} - ${secondarySceneId}`,
        // 'Download Index Mask': 'Download Index Mask',
    };

    const summaryBySaveJobType: Record<PublishAndDownloadJobType, string> = {
        [PublishAndDownloadJobType.SaveWebMappingApp]: `An instance of the ${foramttedTitle} app.`,
        [PublishAndDownloadJobType.SaveWebMap]: `Web map created by ${foramttedTitle}. Scene ID: ${mainSceneId}`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: `Web map created by ${foramttedTitle}.`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: `Web map created by ${foramttedTitle}.`,
        [PublishAndDownloadJobType.PublishScene]: `Hosted Imagery Service created by ${foramttedTitle}. Scene ID: ${mainSceneId}`,
        [PublishAndDownloadJobType.PublishIndexMask]: `Hosted Imagery Service created by ${foramttedTitle}. Scene ID: ${mainSceneId}`,
        [PublishAndDownloadJobType.PublishChangeDetection]: `Hosted Imagery Service created by ${foramttedTitle}. Scene IDs: ${mainSceneId} | ${secondarySceneId}`,
        // 'Download Index Mask': '',
    };

    const defaultTitle = titleBySaveJobType[saveJobType];

    const defaultSummary = summaryBySaveJobType[saveJobType];

    return { defaultTitle, defaultSummary };
};
