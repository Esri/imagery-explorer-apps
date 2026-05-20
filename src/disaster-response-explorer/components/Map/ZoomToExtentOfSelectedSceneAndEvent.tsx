import Extent from '@arcgis/core/geometry/Extent';
import MapView from '@arcgis/core/views/MapView';
import { DISASTER_RESPONSE_IMAGERY_SERVICE_URL } from '@shared/services/disaster-response/config';
import { getEventExtent } from '@shared/services/disaster-response/getEventExtent';
import { getExtentByObjectId } from '@shared/services/helpers/getExtentById';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectDisasterResponseEvents,
    selectSelectedEventName,
} from '@shared/store/DisasterResponse/selectors';
import {
    selectAppMode,
    selectQueryParams4SceneInSelectedMode,
} from '@shared/store/ImageryScene/selectors';
import { selectIsAnimationPlaying } from '@shared/store/UI/selectors';
import { is } from 'date-fns/locale';
import React, { FC, useEffect } from 'react';

type Props = {
    mapView?: MapView;
};

export const ZoomToExtentOfSelectedSceneAndEvent: FC<Props> = ({ mapView }) => {
    const queryParamsForSelectedScene = useAppSelector(
        selectQueryParams4SceneInSelectedMode
    );

    const mode = useAppSelector(selectAppMode);

    const isAnimationPlaying = useAppSelector(selectIsAnimationPlaying);

    const selectedEvent = useAppSelector(selectSelectedEventName);

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

    const zoomToEvent = async (eventName: string) => {
        try {
            const extent = await getEventExtent({
                eventName,
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
            console.error('failed to get extent for event ' + eventName, error);
        }
    };

    // useEffect(() => {
    //     if (!queryParamsForSelectedScene) {
    //         return;
    //     }

    //     // no need to zoom to scene when in swipe mode or animation is playing
    //     if (mode === 'swipe' || isAnimationPlaying) {
    //         return;
    //     }

    //     const objectId = queryParamsForSelectedScene.objectIdOfSelectedScene;

    //     // if there is an object id in the query params for the selected scene, zoom to that scene
    //     if (objectId) {
    //         zommToScene(objectId);
    //         return;
    //     }

    //     if (selectedEvent) {
    //         zoomToEvent(selectedEvent);
    //     }
    // }, [queryParamsForSelectedScene, selectedEvent, mode, isAnimationPlaying]);

    useEffect(() => {
        // no need to zoom to event when in swipe mode or animation is playing
        if (isAnimationPlaying) {
            return;
        }

        if (selectedEvent) {
            zoomToEvent(selectedEvent);
        }
    }, [selectedEvent, isAnimationPlaying]);

    return null;
};
