import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';

type Props = {
    mapView?: MapView;
};

export const CrosshairCursor: FC<Props> = ({ mapView }) => {
    useEffect(() => {
        if (mapView) {
            mapView.container.classList.add('cursor-crosshair');
        }
    }, [mapView]);
    return null;
};
