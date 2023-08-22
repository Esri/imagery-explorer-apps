import React, { FC, useEffect, useRef } from 'react';

import { loadModules } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import ITileLayer from 'esri/layers/TileLayer';
import {
    TERRAIN_LAYER_ITEM_ID,
    TERRAIN_LAYER_TITLE,
} from '@shared/constants/map';
import { useSelector } from 'react-redux';
import { selectShowTerrain } from '@shared/store/Map/selectors';

type Props = {
    // containerId?: string;
    mapView?: IMapView;
};

export const HillshadeLayer: FC<Props> = ({ mapView }) => {
    const visible = useSelector(selectShowTerrain);

    const terrainLayerRef = useRef<ITileLayer>();

    const init = async () => {
        type Modules = [typeof ITileLayer];

        const [TileLayer] = await (loadModules([
            'esri/layers/TileLayer',
        ]) as Promise<Modules>);

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
