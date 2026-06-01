import TileLayer from '@arcgis/core/layers/TileLayer';
import React, { useEffect } from 'react';

export const useBasemapLayerForSwipeWidget = ({
    visible,
}: {
    visible: boolean;
}) => {
    const basemapRef = React.useRef<TileLayer>(null);

    const [basemapLayer, setBasemapLayer] = React.useState<TileLayer>();

    useEffect(() => {
        if (!basemapRef.current) {
            basemapRef.current = new TileLayer({
                portalItem: {
                    id: '10df2279f9684e4a9f6a7f08febac2a9', // World Imagery
                },
                visible,
            });

            setBasemapLayer(basemapRef.current);
        }
    }, []);

    useEffect(() => {
        if (basemapRef.current) {
            basemapRef.current.visible = visible;
        }
    }, [visible]);

    return basemapLayer;
};
