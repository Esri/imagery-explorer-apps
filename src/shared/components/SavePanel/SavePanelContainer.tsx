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

import React, { FC, useMemo } from 'react';
import { SavePanel } from './SavePanel';
import { PublishAndDownloadJobOptionData } from './useDownloadAndPublishOptions';
import { SaveJobButtonOnClickParams } from '@shared/components/SavePanel';
import { useAppDispatch, useAppSelector } from '@shared/store/configureStore';
// import { useSaveOptions } from './useSaveOptions';
import {
    createNewPublishAndDownloadJob,
    submitRasterAnalysisJob,
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
import { useCheckJobStatus } from './useCheckRasterAnalysisJobStatus';
import { useImagerySceneData4WebMap } from './useImagerySceneData4WebMap';
import { AddItemResponse } from '@shared/services/arcgis-online/addItem';
import { ITEM_DESCRIPTION_TEMPLATE_4_WEB_APP } from './constants';
import { useAppTitle } from '@shared/hooks/useAppTitle';
import { useTranslation } from 'react-i18next';

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
     * The IDs of the scene to be saved.
     */
    sceneIds: string[];
    /**
     * Options for publishing the scene.
     */
    publishOptions: PublishAndDownloadJobOptionData[];
    /**
     * Tags to be added to the item in ArcGIS Online.
     */
    tags: string[];
    /**
     * Description of the item in ArcGIS Online.
     */
    description: string;
    /**
     * Credits the source of the item in ArcGIS Online.
     */
    accessInformation: string;
    /**
     * Includes any license information or restrictions of the item in ArcGIS Online.
     */
    licenseInfo: string;
    /**
     * License information for the item associated with the hosted imagery service that stores
     * the output of the raster analysis job.
     */
    licenseInfoForHostedImageryService: string;
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
    // /**
    //  * Estimated cost of the raster analysis job.
    //  * The cost is in credits.
    //  */
    // estimatedCostByJobType: EstimatedCostByJobType;
};

export type PublishJobSubmitHandler = (job: PublishAndDownloadJob) => void;

export const SavePanelContainer: FC<SavePanelContainerProps> = ({
    originalServiceUrl,
    serviceName,
    sceneIds,
    publishOptions,
    tags,
    description,
    accessInformation,
    licenseInfo,
    licenseInfoForHostedImageryService,
    publishSceneRasterFunction,
    publishIndexMaskRasterFunction,
    publishChangeDetectionRasterFunction,
    // estimatedCostByJobType,
}) => {
    const { t } = useTranslation();

    const dispatch = useAppDispatch();

    /**
     * Custom hook that generates imagery scene data for a web map based on the current application mode and query parameters.
     */
    const imageryScenesData = useImagerySceneData4WebMap();

    /**
     * Custom hook that returns the title of the app
     */
    const appTitle = useAppTitle();

    // const queryParams4MainScene = useAppSelector(selectQueryParams4MainScene);

    // submit the raster analysis job once the cost is checked
    const publishJobSubmitHandler = (job: PublishAndDownloadJob): void => {
        if (!job) {
            return;
        }

        dispatch(
            submitRasterAnalysisJob({
                job,
                description,
                accessInformation,
                licenseInfo: licenseInfoForHostedImageryService,
            })
        );
    };

    // Custom hook that checks the status of pending raster analysis jobs.
    useCheckJobStatus();

    // // Custom hook that clears finished raster analysis jobs.
    // useClearRasterAnalysisJobs();

    // Custom hook that checks the cost of new raster analysis jobs.
    useCheckJobCost(publishJobSubmitHandler);

    const subHeader = useMemo(() => {
        if (imageryScenesData.length > 1) {
            return t('multiple_scenes_selected');
        }

        if (sceneIds[0]) {
            return `${t('scene_id')}: ${sceneIds[0]}`;
        }

        return null;
    }, [imageryScenesData.length, sceneIds]);

    const createNewItemInArcGISOnline = async (job: PublishAndDownloadJob) => {
        try {
            const title = job.title;
            const snippet = job.summary;

            let addItemResponse: AddItemResponse = null;

            if (job.type === PublishAndDownloadJobType.SaveWebMappingApp) {
                const description = ITEM_DESCRIPTION_TEMPLATE_4_WEB_APP.replace(
                    '{{APP_NAME}}',
                    appTitle
                );

                addItemResponse = await createWebMappingApplication({
                    title,
                    snippet,
                    tags,
                    licenseInfo,
                    description,
                });
            } else if (
                job.type === PublishAndDownloadJobType.SaveWebMap ||
                job.type ===
                    PublishAndDownloadJobType.SaveWebMapWithMultipleScenes ||
                job.type ===
                    PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer
            ) {
                addItemResponse = await saveImagerySceneAsWebMap({
                    title,
                    snippet,
                    tags,
                    serviceUrl: originalServiceUrl,
                    serviceName, //'LandsatLevel2',
                    scenes: imageryScenesData,
                    singleLayerWithMultipleScenes:
                        job.type ===
                        PublishAndDownloadJobType.SaveWebMapWithMultipleScenesInSingleLayer,
                    description,
                    accessInformation,
                    licenseInfo,
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
                    errormessage: `${err.message || 'unknown error'}`,
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

        // const estimatedCost =
        //     estimatedCostByJobType[saveJobType as PublishJob] || 0;

        const job = await dispatch(
            createNewPublishAndDownloadJob({
                jobType: saveJobType,
                title,
                summary,
                sceneIds,
                rasterFunction,
                // estimatedCost,
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
            sceneIds={sceneIds}
            subHeader={subHeader}
            satellite={serviceName}
            publishOptions={publishOptions}
            // estimatedCostByJobType={estimatedCostByJobType}
            saveButtonOnClick={saveButtonOnClickHandler}
            publishJobSubmitHandler={publishJobSubmitHandler}
        />
    );
};
