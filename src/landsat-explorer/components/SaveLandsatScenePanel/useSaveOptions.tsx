import { SaveJobType } from '@shared/store/SaveJobs/reducer';
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

    const publishOptions: SaveJobType[] = useMemo(() => {
        const output: SaveJobType[] = [SaveJobType.SaveWebMappingApp];

        if (objectIdOfSelectedScene) {
            output.push(SaveJobType.SaveWebMap);
            output.push(SaveJobType.PublishScene);
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            objectIdOfSelectedScene
        ) {
            output.push(SaveJobType.PublishIndexMask);
        }

        return output;
    }, [objectIdOfSelectedScene, mode, analyzeTool]);

    const donwloadOptions: SaveJobType[] = useMemo(() => {
        const output: SaveJobType[] = [];

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            objectIdOfSelectedScene
        ) {
            output.push(SaveJobType.DownloadIndexMask);
        }

        return output;
    }, [objectIdOfSelectedScene, mode, analyzeTool]);

    return {
        publishOptions,
        donwloadOptions,
    };
};
