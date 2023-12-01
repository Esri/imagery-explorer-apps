import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import React, { FC, useEffect, useRef } from 'react';
import MapAnchorImage from '@shared/statics/img/map-anchor.png';
import { SizeOfMapAnchorImage } from '@shared/constants/UI';
import MapView from '@arcgis/core/views/MapView';

type Props = {
    /**
     * list of sampling points added by the user
     */
    points: Point[];
    /**
     * selected sampling point that will be used to update the center of the map
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
    points,
    selectedPoint,
    groupLayer,
    mapView,
}) => {
    const graphicLayerRef = useRef<GraphicsLayer>();

    const init = () => {
        graphicLayerRef.current = new GraphicsLayer();
        groupLayer.add(graphicLayerRef.current);
    };

    const showUpdatedSamplingPoints = () => {
        graphicLayerRef.current.removeAll();

        for (const point of points) {
            const graphic = new Graphic({
                geometry: {
                    type: 'point',
                    ...point,
                },
                symbol: {
                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                    url: MapAnchorImage,
                    width: `${SizeOfMapAnchorImage}px`,
                    height: `${SizeOfMapAnchorImage}px`,
                } as any,
            });

            graphicLayerRef.current.add(graphic);
        }
    };

    useEffect(() => {
        if (!graphicLayerRef.current) {
            init();
        }

        showUpdatedSamplingPoints();
    }, [points]);

    useEffect(() => {
        if (selectedPoint) {
            mapView.goTo({
                center: [selectedPoint.longitude, selectedPoint.latitude],
            });
        }
    }, [selectedPoint]);

    return null;
};
