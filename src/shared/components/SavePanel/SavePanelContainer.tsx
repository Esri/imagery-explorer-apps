import React, { FC } from 'react';
import { SavePanel } from './SavePanel';
import { PublishAndDownloadJobOptionData } from './useDownloadAndPublishOptions';
import { SaveJobButtonOnClickParams } from '@shared/components/SavePanel';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import {
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    // selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { useAppDispatch } from '@shared/store/configureStore';
import { useAppSelector } from '@shared/store/configureStore';
// import { useSaveOptions } from './useSaveOptions';
import {
    createNewPublishAndDownloadJob,
    updatePublishAndDownloadJob,
} from '@shared/store/PublishAndDownloadJobs/thunks';

import {
    jobUpdated,
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
    PublishJob,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { createWebMappingApplication } from '@shared/services/arcgis-online/createWebMappingApplication';
import { saveImagerySceneAsWebMap } from '@shared/services/arcgis-online/createWebMap';
import { useCheckJobCost } from './useCheckJobCost';
import { useClearRasterAnalysisJobs } from './useClearRasterAnalysisJobs';
import { useCheckJobStatus } from './useCheckRasterAnalysisJobStatus';
import { useObjectIdOfSelectedScenes } from './useObjectIdOfSelectedScenes';
import { AddItemResponse } from '@shared/services/arcgis-online/addItem';

/**
 * Raster functions for the publish jobs.
 */
export type RasterFunctionsByPublishJobType = Record<PublishJob, any>;

export type EstimatedCostByJobType = Record<PublishJob, number>;

export type SavePanelContainerProps = {
    /**
     * The URL of the original imagery service.
     */
    originalServiceUrl: string;
    /**
     * name of the service
     * @example 'LandsatLevel2'
     */
    serviceName: string;
    /**
     * The ID of the scene to be saved.
     */
    sceneId: string;
    /**
     * Options for publishing the scene.
     */
    publishOptions: PublishAndDownloadJobOptionData[];
    /**
     * Tags to be added to the item in ArcGIS Online.
     */
    tags: string[];
    /**
     * Raster function for publishing the scene.
     */
    publishSceneRasterFunction?: any;
    /**
     * Raster function for publishing the index mask.
     */
    publishIndexMaskRasterFunction?: any;
    /**
     * Raster function for publishing the change detection.
     */
    publishChangeDetectionRasterFunction?: any;
    /**
     * Estimated cost of the raster analysis job.
     * The cost is in credits.
     */
    estimatedCostByJobType: EstimatedCostByJobType;
};

export const SavePanelContainer: FC<SavePanelContainerProps> = ({
    originalServiceUrl,
    serviceName,
    sceneId,
    publishOptions,
    tags,
    publishSceneRasterFunction,
    publishIndexMaskRasterFunction,
    publishChangeDetectionRasterFunction,
    estimatedCostByJobType,
}) => {
    const dispatch = useAppDispatch();

    const objectIdOfSelectedScenes = useObjectIdOfSelectedScenes();

    // const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    // Custom hook that checks the status of pending raster analysis jobs.
    useCheckJobStatus();

    // // Custom hook that clears finished raster analysis jobs.
    // useClearRasterAnalysisJobs();

    // Custom hook that checks the cost of new raster analysis jobs.
    useCheckJobCost();

    const createNewItemInArcGISOnline = async (job: PublishAndDownloadJob) => {
        try {
            const title = job.title;
            const snippet = job.summary;

            let addItemResponse: AddItemResponse = null;

            if (job.type === PublishAndDownloadJobType.SaveWebMappingApp) {
                addItemResponse = await createWebMappingApplication({
                    title,
                    snippet,
                    tags,
                });
            } else if (
                job.type === PublishAndDownloadJobType.SaveWebMap ||
                job.type ===
                    PublishAndDownloadJobType.SaveWebMapWithMultipleScenes ||
                job.type ===
                    PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
            ) {
                addItemResponse = await saveImagerySceneAsWebMap({
                    title, // `Landsat Scene (${landsatScene.name})`,
                    snippet, // `Landsat Scene (${landsatScene.name})`,
                    tags,
                    serviceUrl: originalServiceUrl,
                    serviceName, //'LandsatLevel2',
                    objectIdOfSelectedScenes,
                });
            }

            if (!addItemResponse) {
                throw new Error('Failed to create ArcGIS Online item');
            }

            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    status: PublishAndDownloadJobStatus.Succeeded,
                    outputItemId: addItemResponse.id,
                })
            );
        } catch (err) {
            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    status: PublishAndDownloadJobStatus.Failed,
                    errormessage: `Failed to create ArcGIS Online item: ${
                        err.message || 'unknown error'
                    }`,
                })
            );
        }
    };

    const saveButtonOnClickHandler = async ({
        saveJobType,
        title,
        summary,
    }: SaveJobButtonOnClickParams) => {
        // console.log('saveOptionOnClick', option);

        const rasterFunctions: RasterFunctionsByPublishJobType = {
            [PublishAndDownloadJobType.PublishScene]:
                publishSceneRasterFunction,
            [PublishAndDownloadJobType.PublishIndexMask]:
                publishIndexMaskRasterFunction,
            [PublishAndDownloadJobType.PublishChangeDetection]:
                publishChangeDetectionRasterFunction,
        };

        const rasterFunction =
            rasterFunctions[saveJobType as PublishJob] || null;

        const estimatedCost =
            estimatedCostByJobType[saveJobType as PublishJob] || 0;

        const job = await dispatch(
            createNewPublishAndDownloadJob({
                jobType: saveJobType,
                title,
                summary,
                sceneId,
                rasterFunction,
                estimatedCost,
            })
        );

        // if (job.publishToHostedImageryService) {
        //     publishSelectedScene(job);
        //     return;
        // }

        if (
            saveJobType === PublishAndDownloadJobType.SaveWebMappingApp ||
            saveJobType === PublishAndDownloadJobType.SaveWebMap ||
            saveJobType ===
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenes ||
            saveJobType ===
                PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
        ) {
            createNewItemInArcGISOnline(job);
            return;
        }
    };

    return (
        <SavePanel
            sceneId={sceneId}
            publishOptions={publishOptions}
            estimatedCostByJobType={estimatedCostByJobType}
            saveButtonOnClick={saveButtonOnClickHandler}
        />
    );
};
