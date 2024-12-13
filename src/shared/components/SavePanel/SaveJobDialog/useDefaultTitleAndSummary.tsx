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
        'Save Web Mapping App': `${foramttedTitle} View`,
        'Save Web Map': `${satellite} Scene - ${formattedSceneId}`,
        'Publish Scene': `${satellite} Scene - ${formattedSceneId}`,
        'Publish Index Mask': `${satellite} Index Mask - ${formattedSceneId}`,
        'Publish Change Detection': `${satellite} Change Detection - ${formattedSceneId}`,
        'Download Index Mask': 'Download Index Mask',
    };

    const summaryBySaveJobType: Record<PublishAndDownloadJobType, string> = {
        'Save Web Mapping App': `An instance of the ${foramttedTitle} app.`,
        'Save Web Map': `Web map created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Publish Scene': `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Publish Index Mask': `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Publish Change Detection': `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Download Index Mask': '',
    };

    const defaultTitle = titleBySaveJobType[saveJobType];

    const defaultSummary = summaryBySaveJobType[saveJobType];

    return { defaultTitle, defaultSummary };
};
