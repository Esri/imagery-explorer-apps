import MapView from 'esri/views/MapView';
import React, { FC, useEffect } from 'react';
import useLandsatLayer from './useLandsatLayer';

type Props = {
    mapView?: MapView;
};

const LandsatLayer: FC<Props> = ({ mapView }: Props) => {
    const getVisibility = () => {
        return true;
    };

    const layer = useLandsatLayer({
        visible: getVisibility(),
    });

    useEffect(() => {
        if (mapView && layer) {
            mapView.map.add(layer);
        }
    }, [mapView, layer]);

    return null;
};

export default LandsatLayer;
