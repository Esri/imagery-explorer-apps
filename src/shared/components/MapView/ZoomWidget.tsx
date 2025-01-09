import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect } from 'react';
import Zoom from '@arcgis/core/widgets/Zoom.js';

type Props = {
    mapView?: MapView;
};

export const ZoomWidget: FC<Props> = ({ mapView }) => {
    useEffect(() => {
        if (!mapView) return;

        const zoomWidget = new Zoom({
            view: mapView,
            layout: 'horizontal',
        });

        mapView.ui.add(zoomWidget, 'top-right');

        // return () => {
        //     mapView.ui.remove(zoomWidget)
        // }
    }, [mapView]);

    return null;
};
