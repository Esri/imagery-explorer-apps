import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '@landsat-explorer/components/LandsatLayer';
import { GroupLayer } from '@shared/components/GroupLayer';

const Map = () => {
    return (
        <MapViewContainer>
            <GroupLayer>
                <LandsatLayer />
            </GroupLayer>
        </MapViewContainer>
    );
};

export default Map;
