import {
    SavePanel,
    SaveJobButtonOnClickParams,
} from '@shared/components/SavePanel';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import {
    createChangeDetectionRasterFunction,
    createClipRasterFunction,
    createMaskIndexRasterFunction,
} from '@shared/services/raster-analysis/rasterFunctions';
import {
    selectQueryParams4MainScene,
    // selectQueryParams4SceneInSelectedMode,
    // selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
// import { useSaveOptions } from './useSaveOptions';
import {
    createNewPublishAndDownloadJob,
    updatePublishAndDownloadJob,
} from '@shared/store/PublishAndDownloadJobs/thunks';

import {
    selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';

import { Geometry } from '@arcgis/core/geometry';
import {
    jobUpdated,
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { createWebMappingApplication } from '@shared/services/arcgis-online/createWebMappingApplication';
import { saveImagerySceneAsWebMap } from '@shared/services/arcgis-online/createWebMap';
import { selectUserSelectedRangeInChangeCompareTool } from '@shared/store/ChangeCompareTool/selectors';
import { useObjectIds4ChangeDetectionTool } from '@shared/components/ChangeCompareLayer/useObjectIds4ChangeDetectionTool';
import { useDownloadAndPublishOptions } from '@shared/components/SavePanel/useDownloadAndPublishOptions';
import {
    SENTINEL_1_ORIGINAL_SERVICE_URL,
    SENTINEL_1_SERVICE_URL,
} from '@shared/services/sentinel-1/config';
import { getSentinel1FeatureByObjectId } from '@shared/services/sentinel-1/getSentinel1Scenes';
import { useSelectedSentinel1Scene } from '../../hooks/useSelectedSentinel1Scene';

export const Sentinel1SavePanel = () => {
    const dispatch = useDispatch();

    const sentinel1Scene = useSelectedSentinel1Scene();

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

    const selectedRange4ChangeDetectionTool = useSelector(
        selectUserSelectedRangeInChangeCompareTool
    );

    const [
        objectIdOfSelectedSceneInEarlierDate,
        objectIdOfSelectedSceneInLater,
    ] = useObjectIds4ChangeDetectionTool();

    const spectralIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const publishSelectedScene = async ({
        job,
        title,
        snippet,
    }: {
        job: PublishAndDownloadJob;
        title: string;
        snippet: string;
    }) => {
        if (
            !queryParams4MainScene ||
            !queryParams4MainScene?.objectIdOfSelectedScene
        ) {
            return;
        }

        const token = getToken();

        try {
            const feature = await getSentinel1FeatureByObjectId(
                queryParams4MainScene.objectIdOfSelectedScene
            );

            const clippingGeometry = feature?.geometry as Geometry;

            let rasterFunction: any = null;

            if (job.type === PublishAndDownloadJobType.PublishScene) {
                rasterFunction = createClipRasterFunction({
                    serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
                    objectId: queryParams4MainScene?.objectIdOfSelectedScene,
                    token,
                    clippingGeometry,
                });
            }
            // else if (
            //     job.type === PublishAndDownloadJobType.PublishIndexMask
            // ) {
            //     rasterFunction = createMaskIndexRasterFunction({
            //         serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
            //         objectId: queryParams4MainScene?.objectIdOfSelectedScene,
            //         token,
            //         bandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
            //         pixelValueRange: selectedRange,
            //         clippingGeometry,
            //     });
            // }
            // else if (
            //     job.type === PublishAndDownloadJobType.PublishChangeDetection
            // ) {
            //     rasterFunction = createChangeDetectionRasterFunction({
            //         serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
            //         objectId4EarlierScene: objectIdOfSelectedSceneInEarlierDate,
            //         objectId4LaterScene: objectIdOfSelectedSceneInLater,
            //         token,
            //         bandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
            //         clippingGeometry,
            //         pixelValueRange: selectedRange4ChangeDetectionTool,
            //     });
            // }

            const response = await publishSceneAsHostedImageryLayer({
                title, //'hosted-imagery-service-' + new Date().getTime(),
                snippet,
                rasterFunction,
            });
            // console.log('Generate Raster Job submitted', response);

            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    rasterAnanlysisJobId: response.rasterAnalysisJobId,
                    rasterAnalysisTaskName: 'GenerateRaster',
                    outputURL: response.outputServiceUrl,
                    outputItemId: response.outputItemId,
                })
            );
        } catch (err) {
            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    status: PublishAndDownloadJobStatus.Failed,
                    errormessage: `Failed to publish scene: ${
                        err.message || 'unknown error'
                    }`,
                })
            );
        }
    };

    const createNewItemInArcGISOnline = async ({
        job,
        title,
        snippet,
    }: {
        job: PublishAndDownloadJob;
        title: string;
        snippet: string;
    }) => {
        try {
            const res =
                job.type === PublishAndDownloadJobType.SaveWebMappingApp
                    ? await createWebMappingApplication({
                          title,
                          snippet,
                          tags: 'Esri Sentinel-1 Explorer, Sentinel-1, Remote Sensing',
                      })
                    : await saveImagerySceneAsWebMap({
                          title,
                          snippet,
                          tags: [
                              'Esri Sentinel-1 Explorer',
                              'Sentinel-1',
                              'Remote Sensing',
                          ],
                          serviceUrl: SENTINEL_1_ORIGINAL_SERVICE_URL,
                          serviceName: 'Sentinel-1',
                          objectIdOfSelectedScene:
                              queryParams4MainScene?.objectIdOfSelectedScene,
                      });

            dispatch(
                updatePublishAndDownloadJob({
                    ...job,
                    status: PublishAndDownloadJobStatus.Succeeded,
                    outputItemId: res.id,
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

    const saveOptionOnClick = async ({
        saveJobType,
        title,
        summary,
    }: SaveJobButtonOnClickParams) => {
        // console.log('saveOptionOnClick', option);

        const job = await dispatch(
            createNewPublishAndDownloadJob({
                jobType: saveJobType,
                title,
                summary,
                sceneId: sentinel1Scene?.name,
            })
        );

        if (
            saveJobType === PublishAndDownloadJobType.PublishScene ||
            saveJobType === PublishAndDownloadJobType.PublishIndexMask ||
            saveJobType === PublishAndDownloadJobType.PublishChangeDetection
        ) {
            publishSelectedScene({
                job,
                title, //`hosted-imagery-service-${new Date().getTime()}`,
                snippet: summary, //'Hosted Imagery Service created from Esri Landsat Explorer App',
            });
            return;
        }

        if (
            saveJobType === PublishAndDownloadJobType.SaveWebMappingApp ||
            saveJobType === PublishAndDownloadJobType.SaveWebMap
        ) {
            createNewItemInArcGISOnline({
                job,
                title, //`Landsat Scene (${landsatScene.name})`,
                snippet: summary, //`Landsat Scene (${landsatScene.name})`,
            });
            return;
        }
    };

    const { publishOptions, donwloadOptions } = useDownloadAndPublishOptions();

    return (
        <SavePanel
            sceneId={sentinel1Scene?.name}
            publishOptions={publishOptions}
            downloadOptions={donwloadOptions}
            saveButtonOnClick={saveOptionOnClick}
        />
    );
};
