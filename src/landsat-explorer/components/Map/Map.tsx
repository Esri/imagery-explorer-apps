import React, { FC } from 'react';
import MapViewContainer from '../../../shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '../LandsatLayer';

const Map = () => {
    return (
        <MapViewContainer>
            <LandsatLayer />
        </MapViewContainer>
    );
};

export default Map;
