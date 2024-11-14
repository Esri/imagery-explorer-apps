import { useAsync } from '@shared/hooks/useAsync';
import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import { createNewRasterAnalysisJob } from '@shared/store/RasterAnalysisJobs/helpers';
import { jobAdded } from '@shared/store/RasterAnalysisJobs/reducer';
import React, { FC, useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';

type CreateHostedImageryLayerProps = {
    /**
     * URL of the imagery service to be used for the generate raster job.
     */
    imageryServiceURL: string;
    /**
     * ID of the scene to be used for the generate raster job.
     */
    sceneId: string;
};

export const CreateHostedImageryLayer: FC<CreateHostedImageryLayerProps> = ({
    imageryServiceURL,
    sceneId,
}) => {
    const dispatch = useDispatch();

    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const { isLoading, error, execute } = useAsync(
        publishSceneAsHostedImageryLayer
    );

    const submitJob = useCallback(async () => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        try {
            const response = await execute({
                objectId: objectIdOfSelectedScene,
                outputServiceName:
                    'hosted-imagery-service-' + new Date().getTime(),
                serviceUrl: imageryServiceURL,
            });
            // console.log('Generate Raster Job submitted', response);

            const jobData = createNewRasterAnalysisJob({
                jobId: response.jobId,
                jobType: 'publish scene',
                taskName: 'GenerateRaster',
                sceneId,
            });
            // console.log('jobData', jobData);

            dispatch(jobAdded(jobData));
        } catch (error) {
            console.error('Error creating hosted imagery layer', error);
        }
    }, [execute, imageryServiceURL, objectIdOfSelectedScene, sceneId]);

    return (
        <div>
            {error && (
                <div>
                    <p>
                        <span className=" opacity-50">
                            Failed to publish imagery scene:
                        </span>
                    </p>
                    <p>{error?.message}</p>
                </div>
            )}

            {isLoading && (
                <div>
                    <calcite-loader></calcite-loader>
                </div>
            )}

            <calcite-button onClick={submitJob}>
                Create Hosted Imagery
            </calcite-button>
        </div>
    );
};
