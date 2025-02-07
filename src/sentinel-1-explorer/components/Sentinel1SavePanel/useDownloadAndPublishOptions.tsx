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

/**
 * Custom hook that provides options for downloading and publishing based on the application mode,
 * active analysis tool, and query parameters for the main and secondary scenes.
 *
 * @returns {Object} An object containing `publishOptions`.
 */
export const useSentinel1PublishOptions = () => {
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
                    ? 'Ship and Urban Index Masks are currently unavailable to Save'
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
