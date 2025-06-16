import MapView from '@arcgis/core/views/MapView';
import React, { FC } from 'react';
import Popup from './Popup';

type Props = {
    mapView?: MapView;
};

export const Sentinel2LandCoverPopup: FC<Props> = ({ mapView }) => {
    if (!mapView) {
        return null;
    }
    return <Popup mapView={mapView} />;
};
