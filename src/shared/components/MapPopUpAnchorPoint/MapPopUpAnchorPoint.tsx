import { loadModules } from 'esri-loader';
import IGraphic from 'esri/Graphic';
import { Point } from 'esri/geometry';
import IGraphicsLayer from 'esri/layers/GraphicsLayer';
import GroupLayer from 'esri/layers/GroupLayer';
import MapView from 'esri/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import IconImage from './icon.png';

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
    const graphicLayerRef = useRef<IGraphicsLayer>();

    const init = async () => {
        type Modules = [typeof IGraphicsLayer];

        try {
            const [GraphicsLayer] = await (loadModules([
                'esri/layers/GraphicsLayer',
            ]) as Promise<Modules>);

            graphicLayerRef.current = new GraphicsLayer();

            groupLayer.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const showAnchorPoint = async () => {
        type Modules = [typeof IGraphic];

        try {
            const [Graphic] = await (loadModules([
                'esri/Graphic',
            ]) as Promise<Modules>);

            graphicLayerRef.current.removeAll();

            const point = new Graphic({
                geometry: {
                    type: 'point',
                    ...anchorLocation,
                },
                symbol: {
                    type: 'picture-marker', // autocasts as new PictureMarkerSymbol()
                    url: IconImage,
                    width: '44px',
                    height: '44px',
                } as any,
            });

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
