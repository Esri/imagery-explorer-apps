import { appConfig } from '@shared/config';
import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import React, { useMemo } from 'react';

export const useDefaultTitleAndSummary = (
    saveJobType: PublishAndDownloadJobType,
    sceneId: string
) => {
    const { title, satellite } = appConfig;

    const foramttedTitle = title.split(' | ')[1] || title;

    const formattedSceneId = sceneId || 'N/A';

    const titleBySaveJobType: Record<PublishAndDownloadJobType, string> = {
        [PublishAndDownloadJobType.SaveWebMappingApp]: `${foramttedTitle} View`,
        [PublishAndDownloadJobType.SaveWebMap]: `${satellite} Scene - ${formattedSceneId}`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: `${satellite} Scenes - Multiple`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: `${satellite} Scenes - Multiple`,
        [PublishAndDownloadJobType.PublishScene]: `${satellite} Scene - ${formattedSceneId}`,
        [PublishAndDownloadJobType.PublishIndexMask]: `${satellite} Index Mask - ${formattedSceneId}`,
        [PublishAndDownloadJobType.PublishChangeDetection]: `${satellite} Change Detection - ${formattedSceneId}`,
        // 'Download Index Mask': 'Download Index Mask',
    };

    const summaryBySaveJobType: Record<PublishAndDownloadJobType, string> = {
        [PublishAndDownloadJobType.SaveWebMappingApp]: `An instance of the ${foramttedTitle} app.`,
        [PublishAndDownloadJobType.SaveWebMap]: `Web map created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenes]: `Web map created by ${foramttedTitle}. Mulple scenes included`,
        [PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer]: `Web map created by ${foramttedTitle}. Mulple scenes in a single layer`,
        [PublishAndDownloadJobType.PublishScene]: `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        [PublishAndDownloadJobType.PublishIndexMask]: `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        [PublishAndDownloadJobType.PublishChangeDetection]: `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        // 'Download Index Mask': '',
    };

    const defaultTitle = titleBySaveJobType[saveJobType];

    const defaultSummary = summaryBySaveJobType[saveJobType];

    return { defaultTitle, defaultSummary };
};
