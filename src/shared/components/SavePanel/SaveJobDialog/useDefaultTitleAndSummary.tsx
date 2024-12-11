import { appConfig } from '@shared/config';
import { SaveJobType } from '@shared/store/SaveJobs/reducer';
import React, { useMemo } from 'react';

export const useDefaultTitleAndSummary = (
    saveJobType: SaveJobType,
    sceneId: string
) => {
    const { title, satellite } = appConfig;

    const foramttedTitle = title.split(' | ')[1] || title;

    const formattedSceneId = sceneId || 'N/A';

    const titleBySaveJobType: Record<SaveJobType, string> = {
        'Save Web Mapping App': `${foramttedTitle} View`,
        'Save Web Map': `${satellite} Scene: ${formattedSceneId}`,
        'Publish Scene': `${satellite} Scene: ${formattedSceneId}`,
        'Publish Index Mask': `${satellite} Index Mask: ${formattedSceneId}`,
        'Download Index Mask': 'Download Index Mask',
    };

    const summaryBySaveJobType: Record<SaveJobType, string> = {
        'Save Web Mapping App': `An instance of the ${foramttedTitle} app.`,
        'Save Web Map': `Web map created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Publish Scene': `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Publish Index Mask': `Hosted Imagery Servce created by ${foramttedTitle}. Scene ID: ${formattedSceneId}`,
        'Download Index Mask': '',
    };

    const defaultTitle = titleBySaveJobType[saveJobType];

    const defaultSummary = summaryBySaveJobType[saveJobType];

    return { defaultTitle, defaultSummary };
};
