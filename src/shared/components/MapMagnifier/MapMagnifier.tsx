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
