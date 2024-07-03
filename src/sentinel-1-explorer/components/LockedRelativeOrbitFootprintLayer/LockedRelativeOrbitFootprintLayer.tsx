import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import Graphic from '@arcgis/core/Graphic';
import { IFeature } from '@esri/arcgis-rest-feature-service';
import React, { FC, useEffect, useMemo, useRef } from 'react';
import { Point, Polygon } from '@arcgis/core/geometry';

type Props = {
    visible: boolean;
    mapView?: MapView;
    groupLayer?: GroupLayer;
    /**
     * feature that provides geometry of the foot print
     */
    footPrintFeature: IFeature;
};

export const LockedRelativeOrbitFootprintLayer: FC<Props> = ({
    visible,
    mapView,
    groupLayer,
    footPrintFeature,
}) => {
    const footprintLayer = useRef<GraphicsLayer>();

    const init = () => {
        footprintLayer.current = new GraphicsLayer({
            visible,
        });

        groupLayer.add(footprintLayer.current);
    };

    useEffect(() => {
        if (!footprintLayer.current) {
            init();
        }
    }, [groupLayer]);

    useEffect(() => {
        if (footprintLayer.current) {
            footprintLayer.current.visible = visible;
        }
    }, [visible]);

    useEffect(() => {
        if (!footprintLayer.current) {
            return;
        }

        footprintLayer.current.removeAll();

        if (footPrintFeature) {
            const geometry = footPrintFeature.geometry as any;

            const graphic = new Graphic({
                geometry: new Polygon({
                    rings: geometry.rings,
                    spatialReference: geometry.spatialReference,
                }),
                symbol: {
                    type: 'simple-fill', // autocasts as new SimpleFillSymbol()
                    color: [0, 35, 47, 0.2],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [191, 238, 254, 1],
                        width: 1,
                    },
                } as any,
            });

            footprintLayer.current.add(graphic);
        }
    }, [footPrintFeature]);

    return null;
};
