import React, { useEffect, useState, useRef } from 'react';

import { loadModules, loadCss } from 'esri-loader';
import IMapView from 'esri/views/MapView';
import IWebMap from 'esri/WebMap';

interface Props {
    webmapId: string;
    children?: React.ReactNode;
}

const MapView: React.FC<Props> = ({ webmapId, children }: Props) => {
    const mapDivRef = useRef<HTMLDivElement>();

    const [mapView, setMapView] = useState<IMapView>(null);

    const initMapView = async () => {
        type Modules = [typeof IMapView, typeof IWebMap];

        try {
            const [MapView, WebMap] = await (loadModules([
                'esri/views/MapView',
                'esri/WebMap',
            ]) as Promise<Modules>);

            const view = new MapView({
                container: mapDivRef.current,
                map: new WebMap({
                    portalItem: {
                        id: webmapId,
                    },
                }),
            });

            view.when(() => {
                setMapView(view);
            });
        } catch (err) {
            console.error(err);
        }
    };

    const updateWebmap = async () => {
        type Modules = [typeof IWebMap];

        try {
            const [WebMap] = await (loadModules([
                'esri/WebMap',
            ]) as Promise<Modules>);

            mapView.map = new WebMap({
                portalItem: {
                    id: webmapId,
                },
            });
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => {
        loadCss();
        initMapView();
    }, []);

    useEffect(() => {
        if (mapView) {
            updateWebmap();
        }
    }, [webmapId]);

    return (
        <>
            <div
                style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                }}
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
