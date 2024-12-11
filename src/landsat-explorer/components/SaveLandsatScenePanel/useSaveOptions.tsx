import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSaveOptions = () => {
    const mode = useSelector(selectAppMode);

    const analyzeTool = useSelector(selectActiveAnalysisTool);

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const publishOptions: PublishAndDownloadJobType[] = useMemo(() => {
        const output: PublishAndDownloadJobType[] = [
            PublishAndDownloadJobType.SaveWebMappingApp,
        ];

        if (objectIdOfSelectedScene) {
            output.push(PublishAndDownloadJobType.SaveWebMap);
            output.push(PublishAndDownloadJobType.PublishScene);
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            objectIdOfSelectedScene
        ) {
            output.push(PublishAndDownloadJobType.PublishIndexMask);
        }

        return output;
    }, [objectIdOfSelectedScene, mode, analyzeTool]);

    const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
        const output: PublishAndDownloadJobType[] = [];

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            objectIdOfSelectedScene
        ) {
            output.push(PublishAndDownloadJobType.DownloadIndexMask);
        }

        return output;
    }, [objectIdOfSelectedScene, mode, analyzeTool]);

    return {
        publishOptions,
        donwloadOptions,
    };
};
