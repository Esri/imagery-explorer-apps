import MapView from '@arcgis/core/views/MapView';
import React, { FC, useEffect, useRef } from 'react';
import Zoom from '@arcgis/core/widgets/Zoom.js';

type Props = {
    mapView?: MapView;
};

export const ZoomWidget: FC<Props> = ({ mapView }) => {
    const container = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!mapView) return;

        const zoomWidget = new Zoom({
            view: mapView,
            // layout: 'horizontal',
            container: container.current,
        });

        // mapView.ui.add(zoomWidget, 'top-right');

        // return () => {
        //     mapView.ui.remove(zoomWidget)
        // }
    }, [mapView]);

    return <div className="mt-[1px]" ref={container}></div>;
};
