import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import { UrbanAreaLayerServiceURL } from './config';
import { useQueryUrbanAreaFeature } from './useQueryUrbanAreaFeature';
import { useAppSelector } from '@shared/store/configureStore';
import { selectSelectedUrbanAreaFeature } from '@shared/store/UrbanHeatIslandTool/selectors';

type UrbanAreaLayerProps = {
    mapView?: MapView;
    visible: boolean;
};

export const UrbanAreaLayer: FC<UrbanAreaLayerProps> = ({
    mapView,
    visible,
}) => {
    const urbanAreaLayerRef = React.useRef<FeatureLayer>(null);

    const selectedFeature = useAppSelector(selectSelectedUrbanAreaFeature);

    /**
     * Reference to the highlight handle
     */
    const highlightHandle = useRef<__esri.Handle>(null);

    /**
     * Reference to the layer view of the urban area layer
     */
    const layerViewRef = useRef<__esri.FeatureLayerView>(null);

    useQueryUrbanAreaFeature(urbanAreaLayerRef.current);

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

        urbanAreaLayer.when(() => {
            mapView
                .whenLayerView(urbanAreaLayer)
                .then((layerView) => {
                    layerViewRef.current = layerView as __esri.FeatureLayerView;
                })
                .catch((error) => {
                    console.error('Error getting layer view:', error);
                });
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

    useEffect(() => {
        if (!layerViewRef.current) return;

        if (highlightHandle.current) {
            highlightHandle.current.remove();
            highlightHandle.current = null;
        }

        // highlight the selected urban area feature
        if (selectedFeature) {
            highlightHandle.current = layerViewRef.current.highlight([
                selectedFeature.OBJECTID,
            ]);
        }
    }, [selectedFeature, layerViewRef.current]);

    return null;
};
