import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';
import { SwipeWidget } from '../SwipeWidget';
import { AnimationLayer } from '../AnimationLayer';
import { MaskLayer } from '../MaskLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { ProfileToolQueryLocation } from '@shared/components/ProfileToolQueryLocation';
import { Zoom2NativeScale } from '@shared/components/Zoom2NativeScale/Zoom2NativeScale';

const Map = () => {
    return (
        <MapViewContainer>
            <GroupLayer>
                <LandsatLayer />
                <MaskLayer />
                <ProfileToolQueryLocation />
            </GroupLayer>
            <SwipeWidget />
            <AnimationLayer />
            <Zoom2NativeScale tooltip={"Zoom to Landsat's native resolution"} />
        </MapViewContainer>
    );
};

export default Map;
