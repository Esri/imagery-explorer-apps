import TileLayer from '@arcgis/core/layers/TileLayer';
import { WORLD_IMAGERY_BASEMAP_LAYER_ITEM_ID } from '@shared/constants/map';
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
                    id: WORLD_IMAGERY_BASEMAP_LAYER_ITEM_ID,
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
