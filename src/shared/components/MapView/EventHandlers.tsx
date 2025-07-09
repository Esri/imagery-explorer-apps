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

import { watch } from '@arcgis/core/core/reactiveUtils';
import Point from '@arcgis/core/geometry/Point';
import Extent from '@arcgis/core/geometry/Extent';
import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';

type Props = {
    mapView?: MapView;
    /**
     * fires when map view becomes stationary
     * @param center
     * @param zoom
     * @returns
     */
    onStationary?: (
        center: Point,
        zoom: number,
        extent: Extent,
        resolution: number,
        scale: number
    ) => void;
    /**
     * fires when user clicks on the map
     * @param point
     * @returns
     */
    onClickHandler?: (point: Point) => void;
    /**
     * Fires when Map View starts/stops updating
     */
    mapViewUpdatingOnChange: (isUpdating: boolean) => void;
};

const EventHandlers: FC<Props> = ({
    mapView,
    onStationary,
    onClickHandler,
    mapViewUpdatingOnChange,
}) => {
    const initEventHandlers = async () => {
        if (onStationary) {
            watch(
                // getValue function
                () => mapView.stationary,
                // callback
                (stationary) => {
                    if (stationary) {
                        onStationary(
                            mapView.center,
                            mapView.zoom,
                            mapView.extent,
                            mapView.resolution,
                            mapView.scale
                        );
                    }
                }
            );
        }

        if (onClickHandler) {
            mapView.on('click', (evt) => {
                // console.log(evt.mapPoint)
                onClickHandler(evt.mapPoint);
            });
        }

        watch(
            () => mapView.updating,
            () => {
                // console.log('mapview is updating');
                mapViewUpdatingOnChange(mapView.updating);
            }
        );
    };

    useEffect(() => {
        if (!mapView) {
            return;
        }

        initEventHandlers();
    }, [mapView]);

    return null;
};

export default EventHandlers;
