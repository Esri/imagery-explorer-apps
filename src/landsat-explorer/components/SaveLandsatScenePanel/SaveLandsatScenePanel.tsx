import { useSelectedLandsatScene } from '@landsat-explorer/hooks/useSelectedLandsatScene';
import { SavePanel } from '@shared/components/SavePanel';
import { SaveOption } from '@shared/constants/saveOptions';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import {
    createClipRasterFunction,
    createMaskIndexRasterFunction,
} from '@shared/services/raster-analysis/rasterFunctions';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { generateRasterAnalysisJobData } from '@shared/store/RasterAnalysisJobs/helpers';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { useSaveOptions } from './useSaveOptions';
import { addNewRasterAnalysisJob } from '@shared/store/RasterAnalysisJobs/thunks';

import {
    selectMaskLayerPixelValueRange,
    selectSelectedIndex4MaskTool,
} from '@shared/store/MaskTool/selectors';
import { SpectralIndex } from '@typing/imagery-service';
import { getBandIndexesBySpectralIndex } from '@shared/services/landsat-level-2/helpers';

export const LandsatSceneSavePanel = () => {
    const dispatch = useDispatch();

    const landsatScene = useSelectedLandsatScene();

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const { selectedRange } = useSelector(selectMaskLayerPixelValueRange);

    const spectralIndex = useSelector(
        selectSelectedIndex4MaskTool
    ) as SpectralIndex;

    const publishSelectedScene = async (saveOption: SaveOption) => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        const token = getToken();

        let rasterFunction: any = null;

        if (saveOption === SaveOption.PublishScene) {
            rasterFunction = await createClipRasterFunction(
                LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                objectIdOfSelectedScene,
                token
            );
        } else if (saveOption === SaveOption.PublishIndexMask) {
            rasterFunction = await createMaskIndexRasterFunction(
                LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
                objectIdOfSelectedScene,
                token,
                getBandIndexesBySpectralIndex(spectralIndex),
                selectedRange
            );
        }

        const response = await publishSceneAsHostedImageryLayer({
            objectId: objectIdOfSelectedScene,
            outputServiceName: 'hosted-imagery-service-' + new Date().getTime(),
            serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
            rasterFunction,
        });
        // console.log('Generate Raster Job submitted', response);

        const jobData = generateRasterAnalysisJobData({
            jobId: response.jobId,
            jobType: saveOption,
            taskName: 'GenerateRaster',
            sceneId: landsatScene?.name,
        });
        // console.log('jobData', jobData);

        dispatch(addNewRasterAnalysisJob(jobData));
    };

    const saveOptionOnClick = (option: SaveOption) => {
        // console.log('saveOptionOnClick', option);

        if (
            option === SaveOption.PublishScene ||
            option === SaveOption.PublishIndexMask
        ) {
            publishSelectedScene(option);
        }
    };

    const { publishOptions, donwloadOptions } = useSaveOptions();

    return (
        <SavePanel
            // imageryServiceURL={LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL}
            sceneId={landsatScene?.name}
            publishOptions={publishOptions}
            donwloadOptions={donwloadOptions}
            saveOptionOnClick={saveOptionOnClick}
        />
    );
};
