import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectListOfQueryParams,
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';

export type PublishAndDownloadJobOptionData = {
    /**
     * The type of job to be saved.
     */
    saveJobType: PublishAndDownloadJobType;
    /**
     * Whether the option is disabled.
     */
    disabled?: boolean;
    /**
     * The message to be displayed when the option is disabled.
     */
    message?: string;
};

/**
 * Custom hook that generates a list of publish and download options based on the current application state.
 *
 * The available options are determined based on the following conditions:
 * - If the mode is 'find a scene', 'dynamic', or 'analysis' and a main scene is selected, the options include saving a web map and publishing the scene.
 * - If the mode is 'swipe' and both a main scene and a secondary scene are selected, the options include saving a web map with multiple scenes and saving a web map with multiple scenes in a single layer.
 * - If the mode is 'animate' and there are multiple query parameters, the options include saving a web map with multiple scenes and saving a web map with multiple scenes in a single layer.
 * - If the mode is 'analysis' and the active analysis tool is 'mask' and a main scene is selected, the option includes publishing an index mask.
 * - If the mode is 'analysis' and the active analysis tool is 'change' and both a main scene and a secondary scene are selected, the option includes publishing change detection.
 *
 * @returns {PublishAndDownloadJobOptionData[]} An array of objects representing the available publish and download job options.
 */
export const useDownloadAndPublishOptions = () => {
    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const listOfQueryParams = useAppSelector(selectListOfQueryParams);

    const shouldAddSaveSingleSceneOption = useMemo(() => {
        const mainSceneSelected =
            queryParams4MainScene?.objectIdOfSelectedScene;

        if (
            (mode === 'find a scene' || mode === 'dynamic') &&
            mainSceneSelected
        ) {
            return true;
        }

        if (mode === 'analysis' && mainSceneSelected) {
            return (
                analyzeTool !== 'change' && analyzeTool !== 'temporal composite'
            );
        }

        return false;
    }, [mode, analyzeTool, queryParams4MainScene?.objectIdOfSelectedScene]);

    const shouldAddSaveMultipleScenesOption = useMemo(() => {
        const bothScenesSelected =
            queryParams4MainScene?.objectIdOfSelectedScene &&
            queryParams4SecondaryScene?.objectIdOfSelectedScene;

        if (mode === 'swipe' && bothScenesSelected) {
            return true;
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'change' &&
            bothScenesSelected
        ) {
            return true;
        }

        if (mode === 'animate' && listOfQueryParams?.length > 0) {
            return true;
        }

        return false;
    }, [
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        listOfQueryParams?.length,
        mode,
        analyzeTool,
    ]);

    const shouldAddPublishIndexMaskOption = useMemo(() => {
        return (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            queryParams4MainScene?.objectIdOfSelectedScene
        );
    }, [mode, analyzeTool, queryParams4MainScene?.objectIdOfSelectedScene]);

    const shouldAddPublishChangeDetectionOption = useMemo(() => {
        return (
            mode === 'analysis' &&
            analyzeTool === 'change' &&
            queryParams4MainScene?.objectIdOfSelectedScene &&
            queryParams4SecondaryScene?.objectIdOfSelectedScene
        );
    }, [
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        mode,
        analyzeTool,
    ]);

    const publishOptions: PublishAndDownloadJobOptionData[] = useMemo(() => {
        const output: PublishAndDownloadJobType[] = [
            PublishAndDownloadJobType.SaveWebMappingApp,
        ];

        if (shouldAddSaveSingleSceneOption) {
            output.push(PublishAndDownloadJobType.SaveWebMap);
            output.push(PublishAndDownloadJobType.PublishScene);
        }

        if (shouldAddSaveMultipleScenesOption) {
            output.push(PublishAndDownloadJobType.SaveWebMapWithMultipleScenes);
            output.push(
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
            );
        }

        // if (mode === 'animate' && listOfQueryParams?.length > 0) {
        //     output.push(PublishAndDownloadJobType.SaveWebMapWithMultipleScenes);
        //     output.push(
        //         PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
        //     );
        // }

        if (shouldAddPublishIndexMaskOption) {
            output.push(PublishAndDownloadJobType.PublishIndexMask);
        }

        if (shouldAddPublishChangeDetectionOption) {
            output.push(PublishAndDownloadJobType.PublishChangeDetection);
        }

        return output.map((jobType) => {
            return {
                saveJobType: jobType,
            };
        });
    }, [
        // queryParams4MainScene?.objectIdOfSelectedScene,
        // queryParams4SecondaryScene?.objectIdOfSelectedScene,
        // // listOfQueryParams?.length,
        // mode,
        // analyzeTool,
        shouldAddSaveSingleSceneOption,
        shouldAddSaveMultipleScenesOption,
        shouldAddPublishIndexMaskOption,
        shouldAddPublishChangeDetectionOption,
    ]);

    // const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
    //     const output: PublishAndDownloadJobType[] = [];

    //     return output;
    // }, [queryParams4MainScene?.objectIdOfSelectedScene, mode, analyzeTool]);

    return publishOptions;
};
