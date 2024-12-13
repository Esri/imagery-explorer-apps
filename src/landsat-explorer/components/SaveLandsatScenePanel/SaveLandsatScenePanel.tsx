import { useSelectedLandsatScene } from '@landsat-explorer/hooks/useSelectedLandsatScene';
import {
    SavePanel,
    SaveJobButtonOnClickParams,
} from '@shared/components/SavePanel';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import {
    createChangeDetectionRasterFunction,
    createClipRasterFunction,
    createMaskIndexRasterFunction,
} from '@shared/services/raster-analysis/rasterFunctions';
import {
    selectQueryParams4MainScene,
    selectQueryParams4SceneInSelectedMode,
    selectQueryParams4SecondaryScene,
} from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSaveOptions } from './useSaveOptions';
import {
    createNewPublishAndDownloadJob,
    updatePublishAndDownloadJob,
} from '@shared/store/PublishAndDownloadJobs/thunks';

import {
    selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';
import { getLandsatFeatureByObjectId } from '@shared/services/landsat-level-2/getLandsatScenes';
import { Geometry } from '@arcgis/core/geometry';
import {
    jobUpdated,
    PublishAndDownloadJob,
    PublishAndDownloadJobStatus,
    PublishAndDownloadJobType,
} from '@shared/store/PublishAndDownloadJobs/reducer';
import { createWebMappingApplication } from '@shared/services/arcgis-online/createWebMappingApplication';
import { saveImagerySceneAsWebMap } from '@shared/services/arcgis-online/createWebMap';

export const LandsatSceneSavePanel = () => {
    const dispatch = useDispatch();

    const landsatScene = useSelectedLandsatScene();

    const queryParams4MainScene = useSelector(selectQueryParams4MainScene);

    const queryParams4SecondaryScene = useSelector(
        selectQueryParams4SecondaryScene
    );

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

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
            const feature = await getLandsatFeatureByObjectId(
                queryParams4MainScene.objectIdOfSelectedScene
            );

            const clippingGeometry = feature?.geometry as Geometry;

            let rasterFunction: any = null;

            if (job.type === PublishAndDownloadJobType.PublishScene) {
                rasterFunction = createClipRasterFunction({
                    serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                    objectId: queryParams4MainScene?.objectIdOfSelectedScene,
                    token,
                    clippingGeometry,
                });
            } else if (
                job.type === PublishAndDownloadJobType.PublishIndexMask
            ) {
                rasterFunction = createMaskIndexRasterFunction({
                    serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                    objectId: queryParams4MainScene?.objectIdOfSelectedScene,
                    token,
                    bandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
                    pixelValueRange: selectedRange,
                    clippingGeometry,
                });
            } else if (
                job.type === PublishAndDownloadJobType.PublishChangeDetection
            ) {
                rasterFunction = createChangeDetectionRasterFunction({
                    serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                    objectId4EarlierScene:
                        queryParams4MainScene?.objectIdOfSelectedScene,
                    objectId4LaterScene:
                        queryParams4SecondaryScene?.objectIdOfSelectedScene,
                    token,
                    bandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
                    clippingGeometry,
                });
            }

            const response = await publishSceneAsHostedImageryLayer({
                outputServiceName: title, //'hosted-imagery-service-' + new Date().getTime(),
                serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
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
                          title, // 'Esri Landsat Explorer',
                          snippet, // 'A web mapping application for Esri Landsat Explorer',
                          tags: 'Esri Landsat Explorer, Landsat, Landsat-Level-2 Imagery, Remote Sensing',
                      })
                    : await saveImagerySceneAsWebMap({
                          title, // `Landsat Scene (${landsatScene.name})`,
                          snippet, // `Landsat Scene (${landsatScene.name})`,
                          tags: [
                              'Landsat',
                              'Landsat-Level-2 Imagery',
                              'Remote Sensing',
                          ],
                          serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                          serviceName: 'LandsatLevel2',
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
                sceneId: landsatScene?.name,
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

    const { publishOptions, donwloadOptions } = useSaveOptions();

    return (
        <SavePanel
            sceneId={landsatScene?.name}
            publishOptions={publishOptions}
            downloadOptions={donwloadOptions}
            saveButtonOnClick={saveOptionOnClick}
        />
    );
};
