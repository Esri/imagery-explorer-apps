import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import { getThemedMapPointGraphic } from '../MapView/helpers';

type Props = {
    queryLocation: Point;
    visible: boolean;
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const AnalysisToolQueryLocation: FC<Props> = ({
    queryLocation,
    visible,
    mapView,
    groupLayer,
}) => {
    const graphicLayerRef = useRef<GraphicsLayer>();

    const init = async () => {
        try {
            graphicLayerRef.current = new GraphicsLayer({
                // effect: 'drop-shadow(2px, 2px, 3px, #000)',
                visible,
            });

            groupLayer.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const showQueryLocation = async () => {
        try {
            graphicLayerRef.current.removeAll();

            const point = getThemedMapPointGraphic(queryLocation);

            graphicLayerRef.current.add(point);
        } catch (err) {
            console.error(err);
        }
    };

    // useEffect(() => {
    //     if (!mapView) {
    //         return;
    //     }

    //     if (!graphicLayerRef.current) {
    //         init();
    //     }
    // }, [mapView]);

    useEffect(() => {
        (async () => {
            if (!groupLayer) {
                return;
            }

            if (!graphicLayerRef.current) {
                await init();
            }

            if (!queryLocation) {
                graphicLayerRef.current.removeAll();
            } else {
                showQueryLocation();
            }
        })();
    }, [queryLocation, groupLayer]);

    useEffect(() => {
        if (!graphicLayerRef.current) {
            return;
        }

        graphicLayerRef.current.visible = visible;
    }, [visible]);

    return null;
};
