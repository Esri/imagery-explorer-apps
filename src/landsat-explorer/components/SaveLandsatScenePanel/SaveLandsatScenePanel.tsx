import { useSelectedLandsatScene } from '@landsat-explorer/hooks/useSelectedLandsatScene';
import { SavePanel } from '@shared/components/SavePanel';
import { SaveOption } from '@shared/constants/saveOptions';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import { createClipRasterFunction } from '@shared/services/raster-analysis/rasterFunctions';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { createNewRasterAnalysisJob } from '@shared/store/RasterAnalysisJobs/helpers';
import { jobAdded } from '@shared/store/RasterAnalysisJobs/reducer';
import { getToken } from '@shared/utils/esri-oauth';
import React, { useEffect, useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';

export const LandsatSceneSavePanel = () => {
    const dispatch = useDispatch();

    const landsatScene = useSelectedLandsatScene();

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const publishSelectedScene = async () => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        const token = getToken();

        const rasterFunction = await createClipRasterFunction(
            LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
            objectIdOfSelectedScene,
            token
        );

        const response = await publishSceneAsHostedImageryLayer({
            objectId: objectIdOfSelectedScene,
            outputServiceName: 'hosted-imagery-service-' + new Date().getTime(),
            serviceUrl: LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL,
            rasterFunction,
        });
        // console.log('Generate Raster Job submitted', response);

        const jobData = createNewRasterAnalysisJob({
            jobId: response.jobId,
            jobType: SaveOption.PublishScene,
            taskName: 'GenerateRaster',
            sceneId: landsatScene?.name,
        });
        // console.log('jobData', jobData);

        dispatch(jobAdded(jobData));
    };

    const saveOptionOnClick = (option: SaveOption) => {
        // console.log('saveOptionOnClick', option);

        if (option === SaveOption.PublishScene) {
            publishSelectedScene();
        }
    };

    const publishOptions: SaveOption[] = useMemo(() => {
        const output: SaveOption[] = [
            SaveOption.SaveWebMappingApp,
            SaveOption.SaveWebMap,
        ];

        if (objectIdOfSelectedScene) {
            output.push(SaveOption.PublishScene);
        }

        return output;
    }, [objectIdOfSelectedScene]);

    const donwloadOptions: SaveOption[] = useMemo(() => {
        return [SaveOption.DownloadIndexMask];
    }, []);

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
