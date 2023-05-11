import { loadModules } from 'esri-loader';
import IReactiveUtils from 'esri/core/reactiveUtils';
import { Extent, Point } from 'esri/geometry';
import MapView from 'esri/views/MapView';
import React, { FC, useEffect } from 'react';

type Props = {
    mapView?: MapView;
    /**
     * fires when map view becomes stationary
     * @param center
     * @param zoom
     * @returns
     */
    onStationary?: (center: Point, zoom: number, extent: Extent) => void;
    /**
     * fires when user clicks on the map
     * @param point
     * @returns
     */
    onClick?: (point: Point) => void;
};

const EventHandlers: FC<Props> = ({ mapView, onStationary, onClick }) => {
    const initEventHandlers = async () => {
        type Modules = [typeof IReactiveUtils];

        const [reactiveUtils] = await (loadModules([
            'esri/core/reactiveUtils',
        ]) as Promise<Modules>);

        if (onStationary) {
            reactiveUtils.watch(
                // getValue function
                () => mapView.stationary,
                // callback
                (stationary) => {
                    if (stationary) {
                        onStationary(
                            mapView.center,
                            mapView.zoom,
                            mapView.extent
                        );
                    }
                }
            );
        }

        if (onclick) {
            mapView.on('click', (evt) => {
                onClick(evt.mapPoint);
            });
        }
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
