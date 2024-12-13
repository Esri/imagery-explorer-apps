import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import React, { useMemo } from 'react';
import { useSelector } from 'react-redux';

export const useSaveOptions = () => {
    const mode = useSelector(selectAppMode);

    const analyzeTool = useSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const publishOptions: PublishAndDownloadJobType[] = useMemo(() => {
        const output: PublishAndDownloadJobType[] = [
            PublishAndDownloadJobType.SaveWebMappingApp,
        ];

        if (queryParams4MainScene?.objectIdOfSelectedScene) {
            output.push(PublishAndDownloadJobType.SaveWebMap);
            output.push(PublishAndDownloadJobType.PublishScene);
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            queryParams4MainScene?.objectIdOfSelectedScene
        ) {
            output.push(PublishAndDownloadJobType.PublishIndexMask);
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'change' &&
            queryParams4MainScene?.objectIdOfSelectedScene &&
            queryParams4SecondaryScene?.objectIdOfSelectedScene
        ) {
            output.push(PublishAndDownloadJobType.PublishChangeDetection);
        }

        return output;
    }, [
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        mode,
        analyzeTool,
    ]);

    const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
        const output: PublishAndDownloadJobType[] = [];

        // if (
        //     mode === 'analysis' &&
        //     analyzeTool === 'mask' &&
        //     queryParams4MainScene?.objectIdOfSelectedScene
        // ) {
        //     output.push(PublishAndDownloadJobType.DownloadIndexMask);
        // }

        return output;
    }, [queryParams4MainScene?.objectIdOfSelectedScene, mode, analyzeTool]);

    return {
        publishOptions,
        donwloadOptions,
    };
};
