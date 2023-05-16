import React, { FC } from 'react';
import MapViewContainer from '../../../shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';

const Map = () => {
    return (
        <MapViewContainer>
            <LandsatLayer />
            <SwipeWidget />
        </MapViewContainer>
    );
};

export default Map;
