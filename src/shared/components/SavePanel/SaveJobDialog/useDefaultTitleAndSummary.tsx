import { appConfig } from '@shared/config';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { useMemo } from 'react';

export const useDefaultTitleAndSummary = (
    saveJobType: PublishAndDownloadJobType,
    sceneIds: string[]
) => {
    const { title, satellite } = appConfig;

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
        [PublishAndDownloadJobType.PublishChangeDetection]: `${satellite} Change Detection - ${mainSceneId}-${secondarySceneId}`,
        // 'Download Index Mask': 'Download Index Mask',
    };

    const summaryBySaveJobType: Record<PublishAndDownloadJobType, string> = {
        [PublishAndDownloadJobType.SaveWebMappingApp]: `An instance of the ${foramttedTitle} app.`,
        [PublishAndDownloadJobType.SaveWebMap]: `Web map created by ${foramttedTitle}. Scene ID: ${mainSceneId}`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: `Web map created by ${foramttedTitle}.`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: `Web map created by ${foramttedTitle}.`,
        [PublishAndDownloadJobType.PublishScene]: `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${mainSceneId}`,
        [PublishAndDownloadJobType.PublishIndexMask]: `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${mainSceneId}`,
        [PublishAndDownloadJobType.PublishChangeDetection]: `Hosted Imagery Servce created by ${foramttedTitle}. Scene IDs: ${mainSceneId} | ${secondarySceneId}`,
        // 'Download Index Mask': '',
    };

    const defaultTitle = titleBySaveJobType[saveJobType];

    const defaultSummary = summaryBySaveJobType[saveJobType];

    return { defaultTitle, defaultSummary };
};
