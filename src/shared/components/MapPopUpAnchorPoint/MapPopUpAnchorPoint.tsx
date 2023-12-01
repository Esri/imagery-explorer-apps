import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import { getThemedMapPointGraphic } from '../MapView/helpers';

type Props = {
    anchorLocation: Point;
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const MapPopUpAnchorPoint: FC<Props> = ({
    anchorLocation,
    mapView,
    groupLayer,
}) => {
    const graphicLayerRef = useRef<GraphicsLayer>();

    const init = async () => {
        try {
            graphicLayerRef.current = new GraphicsLayer();

            groupLayer.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const showAnchorPoint = async () => {
        try {
            graphicLayerRef.current.removeAll();

            const point = getThemedMapPointGraphic(anchorLocation);

            graphicLayerRef.current.add(point);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            if (!groupLayer) {
                return;
            }

            if (!graphicLayerRef.current) {
                await init();
            }

            if (!anchorLocation) {
                graphicLayerRef.current.removeAll();
            } else {
                showAnchorPoint();
            }
        })();
    }, [anchorLocation, groupLayer]);

    return null;
};
