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
import * as reactiveUtils from '@arcgis/core/core/reactiveUtils';
import IPoint from '@arcgis/core/geometry/Point';
import { MapCenter, MapExtent } from '@landcover-explorer/store/Map/reducer';

type Props = {
    mapView?: IMapView;
    /**
     * Fires when Map View's extent changes
     *
     * @param extent extent of map view
     * @param resolution resolution of map view
     */
    extentOnChange?: (
        extent: MapExtent,
        resolution: number,
        center: MapCenter,
        zoom: number
    ) => void;
    /**
     * Fires when user click on map view
     *
     * @param mapPoint point represents that location that the user clicked on
     */
    mapViewOnClick?: (mapPoint: IPoint) => void;
    /**
     * Fires when Map View starts/stops updating
     */
    mapViewUpdatingOnChange?: (isUpdating: boolean) => void;
};

const MapViewEventHandlers: FC<Props> = ({
    mapView,
    extentOnChange,
    mapViewOnClick,
    mapViewUpdatingOnChange,
}: Props) => {
    const stringifiedMapExtentRef = useRef<string>();
    const resolutionRef = useRef<number>();

    const mapExtentOnChangeHandler = () => {
        extentOnChange(
            mapView.extent.toJSON(),
            mapView.resolution,
            {
                lon: +mapView.center.longitude.toFixed(3),
                lat: +mapView.center.latitude.toFixed(3),
            },
            mapView.zoom
        );
    };

    const init = async () => {
        try {
            /**
             * Observe for when a boolean property becomes true
             * Equivalent to watchUtils.whenTrue()
             * learn more here: https://developers.arcgis.com/javascript/latest/api-reference/esri-core-reactiveUtils.html#when
             */
            reactiveUtils.when(
                () => mapView.stationary === true,
                () => {
                    const mapExtent = mapView.extent.toJSON();
                    const stringifiedMapExtent = JSON.stringify(mapExtent);

                    if (
                        stringifiedMapExtentRef.current !==
                            stringifiedMapExtent ||
                        resolutionRef.current !== mapView.resolution
                    ) {
                        stringifiedMapExtentRef.current = stringifiedMapExtent;
                        resolutionRef.current = mapView.resolution;

                        mapExtentOnChangeHandler();
                    }
                }
            );

            reactiveUtils.watch(
                () => mapView.updating,
                () => {
                    // console.log('mapview is updating')
                    mapViewUpdatingOnChange(mapView.updating);
                }
            );

            mapView.on('click', async (evt) => {
                if (mapViewOnClick) {
                    mapViewOnClick(evt.mapPoint.toJSON());
                }
            });

            // the stationary handler only get triggered after first time the user interactive with the view, therefore need to call this manually
            mapExtentOnChangeHandler();
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        if (mapView) {
            init();
        }
    }, [mapView]);

    return null;
};

export default MapViewEventHandlers;
