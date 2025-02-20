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

import Layer from '@arcgis/core/layers/Layer';
import IMapView from '@arcgis/core/views/MapView';
import { useAppSelector } from '@shared/store/configureStore';
import {
    selectShowBasemap,
    selectShowMapLabel,
    // selectShowTerrain,
} from '@shared/store/Map/selectors';

import {
    HUMAN_GEO_DARK_LABEL_LAYER_TITLE,
    HUMAN_GEO_LIGHT_WATER_LAYER_TITLE,
    HUMAN_GEO_DARK_DRY_LAYER_TITLE,
    WORLD_IMAGERY_BASEMAP_LAYER_TITLE,
    CUSTOM_OCEAN_BASEMAP_LAYER_TITLE,
    // TERRAIN_LAYER_TITLE,
} from '@shared/constants/map';

type Props = {
    mapView?: IMapView;
};

const ReferenceLayers: FC<Props> = ({ mapView }: Props) => {
    const mapLabelLayersRef = useRef<__esri.Collection<Layer>>();
    // const terrainLayerRef = useRef<__esri.Layer>();

    const basemapLayersRef = useRef<__esri.Collection<__esri.Layer>>();

    const showMapLabel = useAppSelector(selectShowMapLabel);
    // const showTerrain = useAppSelector(selectShowTerrain);

    const showBasemap = useAppSelector(selectShowBasemap);

    const updateLabelLayersVisibility = () => {
        if (!mapLabelLayersRef.current) {
            return;
        }

        for (const layer of mapLabelLayersRef.current) {
            layer.visible = showMapLabel;
        }
    };

    const updateBaseLayersVisibility = () => {
        if (!basemapLayersRef.current) {
            return;
        }

        for (const layer of basemapLayersRef.current) {
            layer.visible = showBasemap;
        }
    };

    const init = () => {
        mapLabelLayersRef.current = mapView.map.allLayers.filter((layer) => {
            return (
                layer.title === HUMAN_GEO_DARK_LABEL_LAYER_TITLE ||
                layer.title === HUMAN_GEO_LIGHT_WATER_LAYER_TITLE ||
                layer.title === HUMAN_GEO_DARK_DRY_LAYER_TITLE
            );
        });

        basemapLayersRef.current = mapView.map.allLayers.filter(
            (layer: Layer) => {
                return (
                    layer.title === WORLD_IMAGERY_BASEMAP_LAYER_TITLE ||
                    layer.title === CUSTOM_OCEAN_BASEMAP_LAYER_TITLE
                );
            }
        );

        // update visibiliy in case user want these layers to be turned off by default
        updateLabelLayersVisibility();

        updateBaseLayersVisibility();

        // terrainLayerRef.current = mapView.map.allLayers.find(
        //     (layer) => layer.title === TERRAIN_LAYER_TITLE
        // );
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    useEffect(() => {
        updateLabelLayersVisibility();
    }, [showMapLabel]);

    useEffect(() => {
        updateBaseLayersVisibility();
    }, [showBasemap]);

    return null;
};

export default ReferenceLayers;
