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

import Graphic from '@arcgis/core/Graphic';
import Point from '@arcgis/core/geometry/Point';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import React, { FC, useEffect, useRef } from 'react';
import MapView from '@arcgis/core/views/MapView';
import { getThemedMapPointGraphic } from '@shared/components/MapView/helpers';
import { MAP_ZOOM } from '@shared/constants/map';

type Props = {
    /**
     * selected sampling point that will be displayed the map
     */
    selectedPoint: Point;
    /**
     * group layer to add the points Grphic Layer to
     */
    groupLayer?: GroupLayer;
    /**
     * map view
     */
    mapView?: MapView;
};

export const SamplingPoints: FC<Props> = ({
    // points,
    selectedPoint,
    groupLayer,
    mapView,
}) => {
    const graphicLayerRef = useRef<GraphicsLayer>(null);

    const init = () => {
        graphicLayerRef.current = new GraphicsLayer();
        groupLayer.add(graphicLayerRef.current);
    };

    const toggleDisplaySelectedSamplingPoint = () => {
        graphicLayerRef.current.removeAll();

        if (selectedPoint) {
            const graphic = getThemedMapPointGraphic(selectedPoint);

            graphicLayerRef.current.add(graphic);

            mapView.goTo({
                center: [selectedPoint.longitude, selectedPoint.latitude],
                zoom: Math.max(mapView.zoom, MAP_ZOOM), // Ensure a minimum zoom level
            });
        }
    };

    useEffect(() => {
        if (!graphicLayerRef.current) {
            init();
        }

        toggleDisplaySelectedSamplingPoint();
    }, [selectedPoint]);

    return null;
};
