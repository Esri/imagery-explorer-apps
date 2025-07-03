import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useMemo, useRef, useState } from 'react';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectQueryParams4SceneInSelectedMode,
    selectAppMode,
    selectActiveAnalysisTool,
} from '@shared/store/ImageryScene/selectors';
import { selectAnimationStatus } from '@shared/store/UI/selectors';
import { selectChangeCompareLayerIsOn } from '@shared/store/ChangeCompareTool/selectors';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import { getFeatureByObjectId } from '@shared/services/helpers/getFeatureById';
import Graphic from '@arcgis/core/Graphic';
import Polygon from '@arcgis/core/geometry/Polygon';

type Props = {
    serviceUrl: string;
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const FootPrintOfSelectedScene: FC<Props> = ({
    serviceUrl,
    mapView,
    groupLayer,
}) => {
    const mode = useAppSelector(selectAppMode);

    const { objectIdOfSelectedScene } =
        useAppSelector(selectQueryParams4SceneInSelectedMode) || {};

    const animationStatus = useAppSelector(selectAnimationStatus);

    const analysisTool = useAppSelector(selectActiveAnalysisTool);

    const changeCompareLayerIsOn = useAppSelector(selectChangeCompareLayerIsOn);

    const isVisible = useMemo(() => {
        if (mode === 'dynamic' || mode === 'animate' || mode === 'swipe') {
            return false;
        }

        if (mode === 'find a scene') {
            return objectIdOfSelectedScene !== null;
        }

        if (mode === 'analysis') {
            // no need to show imagery layer when user is viewing change layer in the change compare tool
            if (analysisTool === 'change' && changeCompareLayerIsOn) {
                return false;
            }

            // no need to show imagery layer when user is using the 'temporal composite' tool
            if (analysisTool === 'temporal composite') {
                return false;
            }

            return objectIdOfSelectedScene !== null;
        }

        return false;
    }, [
        mode,
        objectIdOfSelectedScene,
        analysisTool,
        changeCompareLayerIsOn,
        animationStatus,
    ]);

    const objectId = useMemo(() => {
        // should ignore the object id of selected scene if in dynamic mode,
        if (mode === 'dynamic') {
            return null;
        }

        return objectIdOfSelectedScene;
    }, [mode, objectIdOfSelectedScene]);

    const showFootPrint = async (objectId: number) => {
        if (!mapView || !serviceUrl) {
            return;
        }

        try {
            const feature = await getFeatureByObjectId(serviceUrl, objectId);

            if (!feature || !feature.geometry) {
                return;
            }

            const geometry = feature.geometry as any;
            // console.log('Footprint geometry:', geometry);

            if (
                !geometry.rings ||
                geometry.rings.length === 0 ||
                !geometry.spatialReference
            ) {
                return;
            }

            const graphic = new Graphic({
                geometry: new Polygon({
                    rings: geometry.rings,
                    spatialReference: geometry.spatialReference,
                }),
                symbol: {
                    type: 'simple-fill',
                    color: [255, 255, 255, 1],
                    outline: {
                        color: [255, 255, 255],
                        width: 0,
                    },
                } as any,
            });

            footprintLayerRef.current.add(graphic);
        } catch (error) {
            console.error('Error fetching feature:', error);
        }
    };

    const footprintLayerRef = useRef<GraphicsLayer>(
        new GraphicsLayer({
            blendMode: 'multiply',
            effect: 'drop-shadow(0px 0px 5px #000)',
        })
    );

    useEffect(() => {
        if (!footprintLayerRef.current || !mapView) {
            return;
        }

        footprintLayerRef.current.removeAll();

        if (!objectId) {
            return;
        }

        showFootPrint(objectId);
    }, [objectId]);

    useEffect(() => {
        if (!footprintLayerRef.current || !mapView) {
            return;
        }

        footprintLayerRef.current.visible = isVisible;
    }, [isVisible]);

    useEffect(() => {
        if (mapView && footprintLayerRef.current) {
            mapView.map.add(footprintLayerRef.current);
            // mapView.reorder(footprintLayerRef.current, 0);
        }
    }, [mapView, footprintLayerRef.current]);

    return null;
};
