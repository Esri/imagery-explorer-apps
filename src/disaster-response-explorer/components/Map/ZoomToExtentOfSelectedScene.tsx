import Extent from '@arcgis/core/geometry/Extent';
import MapView from '@arcgis/core/views/MapView';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { getExtentByObjectId } from '@shared/services/helpers/getExtentById';
import { useAppSelector } from '@shared/store/configureStore';
import { selectQueryParams4SceneInSelectedMode } from '@shared/store/ImageryScene/selectors';
import React, { FC, useEffect } from 'react';

type Props = {
    mapView?: MapView;
};

export const ZoomToExtentOfSelectedScene: FC<Props> = ({ mapView }) => {
    const queryParamsForSelectedScene = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const zommToScene = async (objectId: number) => {
        try {
            const extent = await getExtentByObjectId({
                objectId,
                serviceUrl: DISASTER_RESPONSE_IMAGERY_SERVICE_URL,
            });

            if (extent) {
                mapView.goTo({
                    target: new Extent({
                        xmin: extent.xmin,
                        ymin: extent.ymin,
                        xmax: extent.xmax,
                        ymax: extent.ymax,
                        spatialReference: extent.spatialReference,
                    }),
                });
            }
        } catch (error) {
            console.error(
                'failed to get extent for object id ' + objectId,
                error
            );
        }
    };

    useEffect(() => {
        if (!queryParamsForSelectedScene) {
            return;
        }

        const objectId = queryParamsForSelectedScene.objectIdOfSelectedScene;

        if (!objectId) {
            return;
        }

        zommToScene(objectId);
    }, [queryParamsForSelectedScene]);

    return null;
};
