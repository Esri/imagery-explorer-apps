import { useSelectedLandsatScene } from '@landsat-explorer/hooks/useSelectedLandsatScene';
import { SavePanel } from '@shared/components/SavePanel';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import {
    createClipRasterFunction,
    createMaskIndexRasterFunction,
} from '@shared/services/raster-analysis/rasterFunctions';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSaveOptions } from './useSaveOptions';
import { createNewSaveJob, updateSaveJob } from '@shared/store/SaveJobs/thunks';

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
    SaveJob,
    SaveJobStatus,
    SaveJobType,
} from '@shared/store/SaveJobs/reducer';
import { createWebMappingApplication } from '@shared/services/arcgis-online/createWebMappingApplication';
import { saveImagerySceneAsWebMap } from '@shared/services/arcgis-online/createWebMap';
import { selectMapExtent } from '@shared/store/Map/selectors';

export const LandsatSceneSavePanel = () => {
    const dispatch = useDispatch();

    const landsatScene = useSelectedLandsatScene();

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

    const spectralIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const mapExtent = useSelector(selectMapExtent);

    const publishSelectedScene = async (job: SaveJob) => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        const token = getToken();

        try {
            const feature = await getLandsatFeatureByObjectId(
                objectIdOfSelectedScene
            );

            const clippingGeometry = feature?.geometry as Geometry;

            let rasterFunction: any = null;

            if (job.type === SaveJobType.PublishScene) {
                rasterFunction = createClipRasterFunction({
                    serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                    objectId: objectIdOfSelectedScene,
                    token,
                    clippingGeometry,
                });
            } else if (job.type === SaveJobType.PublishIndexMask) {
                rasterFunction = createMaskIndexRasterFunction({
                    serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                    objectId: objectIdOfSelectedScene,
                    token,
                    bandIndexes: getBandIndexesBySpectralIndex(spectralIndex),
                    pixelValueRange: selectedRange,
                    clippingGeometry,
                });
            }

            const response = await publishSceneAsHostedImageryLayer({
                objectId: objectIdOfSelectedScene,
                outputServiceName:
                    'hosted-imagery-service-' + new Date().getTime(),
                serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                rasterFunction,
            });
            // console.log('Generate Raster Job submitted', response);

            dispatch(
                updateSaveJob({
                    ...job,
                    rasterAnanlysisJobId: response.rasterAnalysisJobId,
                    rasterAnalysisTaskName: 'GenerateRaster',
                    outputURL: response.outputServiceUrl,
                    outputItemId: response.outputItemId,
                })
            );
        } catch (err) {
            dispatch(
                updateSaveJob({
                    ...job,
                    status: SaveJobStatus.Failed,
                    errormessage: `Failed to publish scene: ${
                        err.message || 'unknown error'
                    }`,
                })
            );
        }
    };

    const createNewItemInArcGISOnline = async (job: SaveJob) => {
        try {
            const res =
                job.type === SaveJobType.SaveWebMappingApp
                    ? await createWebMappingApplication({
                          title: 'Esri Landsat Explorer',
                          snippet:
                              'A web mapping application for Esri Landsat Explorer',
                          tags: 'Esri Landsat Explorer, Landsat, Landsat-Level-2 Imagery, Remote Sensing',
                      })
                    : await saveImagerySceneAsWebMap({
                          title: `Landsat Scene (${landsatScene.name})`,
                          snippet: `Landsat Scene (${landsatScene.name})`,
                          serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                          serviceName: 'LandsatLevel2',
                          objectIdOfSelectedScene: objectIdOfSelectedScene,
                          mapExtent,
                      });

            dispatch(
                updateSaveJob({
                    ...job,
                    status: SaveJobStatus.Succeeded,
                    outputItemId: res.id,
                })
            );
        } catch (err) {
            dispatch(
                updateSaveJob({
                    ...job,
                    status: SaveJobStatus.Failed,
                    errormessage: `Failed to create ArcGIS Online item: ${
                        err.message || 'unknown error'
                    }`,
                })
            );
        }
    };

    const saveOptionOnClick = async (jobType: SaveJobType) => {
        // console.log('saveOptionOnClick', option);

        const job = await dispatch(
            createNewSaveJob({
                jobType,
                sceneId: landsatScene?.name,
            })
        );

        if (
            jobType === SaveJobType.PublishScene ||
            jobType === SaveJobType.PublishIndexMask
        ) {
            publishSelectedScene(job);
            return;
        }

        if (
            jobType === SaveJobType.SaveWebMappingApp ||
            jobType === SaveJobType.SaveWebMap
        ) {
            createNewItemInArcGISOnline(job);
            return;
        }
    };

    const { publishOptions, donwloadOptions } = useSaveOptions();

    return (
        <SavePanel
            sceneId={landsatScene?.name}
            publishOptions={publishOptions}
            downloadOptions={donwloadOptions}
            saveOptionOnClick={saveOptionOnClick}
        />
    );
};
