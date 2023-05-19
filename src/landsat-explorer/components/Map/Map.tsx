import React, { FC } from 'react';
import MapViewContainer from '../../../shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '../AnimationLayer';

const Map = () => {
    return (
        <MapViewContainer>
            <LandsatLayer />
            <SwipeWidget />
            <AnimationLayer />
        </MapViewContainer>
    );
};

export default Map;
