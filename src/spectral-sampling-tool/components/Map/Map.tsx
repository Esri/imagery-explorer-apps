import React, { FC } from 'react';
import MapViewContainer from '@shared/components/MapView/MapViewContainer';
import { LandsatLayer } from '@landsat-explorer/components/LandsatLayer';
import { GroupLayer } from '@shared/components/GroupLayer';
import { CustomEventHandlers } from './CustomEventHandler';

const Map = () => {
    return (
        <MapViewContainer>
            <GroupLayer>
                <LandsatLayer />
            </GroupLayer>
            <CustomEventHandlers />
        </MapViewContainer>
    );
};

export default Map;
