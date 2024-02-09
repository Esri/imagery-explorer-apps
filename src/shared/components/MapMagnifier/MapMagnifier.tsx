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

import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';

type Props = {
    showMagnifier: boolean;
    mapView?: MapView;
};

export const MapMagnifier: FC<Props> = ({ showMagnifier, mapView }) => {
    useEffect(() => {
        if (!mapView) {
            return;
        }

        // show not show mouse cursor if magnifier is on
        mapView.container.classList.toggle('cursor-none', showMagnifier);

        mapView.magnifier.factor = 2;
        mapView.magnifier.visible = showMagnifier;
    }, [showMagnifier, mapView]);

    useEffect(() => {
        if (mapView) {
            //The magnifier will be displayed whenever the cursor hovers over the map.
            mapView.on('pointer-move', function (event) {
                mapView.magnifier.position = {
                    x: event.x,
                    y: event.y,
                };
            });
        }
    }, [mapView]);

    return null;
};
