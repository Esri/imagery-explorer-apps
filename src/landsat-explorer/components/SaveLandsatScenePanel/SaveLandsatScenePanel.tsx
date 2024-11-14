import { useSelectedLandsatScene } from '@landsat-explorer/hooks/useSelectedLandsatScene';
import { SavePanel } from '@shared/components/SavePanel';
import { SaveOption } from '@shared/components/SavePanel/SavePanelContainer';
import { LANDSAT_LEVEL_2_ORIGINAL_SERVICE_URL } from '@shared/services/landsat-level-2/config';
import React, { useEffect, useMemo, useState } from 'react';

export const LandsatSceneSavePanel = () => {
    const landsatScene = useSelectedLandsatScene();

    // const submitJob = useCallback(async () => {
    //     if (!objectIdOfSelectedScene) {
    //         return;
    //     }

    //     try {
    //         const response = await publishSceneAsHostedImageryLayer({
    //             objectId: objectIdOfSelectedScene,
    //             outputServiceName:
    //                 'hosted-imagery-service-' + new Date().getTime(),
    //             serviceUrl: imageryServiceURL,
    //         });
    //         // console.log('Generate Raster Job submitted', response);

    //         const jobData = createNewRasterAnalysisJob({
    //             jobId: response.jobId,
    //             jobType: 'publish scene',
    //             taskName: 'GenerateRaster',
    //             sceneId,
    //         });
    //         // console.log('jobData', jobData);

    //         dispatch(jobAdded(jobData));
    //     } catch (error) {
    //         console.error('Error creating hosted imagery layer', error);
    //     }
    // }, [execute, imageryServiceURL, objectIdOfSelectedScene, sceneId]);

    const saveOptionOnClick = async (option: SaveOption) => {
        console.log('saveOptionOnClick', option);
    };

    const publishOptions: SaveOption[] = useMemo(() => {
        return [
            SaveOption.SaveWebMappingApp,
            SaveOption.SaveWebMap,
            SaveOption.PublishScene,
            SaveOption.PublishIndexMask,
        ];
    }, []);

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
