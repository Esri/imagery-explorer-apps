import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';
import { UrbanAreaLayerServiceURL } from './config';

type UrbanAreaLayerProps = {
    mapView?: MapView;
    visible: boolean;
};

export const UrbanAreaLayer: FC<UrbanAreaLayerProps> = ({
    mapView,
    visible,
}) => {
    const urbanAreaLayerRef = React.useRef<FeatureLayer>(null);

    const initializeUrbanAreaLayer = () => {
        if (urbanAreaLayerRef.current) return;

        const urbanAreaLayer = new FeatureLayer({
            url: UrbanAreaLayerServiceURL,
            title: 'Urban Areas',
            visible: visible,
            effect: 'drop-shadow(0px 0px 5px #000)',
            renderer: {
                type: 'simple',
                symbol: {
                    type: 'simple-fill',
                    color: [191, 238, 254, 0.5],
                    outline: {
                        color: [191, 238, 254, 1],
                        width: 2,
                    },
                },
            },
        });

        mapView.map.add(urbanAreaLayer);
        urbanAreaLayerRef.current = urbanAreaLayer;
    };

    useEffect(() => {
        if (!mapView) return;

        initializeUrbanAreaLayer();
    }, [mapView]);

    useEffect(() => {
        if (urbanAreaLayerRef.current) {
            urbanAreaLayerRef.current.visible = visible;
        }
    }, [visible]);

    return null;
};
