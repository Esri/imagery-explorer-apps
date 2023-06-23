import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '../AnimationLayer';
import { MaskLayer } from '../MaskLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { ProfileToolQueryLocation } from '@shared/components/ProfileToolQueryLocation';

const Map = () => {
    return (
        <MapViewContainer>
            <GroupLayer>
                <LandsatLayer />
                <MaskLayer />
            </GroupLayer>
            <ProfileToolQueryLocation />
            <SwipeWidget />
            <AnimationLayer />
        </MapViewContainer>
    );
};

export default Map;
