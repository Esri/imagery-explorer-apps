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

        if (onClickHandler) {
            mapView.on('click', (evt) => {
                // console.log(evt.mapPoint)
                onClickHandler(evt.mapPoint);
            });
        }

        reactiveUtils.watch(
            () => mapView.updating,
            () => {
                // console.log('mapview is updating')
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
