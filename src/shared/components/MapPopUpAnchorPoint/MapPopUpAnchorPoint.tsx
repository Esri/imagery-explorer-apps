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

import Graphic from '@arcgis/core/Graphic';
import { Point } from '@arcgis/core/geometry';
import GraphicsLayer from '@arcgis/core/layers/GraphicsLayer';
import GroupLayer from '@arcgis/core/layers/GroupLayer';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import { getThemedMapPointGraphic } from '../MapView/helpers';

type Props = {
    anchorLocation: Point;
    mapView?: MapView;
    groupLayer?: GroupLayer;
};

export const MapPopUpAnchorPoint: FC<Props> = ({
    anchorLocation,
    mapView,
    groupLayer,
}) => {
    const graphicLayerRef = useRef<GraphicsLayer>();

    const init = async () => {
        try {
            graphicLayerRef.current = new GraphicsLayer();

            groupLayer.add(graphicLayerRef.current);
        } catch (err) {
            console.error(err);
        }
    };

    const showAnchorPoint = async () => {
        try {
            graphicLayerRef.current.removeAll();

            const point = getThemedMapPointGraphic(anchorLocation);

            graphicLayerRef.current.add(point);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        (async () => {
            if (!groupLayer) {
                return;
            }

            if (!graphicLayerRef.current) {
                await init();
            }

            if (!anchorLocation) {
                graphicLayerRef.current.removeAll();
            } else {
                showAnchorPoint();
            }
        })();
    }, [anchorLocation, groupLayer]);

    return null;
};
