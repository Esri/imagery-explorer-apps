/* Copyright 2025 Esri
 *
 * Licensed under the Apache License Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React, { FC, useEffect, useRef } from 'react';

import MapView from '@arcgis/core/views/MapView';
import TileLayer from '@arcgis/core/layers/TileLayer';
import {
    TERRAIN_LAYER_ITEM_ID,
    TERRAIN_LAYER_TITLE,
} from '@shared/constants/map';
import { useAppSelector } from '@shared/store/configureStore';
import { selectShowTerrain } from '@shared/store/Map/selectors';

type Props = {
    // containerId?: string;
    mapView?: MapView;
};

/**
 * Creates and returns a configured TileLayer instance for displaying hillshade terrain.
 *
 * @param visible - Determines whether the hillshade layer should be visible on the map.
 * @returns A new TileLayer instance with predefined settings for hillshade visualization.
 */
export const getHillshadeLayer = (visible: boolean) => {
    return new TileLayer({
        title: TERRAIN_LAYER_TITLE,
        portalItem: {
            id: TERRAIN_LAYER_ITEM_ID,
        },
        blendMode: 'multiply',
        opacity: 0.8,
        visible,
    });
};

export const HillshadeLayer: FC<Props> = ({ mapView }) => {
    const visible = useAppSelector(selectShowTerrain);

    const terrainLayerRef = useRef<TileLayer>(null);

    const init = async () => {
        terrainLayerRef.current = getHillshadeLayer(visible);

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
