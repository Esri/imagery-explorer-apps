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
     * if true, show magnifier of map view
     */
    showMagnifier?: boolean;
    /**
     * Children Elements that will receive Map View as prop
     */
    children?: React.ReactNode;
}

const MapView: React.FC<Props> = ({
    webmapId,
    center,
    zoom,
    showMagnifier,
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
            popup: {
                autoOpenEnabled: false,
            },
        });

        mapViewRef.current.when(() => {
            setMapView(mapViewRef.current);

            //The magnifier will be displayed whenever the cursor hovers over the map.
            mapViewRef.current.on('pointer-move', function (event) {
                mapViewRef.current.magnifier.position = {
                    x: event.x,
                    y: event.y,
                };
            });
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

        mapView.magnifier.factor = 2;
        mapView.magnifier.visible = showMagnifier;
    }, [showMagnifier, mapView]);

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
                    'cursor-none': showMagnifier,
                })}
                ref={mapDivRef}
            ></div>
            {mapView
                ? React.Children.map(children, (child) => {
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
