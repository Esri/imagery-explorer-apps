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

import './CustomMapViewStyle.css';
import React, { useEffect, useState, useRef } from 'react';

import ArcGISMapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import classNames from 'classnames';

interface Props {
    /**
     * ArcGIS Online Item Id
     */
    webmapId: string;
    /**
     * Coordinate pair `[longitude, latitude]` that represent the default center of the map view
     */
    center?: number[];
    /**
     * deafult zoom level
     */
    zoom?: number;
    /**
     * Children Elements that will receive Map View as prop
     */
    children?: React.ReactNode;
}

const MapView: React.FC<Props> = ({
    webmapId,
    center,
    zoom,
    children,
}: Props) => {
    const mapDivRef = useRef<HTMLDivElement>();

    const [mapView, setMapView] = useState<ArcGISMapView>(null);

    const mapViewRef = useRef<ArcGISMapView>();

    const initMapView = async () => {
        mapViewRef.current = new ArcGISMapView({
            container: mapDivRef.current,
            center,
            zoom,
            map: new WebMap({
                portalItem: {
                    id: webmapId,
                },
            }),
            constraints: {
                lods: TileInfo.create().lods,
                snapToZoom: false,
            },
            popupEnabled: false,
        });

        // // Removes all default UI components, except Attribution.
        // mapViewRef.current.ui.components = ['attribution'];

        mapViewRef.current.when(() => {
            setMapView(mapViewRef.current);
        });
    };

    useEffect(() => {
        // loadCss();
        initMapView();

        return () => {
            mapViewRef.current.destroy();
        };
    }, []);

    useEffect(() => {
        if (!mapView) {
            return;
        }

        const [longitude, latitude] = center;

        if (
            mapView.center.longitude.toFixed(6) === longitude.toFixed(6) &&
            mapView.center.latitude.toFixed(6) === latitude.toFixed(6) &&
            mapView.zoom.toFixed(3) === zoom.toFixed(3)
        ) {
            return;
        }

        mapView.goTo({
            center,
            zoom,
        });
    }, [center, zoom]);

    return (
        <>
            <div
                className={classNames('absolute top-0 left-0 w-full bottom-0', {
                    // 'cursor-none': showMagnifier,
                })}
                ref={mapDivRef}
            ></div>
            {mapView
                ? React.Children.map(children, (child) => {
                      if (!child) {
                          return null;
                      }

                      return React.cloneElement(
                          child as React.ReactElement<any>,
                          {
                              mapView,
                          }
                      );
                  })
                : null}
        </>
    );
};

export default MapView;
