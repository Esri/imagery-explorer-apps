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
    SaveJob,
    SaveJobStatus,
    SaveJobType,
} from '@shared/store/SaveJobs/reducer';

export const LandsatSceneSavePanel = () => {
    const dispatch = useDispatch();

    const landsatScene = useSelectedLandsatScene();

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

    const spectralIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

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
