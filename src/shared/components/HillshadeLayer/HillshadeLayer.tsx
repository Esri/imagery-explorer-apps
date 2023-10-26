import React, { FC, useEffect, useRef } from 'react';

import MapView from '@arcgis/core/views/MapView';
import TileLayer from '@arcgis/core/layers/TileLayer';
import {
    TERRAIN_LAYER_ITEM_ID,
    TERRAIN_LAYER_TITLE,
} from '@shared/constants/map';
import { useSelector } from 'react-redux';
import { selectShowTerrain } from '@shared/store/Map/selectors';

type Props = {
    // containerId?: string;
    mapView?: MapView;
};

export const HillshadeLayer: FC<Props> = ({ mapView }) => {
    const visible = useSelector(selectShowTerrain);

    const terrainLayerRef = useRef<TileLayer>();

    const init = async () => {
        terrainLayerRef.current = new TileLayer({
            title: TERRAIN_LAYER_TITLE,
            portalItem: {
                id: TERRAIN_LAYER_ITEM_ID,
            },
            blendMode: 'multiply',
            opacity: 0.8,
            visible,
        });

        // use index of 2 to place the hillshade layer on top of the imagery layer
        // so the blend mode would make better
        mapView.map.add(terrainLayerRef.current, 2);
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (terrainLayerRef.current) {
            terrainLayerRef.current.visible = visible;
        }
    }, [visible]);

    return null;
};
