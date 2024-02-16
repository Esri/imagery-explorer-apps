/* Copyright 2024 Esri
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
import { useSelector } from 'react-redux';
import {
    selectShowMapLabel,
    selectShowTerrain,
} from '@landcover-explorer/store/LandcoverExplorer/selectors';
import {
    HUMAN_GEO_DARK_LABEL_LAYER_TITLE,
    HUMAN_GEO_LIGHT_WATER_LAYER_TITLE,
    HUMAN_GEO_DARK_DRY_LAYER_TITLE,
    TERRAIN_LAYER_TITLE,
} from '@landcover-explorer/constants/map';

type Props = {
    mapView?: IMapView;
};

const ReferenceLayers: FC<Props> = ({ mapView }: Props) => {
    const mapLabelLayersRef = useRef<__esri.Collection<__esri.Layer>>();
    const terrainLayerRef = useRef<__esri.Layer>();

    const showMapLabel = useSelector(selectShowMapLabel);
    const showTerrain = useSelector(selectShowTerrain);

    const init = () => {
        mapLabelLayersRef.current = mapView.map.allLayers.filter((layer) => {
            return (
                layer.title === HUMAN_GEO_DARK_LABEL_LAYER_TITLE ||
                layer.title === HUMAN_GEO_LIGHT_WATER_LAYER_TITLE ||
                layer.title === HUMAN_GEO_DARK_DRY_LAYER_TITLE
            );
        });

        terrainLayerRef.current = mapView.map.allLayers.find(
            (layer) => layer.title === TERRAIN_LAYER_TITLE
        );
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

    return null;
};

export default ReferenceLayers;
