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

import IMapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectShowBasemap,
    selectShowMapLabel,
    selectShowTerrain,
} from '@shared/store/Map/selectors';
import {
    getBasemapLayers,
    getMapLabelLayers,
    getTerrainLayer,
} from '@shared/components/MapView/ReferenceLayers';

type Props = {
    mapView?: IMapView;
};

const ReferenceLayers: FC<Props> = ({ mapView }: Props) => {
    const mapLabelLayersRef = useRef<__esri.Collection<__esri.Layer>>(null);
    const terrainLayerRef = useRef<__esri.Layer>(null);
    const basemapLayersRef = useRef<__esri.Collection<__esri.Layer>>(null);

    const showMapLabel = useAppSelector(selectShowMapLabel);
    const showTerrain = useAppSelector(selectShowTerrain);
    const showBasemap = useAppSelector(selectShowBasemap);

    const init = () => {
        mapLabelLayersRef.current = getMapLabelLayers(mapView);
        // mapView.map.allLayers.filter((layer) => {
        //     return (
        //         layer.title === HUMAN_GEO_DARK_LABEL_LAYER_TITLE ||
        //         layer.title === HUMAN_GEO_LIGHT_WATER_LAYER_TITLE ||
        //         layer.title === HUMAN_GEO_DARK_DRY_LAYER_TITLE
        //     );
        // });

        terrainLayerRef.current = getTerrainLayer(mapView);
        // mapView.map.allLayers.find(
        //     (layer) => layer.title === TERRAIN_LAYER_TITLE
        // );

        basemapLayersRef.current = getBasemapLayers(mapView);
        // mapView.map.allLayers.filter(
        //     (layer: Layer) => {
        //         return (
        //             layer.title === WORLD_IMAGERY_BASEMAP_LAYER_TITLE ||
        //             layer.title === CUSTOM_OCEAN_BASEMAP_LAYER_TITLE
        //         );
        //     }
        // );
    };

    const updateBaseLayersVisibility = () => {
        if (!basemapLayersRef.current) {
            return;
        }

        for (const layer of basemapLayersRef.current) {
            layer.visible = showBasemap;
        }
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        if (mapLabelLayersRef.current) {
            for (const layer of mapLabelLayersRef.current) {
                layer.visible = showMapLabel;
            }
        }
    }, [showMapLabel]);

    useEffect(() => {
        if (terrainLayerRef.current) {
            terrainLayerRef.current.visible = showTerrain;
        }
    }, [showTerrain]);

    useEffect(() => {
        updateBaseLayersVisibility();
    }, [showBasemap]);

    return null;
};

export default ReferenceLayers;
