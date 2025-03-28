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
import {
    PublishAndDownloadJobOptionData,
    useDownloadAndPublishOptions,
} from '@shared/components/SavePanel/useDownloadAndPublishOptions';
import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { RadarIndex } from '@typing/imagery-service';
import { useTranslation } from 'react-i18next';
import { APP_NAME } from '@shared/config';

/**
 * Custom hook that provides options for downloading and publishing based on the application mode,
 * active analysis tool, and query parameters for the main and secondary scenes.
 *
 * @returns {Object} An object containing `publishOptions`.
 */
export const useSentinel1PublishOptions = () => {
    const { t } = useTranslation();

    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    // const queryParams4SecondaryScene = useAppSelector(
    //     selectQueryParams4SecondaryScene
    // );

    const radarIndex = useAppSelector(
        selectSelectedIndex4MaskTool
    ) as RadarIndex;

    // const listOfQueryParams = useAppSelector(selectListOfQueryParams);

    const defaultListOfOptions: PublishAndDownloadJobOptionData[] =
        useDownloadAndPublishOptions();

    const publishOptions: PublishAndDownloadJobOptionData[] = useMemo(() => {
        // const options: PublishAndDownloadJobType[] = [
        //     PublishAndDownloadJobType.SaveWebMappingApp,
        // ];

        // if (
        //     (mode === 'find a scene' ||
        //         mode === 'dynamic' ||
        //         mode === 'analysis') &&
        //     queryParams4MainScene?.objectIdOfSelectedScene
        // ) {
        //     options.push(PublishAndDownloadJobType.SaveWebMap);
        //     options.push(PublishAndDownloadJobType.PublishScene);
        // }

        // if (
        //     mode === 'swipe' &&
        //     queryParams4MainScene?.objectIdOfSelectedScene &&
        //     queryParams4SecondaryScene?.objectIdOfSelectedScene
        // ) {
        //     options.push(
        //         PublishAndDownloadJobType.SaveWebMapWithMultipleScenes
        //     );
        //     options.push(
        //         PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
        //     );
        // }

        // if (mode === 'animate' && listOfQueryParams?.length > 0) {
        //     options.push(
        //         PublishAndDownloadJobType.SaveWebMapWithMultipleScenes
        //     );
        //     options.push(
        //         PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
        //     );
        // }

        // if (
        //     mode === 'analysis' &&
        //     analyzeTool === 'change' &&
        //     queryParams4MainScene?.objectIdOfSelectedScene &&
        //     queryParams4SecondaryScene?.objectIdOfSelectedScene
        // ) {
        //     options.push(PublishAndDownloadJobType.PublishChangeDetection);
        // }

        // const output: PublishAndDownloadJobOptionData[] = options.map(
        //     (jobType) => {
        //         return {
        //             saveJobType: jobType,
        //         };
        //     }
        // );

        const output: PublishAndDownloadJobOptionData[] = defaultListOfOptions;

        if (
            mode === 'analysis' &&
            analyzeTool === 'mask' &&
            queryParams4MainScene?.objectIdOfSelectedScene
        ) {
            const disabled = radarIndex === 'ship' || radarIndex === 'urban';

            output.push({
                saveJobType: PublishAndDownloadJobType.PublishIndexMask,
                disabled,
                message: disabled
                    ? t('ship_urban_index_unavailable', { ns: APP_NAME })
                    : '',
            });
        }

        return output;
    }, [
        defaultListOfOptions,
        queryParams4MainScene?.objectIdOfSelectedScene,
        // queryParams4SecondaryScene?.objectIdOfSelectedScene,
        // listOfQueryParams?.length,
        mode,
        analyzeTool,
        radarIndex,
    ]);

    // const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
    //     const output: PublishAndDownloadJobType[] = [];

    //     return output;
    // }, [queryParams4MainScene?.objectIdOfSelectedScene, mode, analyzeTool]);

    // const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
    //     return [] as PublishAndDownloadJobType[];
    // }, []);

    return {
        publishOptions,
        // donwloadOptions,
    };
};
