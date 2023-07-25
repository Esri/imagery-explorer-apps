import { loadModules } from 'esri-loader';
import IGraphic from 'esri/Graphic';
import { Point } from 'esri/geometry';
import IGraphicsLayer from 'esri/layers/GraphicsLayer';
import GroupLayer from 'esri/layers/GroupLayer';
import MapView from 'esri/views/MapView';
import React, { FC, useEffect, useRef } from 'react';

type Props = {
    queryLocation: Point;
    visible: boolean;
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const ProfileToolQueryLocation: FC<Props> = ({
    queryLocation,
    visible,
    mapView,
    groupLayer,
}) => {
    const graphicLayerRef = useRef<IGraphicsLayer>();

    const init = async () => {
        type Modules = [typeof IGraphicsLayer];

        try {
            const [GraphicsLayer] = await (loadModules([
                'esri/layers/GraphicsLayer',
            ]) as Promise<Modules>);

            graphicLayerRef.current = new GraphicsLayer({
                effect: 'drop-shadow(2px, 2px, 3px, #000)',
                visible,
            });

            groupLayer.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const showQueryLocation = async () => {
        type Modules = [typeof IGraphic];

        try {
            const [Graphic] = await (loadModules([
                'esri/Graphic',
            ]) as Promise<Modules>);

            graphicLayerRef.current.removeAll();

            const point = new Graphic({
                geometry: {
                    type: 'point',
                    ...queryLocation,
                },
                symbol: {
                    type: 'simple-marker', // autocasts as new SimpleMarkerSymbol()
                    color: [0, 35, 47, 0.9],
                    outline: {
                        // autocasts as new SimpleLineSymbol()
                        color: [191, 238, 254],
                        width: 1,
                    },
                } as any,
            });

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
