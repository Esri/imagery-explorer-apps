import { PublishAndDownloadJobType } from '@shared/store/PublishAndDownloadJobs/reducer';
import {
    selectActiveAnalysisTool,
    selectAppMode,
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import React, { useMemo } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import { PublishAndDownloadJobOptionData } from '@shared/components/SavePanel/useDownloadAndPublishOptions';
import { selectSelectedIndex4MaskTool } from '@shared/store/MaskTool/selectors';
import { RadarIndex } from '@typing/imagery-service';

/**
 * Custom hook that provides options for downloading and publishing based on the application mode,
 * active analysis tool, and query parameters for the main and secondary scenes.
 *
 * @returns {Object} An object containing `publishOptions` and `downloadOptions`.
 *
 * @property {PublishAndDownloadJobType[]} publishOptions - An array of options for publishing.
 * @property {PublishAndDownloadJobType[]} downloadOptions - An array of options for downloading.
 */
export const useSentinel1PublishOptions = () => {
    const mode = useAppSelector(selectAppMode);

    const analyzeTool = useAppSelector(selectActiveAnalysisTool);

    const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useAppSelector(
        selectQueryParams4SecondaryScene
    );

    const radarIndex = useAppSelector(
        selectSelectedIndex4MaskTool
    ) as RadarIndex;

    const publishOptions: PublishAndDownloadJobOptionData[] = useMemo(() => {
        const options: PublishAndDownloadJobType[] = [
            PublishAndDownloadJobType.SaveWebMappingApp,
        ];

        if (queryParams4MainScene?.objectIdOfSelectedScene) {
            options.push(PublishAndDownloadJobType.SaveWebMap);
            options.push(PublishAndDownloadJobType.PublishScene);
        }

        if (
            mode === 'analysis' &&
            analyzeTool === 'change' &&
            queryParams4MainScene?.objectIdOfSelectedScene &&
            queryParams4SecondaryScene?.objectIdOfSelectedScene
        ) {
            options.push(PublishAndDownloadJobType.PublishChangeDetection);
        }

        const output: PublishAndDownloadJobOptionData[] = options.map(
            (jobType) => {
                return {
                    saveJobType: jobType,
                };
            }
        );

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
        queryParams4MainScene?.objectIdOfSelectedScene,
        queryParams4SecondaryScene?.objectIdOfSelectedScene,
        mode,
        analyzeTool,
        radarIndex,
    ]);

    // const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
    //     const output: PublishAndDownloadJobType[] = [];

    //     return output;
    // }, [queryParams4MainScene?.objectIdOfSelectedScene, mode, analyzeTool]);

    const donwloadOptions: PublishAndDownloadJobType[] = useMemo(() => {
        return [] as PublishAndDownloadJobType[];
    }, []);

    return {
        publishOptions,
        donwloadOptions,
    };
};
