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

import './CustomMapViewStyle.css';
import React, { useEffect, useState, useRef } from 'react';

import ArcGISMapView from '@arcgis/core/views/MapView';
import WebMap from '@arcgis/core/WebMap';
import TileInfo from '@arcgis/core/layers/support/TileInfo';
import classNames from 'classnames';
import '@arcgis/map-components/components/arcgis-map';
import '@arcgis/map-components/components/arcgis-zoom';
import '@arcgis/map-components/components/arcgis-search';

interface Props {
    /**
     * ArcGIS Online Item Id
     */
    webmapId: string;
    /**
     * Coordinate pair `[longitude, latitude]` that represent the default center of the map view
     */
    center?: [number, number];
    /**
     * deafult zoom level
     */
    zoom?: number;
    /**
     * If true, disables the map navigation
     */
    shouldDisableMapNavigate?: boolean;
    /**
     * Children Elements that will receive Map View as prop
     */
    children?: React.ReactNode;
}

const MapView: React.FC<Props> = ({
    webmapId,
    center,
    zoom,
    shouldDisableMapNavigate,
    children,
}: Props) => {
    const mapDivRef = useRef<HTMLDivElement>(null);

    const [mapView, setMapView] = useState<ArcGISMapView>(null);

    // Capture initial center/zoom once — never pass updated values to arcgis-map.
    // The web component treats every prop write as a goTo() call, which could possible
    // create an infinite loop: onStationary → Redux update → re-render → goTo() → onStationary.
    const initialCenterRef = useRef(center);
    const initialZoomRef = useRef(zoom);

    // const mapViewRef = useRef<ArcGISMapView>(null);

    // const initMapView = async () => {
    //     mapViewRef.current = new ArcGISMapView({
    //         container: mapDivRef.current,
    //         center,
    //         zoom,
    //         map: new WebMap({
    //             portalItem: {
    //                 id: webmapId,
    //             },
    //         }),
    //         constraints: {
    //             lods: TileInfo.create().lods,
    //             snapToZoom: false,
    //         },
    //         popupEnabled: false,
    //     });

    //     // Removes all default UI components
    //     mapViewRef.current.ui.components = [];

    //     mapViewRef.current.when(() => {
    //         setMapView(mapViewRef.current);
    //     });
    // };

    useEffect(() => {
        const viewElement = mapDivRef.current.querySelector(
            'arcgis-map'
        ) as any;

        viewElement.addEventListener('arcgisViewReadyChange', () => {
            const view = viewElement.view;

            if (!(view instanceof ArcGISMapView)) {
                console.error('The view is not an instance of ArcGISMapView');
                return;
            } else {
                console.log('ArcGISMapView is ready', viewElement, view);
            }

            // Set the map view constraints to use the same LODs as the tile layer, and disable snapToZoom to allow for more flexible zooming
            view.constraints = {
                lods: TileInfo.create().lods,
                snapToZoom: false,
            };

            setMapView(view as ArcGISMapView);
        });
    }, []);

    // useEffect(() => {
    //     // loadCss();
    //     initMapView();

    //     return () => {
    //         mapViewRef.current.destroy();
    //     };
    // }, []);

    // handle center and zoom changes from outside of the map view (e.g. when user clicks on a interesting place and we want to fly to that location, or when we want to reset the map view to the default center/zoom)
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
            // console.log('Map view center and zoom are already at the desired values, no need to call goTo');
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
                    'pointer-events-none': shouldDisableMapNavigate,
                })}
                ref={mapDivRef}
            >
                <arcgis-map
                    center={initialCenterRef.current} // only use initial center and zoom to prevent unnecessary goTo calls
                    zoom={initialZoomRef.current} // only use initial center and zoom to prevent unnecessary goTo calls
                    popupDisabled={true}
                    padding={{
                        left: 0,
                        top: 0,
                        right: 0,
                        bottom: 0,
                    }}
                    itemId={webmapId}
                    hideAttribution={true}
                ></arcgis-map>
            </div>
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
