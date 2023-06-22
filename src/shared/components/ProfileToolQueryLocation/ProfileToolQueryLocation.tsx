import { loadModules } from 'esri-loader';
import IGraphic from 'esri/Graphic';
import { Point } from 'esri/geometry';
import IGraphicsLayer from 'esri/layers/GraphicsLayer';
import MapView from 'esri/views/MapView';
import React, { FC, useEffect, useRef } from 'react';

type Props = {
    queryLocation: Point;
    mapView?: MapView;
};

export const ProfileToolQueryLocation: FC<Props> = ({
    queryLocation,
    mapView,
}) => {
    const graphicLayerRef = useRef<IGraphicsLayer>();

    const init = async () => {
        type Modules = [typeof IGraphicsLayer];

        try {
            const [GraphicsLayer] = await (loadModules([
                'esri/layers/GraphicsLayer',
            ]) as Promise<Modules>);

            graphicLayerRef.current = new GraphicsLayer();

            mapView.map.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const showQueryLocation = async () => {
        type Modules = [typeof IGraphic];

        try {
            const [Graphic] = await (loadModules([
                'esri/layers/Graphic',
            ]) as Promise<Modules>);

            const point = new Graphic({
                geometry: queryLocation,
                symbol: {
                    type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                    color: [226, 119, 40],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [255, 255, 255],
                        width: 2,
                    },
                } as any,
            });

            graphicLayerRef.current.add(point);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (!mapView) {
            return;
        }

        if (!graphicLayerRef.current) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (!mapView || !graphicLayerRef.current) {
            return;
        }

        if (!queryLocation) {
            graphicLayerRef.current.removeAll();
        } else {
            showQueryLocation();
        }
    }, [queryLocation]);

    return null;
};
