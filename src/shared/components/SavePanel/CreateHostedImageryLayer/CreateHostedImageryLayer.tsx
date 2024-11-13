import { publishSceneAsHostedImageryLayer } from '@shared/services/raster-analysis/publishSceneAsHostedImageryLayer';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import React, { FC } from 'react';
import { useSelector } from 'react-redux';

type CreateHostedImageryLayerProps = {
    /**
     * URL of the imagery service to be used for the generate raster job.
     */
    imageryServiceURL: string;
};

export const CreateHostedImageryLayer: FC<CreateHostedImageryLayerProps> = ({
    imageryServiceURL,
}) => {
    const { objectIdOfSelectedScene } =
        useSelector(selectQueryParams4SceneInSelectedMode) || {};

    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const [error, setError] = React.useState<string | null>(null);

    const submitJob = async () => {
        if (!objectIdOfSelectedScene) {
            return;
        }

        try {
            setIsSubmitting(true);

            setError(null);

            const response = await publishSceneAsHostedImageryLayer({
                objectId: objectIdOfSelectedScene,
                outputServiceName:
                    'hosted-imagery-service-' + new Date().getTime(),
                serviceUrl: imageryServiceURL,
            });

            console.log('Generate Raster Job submitted', response);
        } catch (error) {
            console.error('Error creating hosted imagery layer', error);

            setError(error?.message || 'unknown error');
        }

        setIsSubmitting(false);
    };

    return (
        <div>
            {error && (
                <div>
                    <p>
                        <span className=" opacity-50">
                            Failed to publish imagery scene:
                        </span>
                    </p>
                    <p>{error}</p>
                </div>
            )}

            {isSubmitting && (
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
