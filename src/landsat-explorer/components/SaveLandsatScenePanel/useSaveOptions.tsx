import { SaveOption } from '@shared/constants/saveOptions';
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

    const publishOptions: SaveOption[] = useMemo(() => {
        const output: SaveOption[] = [
            SaveOption.SaveWebMappingApp,
            SaveOption.SaveWebMap,
        ];

        if (objectIdOfSelectedScene) {
            output.push(SaveOption.PublishScene);
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            objectIdOfSelectedScene
        ) {
            output.push(SaveOption.PublishIndexMask);
        }

        return output;
    }, [objectIdOfSelectedScene, mode, analyzeTool]);

    const donwloadOptions: SaveOption[] = useMemo(() => {
        const output: SaveOption[] = [];

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            objectIdOfSelectedScene
        ) {
            output.push(SaveOption.DownloadIndexMask);
        }

        return output;
    }, [objectIdOfSelectedScene, mode, analyzeTool]);

    return {
        publishOptions,
        donwloadOptions,
    };
};
