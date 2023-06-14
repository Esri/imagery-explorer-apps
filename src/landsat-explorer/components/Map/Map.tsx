import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '../AnimationLayer';
import { MaskLayer } from '../MaskLayer';

const Map = () => {
    return (
        <MapViewContainer>
            <LandsatLayer />
            <MaskLayer />
            <SwipeWidget />
            <AnimationLayer />
        </MapViewContainer>
    );
};

export default Map;
