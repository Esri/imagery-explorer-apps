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
import { APP_NAME } from '@shared/config';

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
 * Custom hook to determine the available download and publish options based on the current application state.
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
        // Sentinel-1 Explorer uses a different logic for the PublishIndexMask option
        if (APP_NAME === 'sentinel1explorer') {
            return false;
        }

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
