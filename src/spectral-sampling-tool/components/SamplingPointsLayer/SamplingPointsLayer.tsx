import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import React, { FC, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { getThemedMapPointGraphic } from '@shared/components/MapView/helpers';

type Props = {
    /**
     * selected sampling point that will be displayed the map
     */
    selectedPoint: Point;
    /**
     * group layer to add the points Grphic Layer to
     */
    groupLayer?: GroupLayer;
    /**
     * map view
     */
    mapView?: MapView;
};

export const SamplingPoints: FC<Props> = ({
    // points,
    selectedPoint,
    groupLayer,
    mapView,
}) => {
    const graphicLayerRef = useRef<GraphicsLayer>();

    const init = () => {
        graphicLayerRef.current = new GraphicsLayer();
        groupLayer.add(graphicLayerRef.current);
    };

    const toggleDisplaySelectedSamplingPoint = () => {
        graphicLayerRef.current.removeAll();

        if (selectedPoint) {
            const graphic = getThemedMapPointGraphic(selectedPoint);

            graphicLayerRef.current.add(graphic);

            mapView.goTo({
                center: [selectedPoint.longitude, selectedPoint.latitude],
            });
        }
    };

    useEffect(() => {
        if (!graphicLayerRef.current) {
            init();
        }

        toggleDisplaySelectedSamplingPoint();
    }, [selectedPoint]);

    return null;
};
